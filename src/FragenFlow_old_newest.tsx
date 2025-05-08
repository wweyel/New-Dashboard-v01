import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Home,
  Briefcase,
  HeartPulse,
  Stethoscope,
  PiggyBank,
  ShieldCheck,
  Baby,
  Users,
  Folder
} from 'lucide-react';

const icons: Record<string, JSX.Element> = {
  "Alltag": <ShieldCheck className="w-5 h-5 text-red-500" />, 
  "Einkommenssicherung": <Briefcase className="w-5 h-5 text-red-500" />,
  "Gesundheit & Pflege": <HeartPulse className="w-5 h-5 text-red-500" />,
  "Altersvorsorge": <PiggyBank className="w-5 h-5 text-red-500" />,
  "Hinterbliebene": <Users className="w-5 h-5 text-red-500" />,
  "Spezialtarife": <Baby className="w-5 h-5 text-red-500" />
};

const produktKategorieMap: Record<string, string> = {
  "Privathaftpflicht": "Alltag",
  "Tierhalterhaftpflicht": "Alltag",
  "Hausrat": "Alltag",
  "Wohngebäude": "Alltag",
  "Unfallversicherung": "Alltag",
  "Rechtsschutzversicherung": "Alltag",
  "Kfz-Versicherung": "Alltag",
  "Vollversicherung (PKV)": "Gesundheit & Pflege",
  "Zusatzversicherung": "Gesundheit & Pflege",
  "Pflegeversicherung": "Gesundheit & Pflege",
  "Tierkrankenversicherung": "Gesundheit & Pflege",
  "Berufsunfähigkeit": "Einkommenssicherung",
  "Erwerbsunfähigkeit": "Einkommenssicherung",
  "Grundfähigkeitsversicherung": "Einkommenssicherung",
  "Dread Disease": "Einkommenssicherung",
  "Basis-Rente": "Altersvorsorge",
  "Sofort-Basis-Rente": "Altersvorsorge",
  "Riester-Rente": "Altersvorsorge",
  "Direktversicherung": "Altersvorsorge",
  "Direktversicherung BU": "Altersvorsorge",
  "Unterstützungskasse": "Altersvorsorge",
  "Private Rente": "Altersvorsorge",
  "Sofortrente": "Altersvorsorge",
  "Risikolebensversicherung": "Hinterbliebene",
  "Sterbegeldversicherung": "Hinterbliebene",
  "Kinderspezialtarife": "Spezialtarife"
};

export { icons, produktKategorieMap };


const fragenbaum = [
  {
    id: "haushalt",
    text: "Lebst du in einem eigenen Haushalt?",
    category: "Alltag",
    options: [
      { value: "ja", followUp: ["hausBesitz"] },
      { value: "nein" }
    ],
    triggers: ["Privathaftpflicht", "Hausrat"]
  },
  {
    id: "hausBesitz",
    text: "Besitzt du ein Haus oder eine Eigentumswohnung?",
    category: "Alltag",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Wohngebäude"]
  },
  {
    id: "fahrzeug",
    text: "Hast du ein eigenes Auto oder Motorrad?",
    category: "Alltag",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Kfz-Versicherung"]
  },
  {
    id: "beruf",
    text: "Bist du selbstständig oder freiberuflich tätig?",
    category: "Einkommenssicherung",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Berufsunfähigkeit", "Basis-Rente", "Private Rente"]
  },
  {
    id: "kinder",
    text: "Hast du Kinder?",
    category: "Hinterbliebene",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Risikolebensversicherung", "Kinderspezialtarife"]
  },
  {
    id: "zusatzversicherung",
    text: "Hast du regelmäßig Gesundheitskosten, die nicht von der gesetzlichen Kasse übernommen werden?",
    category: "Gesundheit",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Zusatzversicherung"]
  },
  {
    id: "pflegevorsorge",
    text: "Möchtest du im Pflegefall finanziell unabhängig bleiben?",
    category: "Pflege",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Pflegeversicherung"]
  },
  {
    id: "altersvorsorge",
    text: "Willst du zusätzlich für das Alter vorsorgen?",
    category: "Vorsorge",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Private Rente", "Riester-Rente"]
  },
  {
    id: "kapitalsofort",
    text: "Möchtest du sofort Kapital fürs Alter anlegen?",
    category: "Vorsorge",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Sofortrente"]
  },
  {
    id: "arbeitskraftabsicherung",
    text: "Willst du dich gegen den Verlust deiner Arbeitskraft absichern?",
    category: "Absicherung",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Berufsunfähigkeit", "Erwerbsunfähigkeit", "Grundfähigkeitsversicherung", "Dread Disease"]
  },
  {
    id: "kindervorsorge",
    text: "Möchtest du deine Kinder auch bei Krankheit oder Unfall gut versichern?",
    category: "Familie",
    options: [
      { value: "ja" },
      { value: "nein" }
    ],
    triggers: ["Kinderspezialtarife", "Unfallversicherung"]
  }
];

const gewichtLabels: Record<number, string> = {
  5: "Pflicht",
  4: "Sehr wichtig",
  3: "Relevant",
  2: "Optional",
  1: "Gering"
};

const fragenKategorieMap: Record<string, string> = {};
fragenbaum.forEach((frage) => {
  frage.triggers?.forEach((produkt) => {
    fragenKategorieMap[produkt] = frage.category;
  });
});

const FragenFlow = ({
  onFinish,
  onÜbernehmen,
  onResetEmpfehlungen
}: {
  onFinish: (antworten: Record<string, string>) => void;
  onÜbernehmen: (produkt: string, gewichtung: number) => void;
  onResetEmpfehlungen: () => void;
}) => {
  const [antworten, setAntworten] = useState<Record<string, string>>({});
  const [aktuelleFragen, setAktuelleFragen] = useState([fragenbaum[0]]);
  const [index, setIndex] = useState(0);

  const aktuelleFrage = aktuelleFragen[index];

  const handleAntwort = (value: string) => {
    const neueAntworten = { ...antworten, [aktuelleFrage.id]: value };
    setAntworten(neueAntworten);

    const selectedOption = aktuelleFrage.options.find(o => o.value === value);
    const nextIds = selectedOption?.followUp || [];
    const nextFragen = nextIds.map(id => fragenbaum.find(f => f.id === id)).filter(Boolean) as typeof fragenbaum;

    const nächsteFrage = fragenbaum.find(
      f => !neueAntworten[f.id] && !aktuelleFragen.includes(f) && !nextFragen.includes(f)
    );

    const neueFragenReihenfolge = [...aktuelleFragen, ...nextFragen];
    if (nächsteFrage) neueFragenReihenfolge.push(nächsteFrage);

    setAktuelleFragen(neueFragenReihenfolge);
    setIndex(index + 1);
  };

  const getEmpfehlungen = () => {
    const gewichtungen: Record<string, number> = {};

    fragenbaum.forEach((frage) => {
      if (antworten[frage.id] === "ja") {
        frage.triggers?.forEach((produkt) => {
          gewichtungen[produkt] = (gewichtungen[produkt] || 0) + frage.gewichtung;
        });
      }
    });

    return Object.entries(gewichtungen)
      .map(([produkt, gewichtung]) => ({
        produkt,
        gewichtung,
        kategorie: produktKategorieMap[produkt] || "Sonstiges"
      }))    
      .sort((a, b) => b.gewichtung - a.gewichtung);
  };

  if (!aktuelleFrage) {
    const empfehlungen = getEmpfehlungen();
    const gruppiert: Record<string, { produkt: string; gewichtung: number; kategorie: string }[]> = {};
    empfehlungen.forEach((e) => {
      gruppiert[e.kategorie] = gruppiert[e.kategorie] || [];
      gruppiert[e.kategorie].push(e);
    });

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Deine Produktempfehlungen</h2>
        <p className="text-gray-600">
          Basierend auf deinen Antworten empfehlen wir dir folgende Versicherungen:
        </p>

        {Object.entries(gruppiert).map(([kategorie, produkte]) => (
          <div key={kategorie}>
            <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center gap-2">
  <span className="text-blue-600">
    {icons[kategorie] || <Folder size={18} />}
  </span>

  {kategorie}
</h3>
            <ul className="space-y-4">
              {produkte.map(({ produkt, gewichtung }) => (
                <li key={produkt} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-800 font-medium">{produkt}</div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      gewichtung >= 5 ? 'bg-green-600 text-white' :
                      gewichtung === 4 ? 'bg-yellow-400 text-gray-900' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {gewichtLabels[gewichtung]}
                    </span>
                  </div>
                  <button
                    onClick={() => onÜbernehmen(produkt, gewichtung)}
                    className="mt-2 text-blue-600 text-sm hover:underline"
                  >
                    ➕ In Ordner übernehmen
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            onClick={() => {
              onResetEmpfehlungen();
              empfehlungen.forEach(({ produkt, gewichtung }) => {
                onÜbernehmen(produkt, gewichtung);
              });
              toast.success(`${empfehlungen.length} Empfehlung${empfehlungen.length > 1 ? 'en' : ''} übernommen.`);
              onFinish(antworten);
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Alle übernehmen & abschließen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Frage {index + 1}</h2>
        <p className="text-lg mt-2">{aktuelleFrage.text}</p>
      </div>

      <div className="flex gap-4">
        {aktuelleFrage.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAntwort(option.value)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FragenFlow;
