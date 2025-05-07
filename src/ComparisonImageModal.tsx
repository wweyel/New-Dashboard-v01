import React from 'react';

const ComparisonImageModal = ({
    open,
    onClose,
    imageUrl
}: {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="relative w-full h-full flex items-center justify-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-50"
                >
                    ❌
                </button>
                <img src={imageUrl} alt="Vergleichsbild" className="w-full h-full object-contain" />
            </div>
        </div>
    );
};

export default ComparisonImageModal;
