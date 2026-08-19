import React from 'react';
import {
  Coffee,
  Shirt,
  GlassWater,
  CupSoda,
  Gamepad2,
  ShoppingBag,
  Crown,
  Grid,
  Box,
  Puzzle,
  Smartphone,
  Disc,
  Package,
} from 'lucide-react';
import { SublimationProduct } from '../types';

interface ProductIconProps {
  product?: SublimationProduct | null;
  productId?: string;
  category?: string;
  model3D?: string;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({
  product,
  productId,
  category,
  model3D,
  className = 'w-5 h-5',
}) => {
  const id = (product?.id || productId || '').toLowerCase();
  const cat = (product?.category || category || '').toLowerCase();
  const model = (product?.model3D || model3D || '').toLowerCase();

  // Match by ID, model, or category
  if (id.includes('caneca') || model === 'mug' || cat.includes('caneca')) {
    return <Coffee className={className} />;
  }

  if (id.includes('camiseta') || model === 'tshirt' || cat.includes('camiseta')) {
    return <Shirt className={className} />;
  }

  if (id.includes('garrafa') || model === 'bottle' || cat.includes('garrafa')) {
    return <GlassWater className={className} />;
  }

  if (id.includes('copo') || model === 'tumbler' || cat.includes('copo')) {
    return <CupSoda className={className} />;
  }

  if (id.includes('mouse') || model === 'mousepad' || cat.includes('mouse')) {
    return <Gamepad2 className={className} />;
  }

  if (id.includes('ecobag') || model === 'ecobag' || cat.includes('ecobag')) {
    return <ShoppingBag className={className} />;
  }

  if (id.includes('bone') || id.includes('boné') || model === 'cap' || cat.includes('boné') || cat.includes('bone')) {
    return <Crown className={className} />;
  }

  if (id.includes('azulejo') || model === 'tile' || cat.includes('azulejo')) {
    return <Grid className={className} />;
  }

  if (id.includes('almofada') || model === 'pillow' || cat.includes('almofada')) {
    return <Box className={className} />;
  }

  if (id.includes('quebra') || model === 'puzzle' || cat.includes('quebra')) {
    return <Puzzle className={className} />;
  }

  if (id.includes('capinha') || model === 'phonecase' || cat.includes('capinha')) {
    return <Smartphone className={className} />;
  }

  if (id.includes('porta') || id.includes('coaster') || model === 'coaster' || cat.includes('brinde')) {
    return <Disc className={className} />;
  }

  return <Package className={className} />;
};
