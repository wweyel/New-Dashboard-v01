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
    <div className="fixed inset-0 z-[1000] flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md h-full shadow-xl overflow-auto">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
}
