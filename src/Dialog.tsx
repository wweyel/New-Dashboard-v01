import React from "react";

/**
 * Ein einfaches Dialog-Modal, zentriert über dem Bildschirm.
 * 
 * @param open Steuert die Sichtbarkeit
 * @param onClose Wird aufgerufen, wenn der Nutzer das Modal schließen möchte
 * @param children Inhalt des Modals
 */
export function Dialog({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-lg max-w-xl w-full">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
}
