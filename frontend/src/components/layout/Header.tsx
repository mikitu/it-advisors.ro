"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart-context";

const navigation = [
  { name: "Acasă", href: "/" },
  { name: "Servicii", href: "/servicii" },
  { name: "Soluții", href: "/solutii" },
  { name: "Produse", href: "/produse" },
  { name: "Despre noi", href: "/despre" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/logo-it-advisors-v2.png"
                alt="IT Advisors"
                width={220}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-[#2e6932] bg-[#2e6932]/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative ml-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-[#2e6932] text-white text-xs font-bold rounded-full">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 bg-[#2e6932] text-white text-sm font-semibold rounded-xl hover:bg-[#3d8a42] hover:shadow-lg hover:shadow-[#2e6932]/25 transition-all duration-200"
            >
              Solicită ofertă
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 text-base font-medium rounded-lg ${
                    isActive(item.href)
                      ? "text-[#2e6932] bg-[#2e6932]/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 mx-4 px-5 py-3 bg-[#2e6932] text-white text-center font-semibold rounded-xl hover:bg-[#3d8a42]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicită ofertă
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

