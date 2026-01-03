"use client";

import { useState } from "react";
import { getOrdersByEmail, type Order } from "@/lib/strapi";
import PageHeader from "@/components/ui/PageHeader";
import { EnvelopeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await getOrdersByEmail(email);
      setOrders(result);
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge="Contul meu" title="Istoric comenzi" description="Verifică statusul comenzilor tale folosind adresa de email." />
      
      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Search form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introdu adresa de email folosită la comandă
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
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
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                {isLoading ? "Se caută..." : "Caută"}
              </button>
            </div>
          </form>

          {/* Results */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          
          {hasSearched && !isLoading && orders.length === 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <p className="text-gray-500">Nu am găsit comenzi pentru această adresă de email.</p>
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = statusLabels[order.status] || statusLabels.pending;
                return (
                  <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
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
                    
                    <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

