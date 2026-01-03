"use client";

import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/strapi";

interface ProductGridProps {
  products: Product[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const hasDiscount = product.salePrice && product.salePrice < product.price;
        const displayPrice = hasDiscount ? product.salePrice! : product.price;
        const inStock = product.stock > 0;

        return (
          <motion.div
            key={product.id}
            className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {hasDiscount && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                  -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                </span>
              )}
              {product.featured && (
                <span className="px-2 py-1 bg-[#2e6932] text-white text-xs font-bold rounded-lg">
                  Popular
                </span>
              )}
            </div>

            {/* Image */}
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
              {product.image?.url ? (
                <img src={product.image.url} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <span className="text-6xl">{product.icon || "📦"}</span>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-1">{product.sku}</p>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Stock status & Add to cart */}
              <div className="flex items-center gap-3">
                {inStock ? (
                  <button
                    onClick={() => addItem(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Adaugă
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-400 font-medium rounded-xl cursor-not-allowed"
                  >
                    Stoc epuizat
                  </button>
                )}
              </div>

              {/* Stock indicator */}
              {inStock && product.stock <= 5 && (
                <p className="mt-2 text-xs text-orange-600 text-center">
                  Doar {product.stock} în stoc
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

