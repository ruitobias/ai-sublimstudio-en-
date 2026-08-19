import React from 'react';
import { SublimationProduct } from '../types';
import { PrintSublimationModal } from './PrintSublimationModal';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: SublimationProduct;
  canvasElement: HTMLCanvasElement | null;
  mirrorSublimation: boolean;
  onOpenPrintModal?: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  product,
  canvasElement,
  mirrorSublimation,
}) => {
  return (
    <PrintSublimationModal
      isOpen={isOpen}
      onClose={onClose}
      currentProduct={product}
      canvasElement={canvasElement}
      mirrorSublimation={mirrorSublimation}
    />
  );
};
