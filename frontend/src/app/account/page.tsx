"use client";

import { useState, useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHeader from "@/components/ui/PageHeader";
import { EnvelopeIcon, KeyIcon, ArrowPathIcon, ArrowRightOnRectangleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const TOKEN_KEY = "account_access_token";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id: number;
  documentId: string;
  orderNumber: string;
  status: string;
  customerEmail: string;
  customerName: string;
  total: number;
  createdAt: string;
  items?: OrderItem[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "În așteptare", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmată", color: "bg-blue-100 text-blue-800" },
  processing: { label: "În procesare", color: "bg-purple-100 text-purple-800" },
  shipped: { label: "Expediată", color: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "Livrată", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Anulată", color: "bg-red-100 text-red-800" },
};

type Step = "loading" | "email" | "code" | "orders";

export default function AccountPage() {
  const [step, setStep] = useState<Step>("loading");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cancelModal, setCancelModal] = useState<{ open: boolean; order: Order | null }>({ open: false, order: null });
  const [isCancelling, setIsCancelling] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Check for existing token on mount
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setStep("email");
        return;
      }

      try {
        const response = await fetch(`${STRAPI_URL}/api/verification-codes/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
          setUserEmail(data.email);
          setStep("orders");
        } else {
          // Token invalid or expired
          localStorage.removeItem(TOKEN_KEY);
          setStep("email");
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setStep("email");
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setOrders([]);
    setUserEmail(null);
    setEmail("");
    setCode("");
    setStep("email");
  };

  const handleCancelOrder = async () => {
    if (!cancelModal.order) return;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    setIsCancelling(true);
    try {
      const response = await fetch(`${STRAPI_URL}/api/verification-codes/cancel-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderDocumentId: cancelModal.order.documentId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local orders state
        setOrders((prev) =>
          prev.map((o) =>
            o.documentId === cancelModal.order!.documentId ? { ...o, status: "cancelled" } : o
          )
        );
        setCancelModal({ open: false, order: null });
      } else {
        setError(data.error?.message || data.error || "Nu s-a putut anula comanda.");
      }
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
      console.error(err);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSendCode = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!executeRecaptcha) {
      setError("reCAPTCHA nu este încărcat. Reîncarcă pagina.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Get reCAPTCHA token
      const captchaToken = await executeRecaptcha("send_verification_code");

      const captchaResponse = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaResponse.ok) {
        setError("Verificarea captcha a eșuat. Te rugăm să încerci din nou.");
        setIsLoading(false);
        return;
      }

      // Send verification code
      const response = await fetch(`${STRAPI_URL}/api/verification-codes/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("code");
        setSuccessMessage(data.message || "Codul a fost trimis pe email.");
      } else {
        setError(data.error?.message || "A apărut o eroare. Încearcă din nou.");
      }
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [email, executeRecaptcha]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${STRAPI_URL}/api/verification-codes/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        if (data.accessToken) {
          localStorage.setItem(TOKEN_KEY, data.accessToken);
        }
        setOrders(data.orders || []);
        setUserEmail(email);
        setStep("orders");
        setSuccessMessage(null);
      } else {
        setError(data.error?.message || data.error || "Cod invalid sau expirat.");
      }
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep("email");
    setEmail("");
    setCode("");
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <PageHeader badge="Contul meu" title="Istoric comenzi" description="Verifică statusul comenzilor tale folosind adresa de email." />

      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Loading state */}
          {step === "loading" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#2e6932] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Se verifică sesiunea...</p>
            </div>
          )}

          {/* Step 1: Email input */}
          {step === "email" && (
            <form onSubmit={handleSendCode} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2e6932] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-lg font-semibold">Introdu adresa de email</h2>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Vei primi un cod de verificare pe email pentru a accesa istoricul comenzilor.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplu.ro"
                    required
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent"
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  {isLoading ? "Se trimite..." : "Trimite codul de verificare"}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Code verification */}
          {step === "code" && (
            <form onSubmit={handleVerifyCode} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#2e6932] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="text-lg font-semibold">Introdu codul de verificare</h2>
              </div>

              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <p className="text-green-800 text-sm">✅ {successMessage}</p>
                </div>
              )}

              <p className="text-gray-600 mb-4 text-sm">
                Am trimis un cod de 6 cifre la <strong>{email}</strong>. Codul este valabil 1 oră.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    required
                    maxLength={6}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono"
                  />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading || code.length !== 6}
                  className="w-full py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Se verifică..." : "Verifică codul"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center gap-2"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Încearcă cu alt email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Orders list */}
          {step === "orders" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Comenzile pentru {userEmail || email}</h2>
                  <p className="text-sm text-gray-500">{orders.length} comenzi găsite</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  Deconectare
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                  <p className="text-gray-500">Nu am găsit comenzi pentru această adresă de email.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const status = statusLabels[order.status] || statusLabels.pending;
                    return (
                      <div key={order.documentId || order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="font-mono font-bold text-[#2e6932]">{order.orderNumber}</p>
                            <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>

                        {order.items && order.items.length > 0 && (
                          <div className="border-t pt-4 space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.productName} × {item.quantity}</span>
                                <span>{formatPrice(item.totalPrice)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="border-t mt-4 pt-4 flex items-center justify-between">
                          <div className="font-semibold">
                            <span>Total: </span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                          {/* Cancel button - only for pending/processing orders */}
                          {(order.status === "pending" || order.status === "processing") && (
                            <button
                              onClick={() => setCancelModal({ open: true, order })}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                            >
                              <XCircleIcon className="w-4 h-4" />
                              Anulează
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Cancel Order Modal */}
      {cancelModal.open && cancelModal.order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Anulează comanda</h3>
            <p className="text-gray-600 mb-4">
              Ești sigur că vrei să anulezi comanda{" "}
              <span className="font-mono font-bold text-[#2e6932]">{cancelModal.order.orderNumber}</span>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Această acțiune nu poate fi anulată.
            </p>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCancelModal({ open: false, order: null });
                  setError(null);
                }}
                disabled={isCancelling}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Înapoi
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCancelling ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Se anulează...
                  </>
                ) : (
                  <>
                    <XCircleIcon className="w-4 h-4" />
                    Confirmă anularea
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

