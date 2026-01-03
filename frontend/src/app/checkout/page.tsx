"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/strapi";
import PageHeader from "@/components/ui/PageHeader";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompany, setIsCompany] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);

  const [formData, setFormData] = useState({
    customerName: "", customerEmail: "", customerPhone: "",
    shippingAddress: "", shippingCity: "", shippingCounty: "", shippingPostalCode: "",
    billingAddress: "", billingCity: "", billingCounty: "", billingPostalCode: "",
    companyName: "", companyCUI: "", companyRegCom: "", notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productSku: item.product.sku,
        quantity: item.quantity,
        unitPrice: item.product.salePrice || item.product.price,
      }));

      const billingData = sameAddress ? {
        billingAddress: formData.shippingAddress,
        billingCity: formData.shippingCity,
        billingCounty: formData.shippingCounty,
        billingPostalCode: formData.shippingPostalCode,
      } : {
        billingAddress: formData.billingAddress,
        billingCity: formData.billingCity,
        billingCounty: formData.billingCounty,
        billingPostalCode: formData.billingPostalCode,
      };

      const order = await createOrder({
        ...formData,
        ...billingData,
        items: orderItems,
      });

      clearCart();
      router.push(`/checkout/success?order=${order.orderNumber}`);
    } catch (err) {
      setError("A apărut o eroare. Vă rugăm încercați din nou.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHeader badge="Checkout" title="Coșul tău este gol" description="Adaugă produse în coș pentru a continua." />
        <section className="py-20 bg-white text-center">
          <Link href="/produse" className="inline-flex px-8 py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#245228] transition-colors">
            Vezi produsele
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader badge="Checkout" title="Finalizează comanda" description="Completează datele pentru livrare și plasează comanda." />
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Date contact</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="customerName" placeholder="Nume complet *" required value={formData.customerName} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                  <input name="customerEmail" type="email" placeholder="Email *" required value={formData.customerEmail} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                  <input name="customerPhone" type="tel" placeholder="Telefon *" required value={formData.customerPhone} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent sm:col-span-2" />
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Adresă livrare</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="shippingAddress" placeholder="Adresă *" required value={formData.shippingAddress} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent sm:col-span-2" />
                  <input name="shippingCity" placeholder="Oraș *" required value={formData.shippingCity} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                  <input name="shippingCounty" placeholder="Județ *" required value={formData.shippingCounty} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                  <input name="shippingPostalCode" placeholder="Cod poștal" value={formData.shippingPostalCode} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                </div>
              </div>

              {/* Company toggle */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={isCompany} onChange={(e) => setIsCompany(e.target.checked)} className="w-5 h-5 rounded text-[#2e6932] focus:ring-[#2e6932]" />
                  <span className="font-medium">Doresc factură pe firmă</span>
                </label>
                {isCompany && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <input name="companyName" placeholder="Nume firmă *" required={isCompany} value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent sm:col-span-2" />
                    <input name="companyCUI" placeholder="CUI *" required={isCompany} value={formData.companyCUI} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                    <input name="companyRegCom" placeholder="Nr. Reg. Com." value={formData.companyRegCom} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Observații</h2>
                <textarea name="notes" placeholder="Instrucțiuni speciale pentru livrare..." rows={3} value={formData.notes} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2e6932] focus:border-transparent" />
              </div>
            </div>

            {/* Order Summary - will continue in next edit */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Sumar comandă</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice((item.product.salePrice || item.product.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Livrare</span><span>{shippingCost === 0 ? "Gratuită" : formatPrice(shippingCost)}</span></div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>
                {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="mt-6 w-full py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#245228] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Se procesează..." : "Plasează comanda"}
                </button>
                <p className="mt-4 text-xs text-gray-500 text-center">Plata se face la livrare (ramburs) sau prin transfer bancar.</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

