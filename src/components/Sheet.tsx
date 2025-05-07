import React from "react";

/**
 * Ein Drawer (Sheet) von rechts für Detailinfos.
 * 
 * @param open Steuert die Sichtbarkeit
 * @param onClose Wird aufgerufen, wenn der Nutzer das Sheet schließen möchte
 * @param children Inhalt des Sheets
 */
export function Sheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Halbtransparenter Hintergrund (zum Schließen) */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* Inhalt */}
      <div className="relative w-full sm:w-96 bg-white p-6 shadow-xl h-full overflow-auto">
        <button
          onClick={onClose}
          className="text-blue-600 hover:underline mb-4 absolute top-4 right-4"
        >
          Schließen
        </button>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
