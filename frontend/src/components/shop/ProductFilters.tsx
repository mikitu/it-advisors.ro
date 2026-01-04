"use client";

import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ProductCategory } from "@/lib/strapi";

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "popularity-desc" | "popularity-asc";

interface ProductFiltersProps {
  brands: string[];
  categories: ProductCategory[];
  selectedBrands: string[];
  selectedCategories: number[];
  sortBy: SortOption;
  onBrandChange: (brands: string[]) => void;
  onCategoryChange: (categories: number[]) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  productCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity-desc", label: "Popularitate ↓" },
  { value: "popularity-asc", label: "Popularitate ↑" },
  { value: "price-asc", label: "Preț crescător" },
  { value: "price-desc", label: "Preț descrescător" },
  { value: "name-asc", label: "Nume A-Z" },
  { value: "name-desc", label: "Nume Z-A" },
];

export default function ProductFilters({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  sortBy,
  onBrandChange,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  productCount,
}: ProductFiltersProps) {
  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0;

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="mb-8">
      {/* Top bar with sort and filter count */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {productCount} {productCount === 1 ? "produs" : "produse"}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
              Șterge filtrele
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Sortare: {sortOptions.find((o) => o.value === sortBy)?.label}
            <ChevronDownIcon className="h-4 w-4" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              {sortOptions.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <button
                      onClick={() => onSortChange(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        active ? "bg-gray-50" : ""
                      } ${sortBy === option.value ? "text-[#2e6932] font-medium" : "text-gray-700"}`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Filter sections */}
      <div className="flex flex-wrap gap-6">
        {/* Categories */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="min-w-[200px]">
              <Disclosure.Button className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-900 mb-3">
                Categorie
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedCategories.includes(cat.id)
                        ? "bg-[#2e6932] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        {/* Brands */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="min-w-[200px]">
              <Disclosure.Button className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-900 mb-3">
                Brand
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      selectedBrands.includes(brand)
                        ? "bg-[#2e6932] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

