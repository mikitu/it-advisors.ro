"use client";

import { useState, useMemo } from "react";
import ProductFilters, { type SortOption } from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import type { Product, ProductCategory } from "@/lib/strapi";

interface ProductsSectionProps {
  products: Product[];
  categories: ProductCategory[];
  brands: string[];
}

export default function ProductsSection({ products, categories, brands }: ProductsSectionProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popularity-desc");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => p.category && selectedCategories.includes(p.category.id));
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "ro"));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name, "ro"));
        break;
      case "price-asc":
        result.sort((a, b) => {
          const priceA = a.salePrice ?? a.price;
          const priceB = b.salePrice ?? b.price;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const priceA = a.salePrice ?? a.price;
          const priceB = b.salePrice ?? b.price;
          return priceB - priceA;
        });
        break;
      case "popularity-desc":
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "popularity-asc":
        result.sort((a, b) => (a.popularity ?? 0) - (b.popularity ?? 0));
        break;
    }

    return result;
  }, [products, selectedBrands, selectedCategories, sortBy]);

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  return (
    <>
      <ProductFilters
        brands={brands}
        categories={categories}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        sortBy={sortBy}
        onBrandChange={setSelectedBrands}
        onCategoryChange={setSelectedCategories}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        productCount={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Niciun produs găsit</h3>
          <p className="text-gray-500 mb-6">Încearcă să modifici filtrele sau să le ștergi.</p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 bg-[#2e6932] text-white font-medium rounded-xl hover:bg-[#245228] transition-colors"
          >
            Șterge filtrele
          </button>
        </div>
      )}
    </>
  );
}

