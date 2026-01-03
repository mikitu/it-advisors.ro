"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-[#2e6932]" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Comandă plasată cu succes!
          </h1>
          
          {orderNumber && (
            <p className="text-gray-600 mb-6">
              Numărul comenzii tale: <span className="font-mono font-bold text-[#2e6932]">{orderNumber}</span>
            </p>
          )}
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Ce urmează?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#2e6932]">✓</span>
                Vei primi un email de confirmare cu detaliile comenzii
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2e6932]">✓</span>
                Te vom contacta pentru confirmarea livrării
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2e6932]">✓</span>
                Plata se face la livrare sau prin transfer bancar
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/produse"
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Continuă cumpărăturile
            </Link>
            <Link
              href="/cont"
              className="flex-1 px-6 py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors"
            >
              Vezi comenzile mele
            </Link>
          </div>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          Ai întrebări? <Link href="/contact" className="text-[#2e6932] hover:underline">Contactează-ne</Link>
        </p>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
