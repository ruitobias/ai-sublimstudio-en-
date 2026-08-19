import React, { useState } from 'react';
import { SublimationProduct } from '../types';
import { PRODUCTS_LIBRARY } from '../data/products';
import { Search, X, Check, Box, Sparkles, Filter } from 'lucide-react';
import { ProductIcon } from './ProductIcon';

interface ProductLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: SublimationProduct;
  onSelectProduct: (product: SublimationProduct) => void;
}

export const ProductLibrary: React.FC<ProductLibraryProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  if (!isOpen) return null;

  const categories = [
    'Todos',
    'Canecas',
    'Camisetas',
    'Garrafas',
    'Copos',
    'Mouse Pads',
    'Ecobags',
    'Bonés',
    'Azulejos',
    'Almofadas',
    'Quebra-cabeças',
    'Capinhas',
    'Brindes personalizados',
  ];

  const filteredProducts = PRODUCTS_LIBRARY.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#1e1e20] border border-[#38383c] rounded-2xl w-full max-w-4xl max-h-[88dvh] flex flex-col shadow-2xl overflow-hidden text-gray-200 pb-[env(safe-area-inset-bottom,0px)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2d2d30] bg-[#18181a] shrink-0">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-sm sm:text-lg text-white">BIBLIOTECA DE PRODUTOS SUBLIMÁTICO</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 sm:p-4 border-b border-[#2d2d30] flex flex-col sm:flex-row items-center gap-3 bg-[#141415] shrink-0">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos (caneca, camiseta, garrafa, mousepad...)..."
              className="w-full bg-[#1e1e20] border border-[#38383c] focus:border-sky-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Category Tabs Dropdown */}
          <div className="flex items-center gap-1.5 touch-scroll-x no-scrollbar w-full sm:w-auto pb-1 sm:pb-0 shrink-0">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow'
                    : 'bg-[#1e1e20] text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="p-4 touch-scroll-y custom-scrollbar min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filteredProducts.map((product) => {
            const isSelected = selectedProduct.id === product.id;

            return (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-sky-600/20 border-sky-500 ring-2 ring-sky-500/50 text-white'
                    : 'bg-[#18181a] border-[#2d2d30] hover:border-sky-500/40 text-gray-300'
                }`}
              >
                {/* Sample Image Preview Box */}
                <div className="relative w-full h-36 bg-[#121214] rounded-lg overflow-hidden mb-3 border border-white/5 flex items-center justify-center">
                  <img
                    src={product.samplePrints[0]}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-[10px] text-sky-300 font-mono rounded">
                    {product.printAspect}
                  </span>
                </div>

                <div className="flex items-center justify-between font-bold text-sm text-white mb-1">
                  <span className="flex items-center gap-1.5 truncate">
                    <ProductIcon product={product} className="w-4 h-4 text-sky-400 shrink-0" />
                    {product.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0 ml-1" />}
                </div>

                <span className="text-[11px] text-gray-400 mb-2">{product.description}</span>

                <div className="mt-auto flex items-center justify-between text-[10px] text-gray-500 font-mono pt-2 border-t border-[#2d2d30]">
                  <span>{product.material}</span>
                  <span className="text-sky-400 font-semibold">{product.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
