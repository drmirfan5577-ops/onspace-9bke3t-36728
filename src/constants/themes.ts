export interface Theme {
  id: string;
  name: string;
  nameUrdu: string;
  cssClass: string;
  preview: string;
}

export const THEMES: Theme[] = [
  { id: "white", name: "Pure White", nameUrdu: "خالص سفید", cssClass: "bg-theme-white", preview: "#FFFFFF" },
  { id: "paradise", name: "Paradise Garden", nameUrdu: "جنتی باغ", cssClass: "bg-theme-paradise", preview: "#d4edda" },
  { id: "ocean", name: "Ocean Blue", nameUrdu: "سمندری نیلا", cssClass: "bg-theme-ocean", preview: "#dbeafe" },
  { id: "sunset", name: "Golden Sunset", nameUrdu: "سنہری غروب", cssClass: "bg-theme-sunset", preview: "#fde8cc" },
  { id: "galaxy", name: "Galaxy", nameUrdu: "کہکشاں", cssClass: "bg-theme-galaxy", preview: "#e0e7ff" },
  { id: "rose", name: "Rose Garden", nameUrdu: "گلاب باغ", cssClass: "bg-theme-rose", preview: "#fce7f3" },
  { id: "mint", name: "Fresh Mint", nameUrdu: "تازہ پودینہ", cssClass: "bg-theme-mint", preview: "#d1fae5" },
  { id: "golden", name: "Golden Light", nameUrdu: "سنہری روشنی", cssClass: "bg-theme-golden", preview: "#fef3c7" },
  { id: "pearl", name: "Pearl Gray", nameUrdu: "موتی خاکی", cssClass: "bg-theme-pearl", preview: "#f8fafc" },
  { id: "lavender", name: "Lavender", nameUrdu: "لیوینڈر", cssClass: "bg-theme-lavender", preview: "#ede9fe" },
];
