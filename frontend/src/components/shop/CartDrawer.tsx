"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart-context";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(price);
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, subtotal, shippingCost, total } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Coș de cumpărături ({itemCount})
                      </Dialog.Title>
                      <button type="button" className="text-gray-400 hover:text-gray-500" onClick={closeCart}>
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 mb-4">Coșul tău este gol</p>
                          <Link href="/produse" onClick={closeCart} className="text-[#2e6932] font-medium hover:underline">
                            Vezi produsele
                          </Link>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {items.map((item) => {
                            const price = item.product.salePrice || item.product.price;
                            return (
                              <li key={item.product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                  {item.product.image?.url ? (
                                    <img src={item.product.image.url} alt={item.product.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center text-3xl">{item.product.icon || "📦"}</div>
                                  )}
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div className="flex justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                                    <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500">
                                      <TrashIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.product.sku}</p>
                                  <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center border rounded-lg">
                                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                                        <MinusIcon className="h-4 w-4" />
                                      </button>
                                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                                        <PlusIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{formatPrice(price * item.quantity)}</p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t px-4 py-6 sm:px-6">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                          <div className="flex justify-between text-sm"><span className="text-gray-500">Livrare</span><span>{shippingCost === 0 ? "Gratuită" : formatPrice(shippingCost)}</span></div>
                          {subtotal < 500 && <p className="text-xs text-gray-400">Livrare gratuită pentru comenzi peste 500 RON</p>}
                          <div className="flex justify-between text-lg font-semibold pt-2 border-t"><span>Total</span><span>{formatPrice(total)}</span></div>
                        </div>
                        <Link href="/checkout" onClick={closeCart} className="block w-full rounded-xl bg-[#2e6932] px-6 py-3 text-center font-semibold text-white hover:bg-[#245228] transition-colors">
                          Finalizează comanda
                        </Link>
                        <button onClick={closeCart} className="mt-3 w-full text-center text-sm text-gray-500 hover:text-gray-700">
                          Continuă cumpărăturile
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

