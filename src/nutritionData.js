// Nutrition datasets and helpers
// Units: nutrients per 100g edible portion unless noted; calories in kcal

export const DEFAULT_FOODS = [
  { id: "apple", name: "Apple", calories: 52, protein_g: 0.3, iron_mg: 0.1, vitaminC_mg: 4.6, calcium_mg: 6, vitaminD_IU: 0 },
  { id: "banana", name: "Banana", calories: 96, protein_g: 1.3, iron_mg: 0.3, vitaminC_mg: 8.7, calcium_mg: 5, vitaminD_IU: 0 },
  { id: "milk", name: "Milk (cow)", calories: 61, protein_g: 3.2, iron_mg: 0, vitaminC_mg: 0, calcium_mg: 113, vitaminD_IU: 52 },
  { id: "egg", name: "Egg", calories: 155, protein_g: 13, iron_mg: 1.2, vitaminC_mg: 0, calcium_mg: 50, vitaminD_IU: 82 },
  { id: "spinach", name: "Spinach", calories: 23, protein_g: 2.9, iron_mg: 2.7, vitaminC_mg: 28.1, calcium_mg: 99, vitaminD_IU: 0 },
  { id: "orange", name: "Orange", calories: 47, protein_g: 0.9, iron_mg: 0.1, vitaminC_mg: 53.2, calcium_mg: 40, vitaminD_IU: 0 },
  { id: "chicken", name: "Chicken Breast", calories: 165, protein_g: 31, iron_mg: 0.9, vitaminC_mg: 0, calcium_mg: 15, vitaminD_IU: 0 },
  { id: "lentils", name: "Lentils (boiled)", calories: 116, protein_g: 9.0, iron_mg: 3.3, vitaminC_mg: 1.5, calcium_mg: 19, vitaminD_IU: 0 },
  { id: "broccoli", name: "Broccoli", calories: 34, protein_g: 2.8, iron_mg: 0.7, vitaminC_mg: 89.2, calcium_mg: 47, vitaminD_IU: 0 },
  { id: "fortified_cereal", name: "Fortified Cereal", calories: 357, protein_g: 8, iron_mg: 28, vitaminC_mg: 0, calcium_mg: 20, vitaminD_IU: 40 }
];

// Recommended Daily Allowances (approx.) for all ages
// Source approximations; simplified per age band and sex-neutral for demo
// calories are targets per day; protein in g; iron/VitC/calcium mg; vitamin D IU
export const DEFAULT_RDA = [
  { id: "4-8", label: "Age 4-8", calories: 1400, protein_g: 19, iron_mg: 10, vitaminC_mg: 25, calcium_mg: 1000, vitaminD_IU: 600 },
  { id: "9-13", label: "Age 9-13", calories: 1800, protein_g: 34, iron_mg: 8, vitaminC_mg: 45, calcium_mg: 1300, vitaminD_IU: 600 },
  { id: "14-18", label: "Age 14-18", calories: 2200, protein_g: 46, iron_mg: 11, vitaminC_mg: 65, calcium_mg: 1300, vitaminD_IU: 600 },
  { id: "19-30", label: "Age 19-30", calories: 2400, protein_g: 56, iron_mg: 8, vitaminC_mg: 90, calcium_mg: 1000, vitaminD_IU: 600 },
  { id: "31-50", label: "Age 31-50", calories: 2200, protein_g: 56, iron_mg: 8, vitaminC_mg: 90, calcium_mg: 1000, vitaminD_IU: 600 },
  { id: "51+", label: "Age 51+", calories: 2000, protein_g: 56, iron_mg: 8, vitaminC_mg: 90, calcium_mg: 1200, vitaminD_IU: 800 }
];

export function findRdaForAge(age) {
  const numAge = Number(age) || 19;
  if (numAge <= 8) return DEFAULT_RDA[0];
  if (numAge <= 13) return DEFAULT_RDA[1];
  if (numAge <= 18) return DEFAULT_RDA[2];
  if (numAge <= 30) return DEFAULT_RDA[3];
  if (numAge <= 50) return DEFAULT_RDA[4];
  return DEFAULT_RDA[5];
}


