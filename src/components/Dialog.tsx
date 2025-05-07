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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-600 hover:underline"
        >
          Schließen
        </button>
        {children}
      </div>
    </div>
  );
}
