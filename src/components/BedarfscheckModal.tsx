import React, { useState } from "react";
import { Dialog } from "./Dialog";

/**
 * Kleines Beispiel für einen Bedarfscheck:
 * - Stellt einfache Fragen
 * - Zeigt nach dem Abschicken eine Punktbewertung
 */
type BedarfscheckAnswers = {
  haushalt: string;
  einkommen: string;
  sicherheitImAlter: number;
  bestehendeVersicherungen: boolean;
};

export function BedarfscheckModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [answers, setAnswers] = useState<BedarfscheckAnswers>({
    haushalt: "",
    einkommen: "",
    sicherheitImAlter: 0,
    bestehendeVersicherungen: false,
  });
  const [results, setResults] = useState<Record<string, number> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Einfacher Algorithmus – bitte anpassen, wie du willst:
    const scores: Record<string, number> = {
      "Alltag": answers.haushalt === "Familie" ? 5 : 3,
      "Gesundheit & Pflege": answers.bestehendeVersicherungen ? 2 : 4,
      "Einkommenssicherung": answers.einkommen === "niedrig" ? 5 : 3,
      "Altersvorsorge": answers.sicherheitImAlter,
      // etc. Du kannst alle 6 Kategorien bewerten
    };
    setResults(scores);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {!results ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Bedarfscheck</h3>

          {/* Frage 1 */}
          <div>
            <label className="block mb-1">Wie viele Personen leben in Ihrem Haushalt?</label>
            <select
              value={answers.haushalt}
              onChange={(e) => setAnswers({ ...answers, haushalt: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Bitte wählen</option>
              <option value="Single">Single</option>
              <option value="Paar">Paar</option>
              <option value="Familie">Familie</option>
            </select>
          </div>

          {/* Frage 2 */}
          <div>
            <label className="block mb-1">Wie hoch ist Ihr monatliches Einkommen?</label>
            <select
              value={answers.einkommen}
              onChange={(e) => setAnswers({ ...answers, einkommen: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Bitte wählen</option>
              <option value="niedrig">Niedrig</option>
              <option value="mittel">Mittel</option>
              <option value="hoch">Hoch</option>
            </select>
          </div>

          {/* Frage 3 */}
          <div>
            <label className="block mb-1">Wie wichtig ist Ihnen finanzielle Sicherheit im Alter? (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              value={answers.sicherheitImAlter}
              onChange={(e) =>
                setAnswers({ ...answers, sicherheitImAlter: Number(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Frage 4 */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={answers.bestehendeVersicherungen}
                onChange={(e) =>
                  setAnswers({ ...answers, bestehendeVersicherungen: e.target.checked })
                }
                className="mr-2"
              />
              Ich habe bereits Versicherungen
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Ergebnisse anzeigen
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Ihre Empfehlung</h3>
          {Object.entries(results).map(([category, score]) => (
            <div key={category} className="flex justify-between border-b py-1">
              <span>{category}</span>
              <span>{score} Punkte</span>
            </div>
          ))}
          <button
            onClick={() => {
              setResults(null);
              onClose();
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Schließen
          </button>
        </div>
      )}
    </Dialog>
  );
}
