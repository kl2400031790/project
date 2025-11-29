import { DEFAULT_FOODS, findRdaForAge } from "./nutritionData";

function normalizeFoodIndex(foods) {
  const index = new Map();
  for (const food of foods) {
    index.set(food.id, food);
    index.set(food.name.toLowerCase(), food);
  }
  return index;
}

export function estimateMealNutrients(mealEntries, foods = DEFAULT_FOODS) {
  // mealEntries: [{ foodIdOrName, grams, customFood?, nutrients? }]
  const foodIndex = normalizeFoodIndex(foods);
  const totals = {
    calories: 0,
    protein_g: 0,
    iron_mg: 0,
    vitaminC_mg: 0,
    calcium_mg: 0,
    vitaminD_IU: 0
  };
  for (const entry of mealEntries) {
    const factor = (entry.grams ?? 100) / 100;
    
    // Handle custom foods with nutrients stored directly in entry
    if (entry.customFood && entry.nutrients) {
      totals.calories += (entry.nutrients.calories || 0) * factor;
      totals.protein_g += (entry.nutrients.protein_g || 0) * factor;
      totals.iron_mg += (entry.nutrients.iron_mg || 0) * factor;
      totals.vitaminC_mg += (entry.nutrients.vitaminC_mg || 0) * factor;
      totals.calcium_mg += (entry.nutrients.calcium_mg || 0) * factor;
      totals.vitaminD_IU += (entry.nutrients.vitaminD_IU || 0) * factor;
      continue;
    }
    
    // Handle regular foods from food database
    const key = (entry.foodIdOrName || "").toString().toLowerCase();
    const food = foodIndex.get(key);
    if (!food) continue;
    totals.calories += food.calories * factor;
    totals.protein_g += food.protein_g * factor;
    totals.iron_mg += food.iron_mg * factor;
    totals.vitaminC_mg += food.vitaminC_mg * factor;
    totals.calcium_mg += food.calcium_mg * factor;
    totals.vitaminD_IU += food.vitaminD_IU * factor;
  }
  return totals;
}

export function computeDeficits(age, totals) {
  const rda = findRdaForAge(age);
  const deficits = {};
  const keys = [
    ["calories", rda.calories],
    ["protein_g", rda.protein_g],
    ["iron_mg", rda.iron_mg],
    ["vitaminC_mg", rda.vitaminC_mg],
    ["calcium_mg", rda.calcium_mg],
    ["vitaminD_IU", rda.vitaminD_IU]
  ];
  for (const [k, target] of keys) {
    const have = totals[k] ?? 0;
    const gap = Math.max(0, target - have);
    deficits[k] = { target, have, gap, pct: target > 0 ? (have / target) : 1 };
  }
  return { rda, deficits };
}

export function suggestFoodsForDeficits(deficits, foods = DEFAULT_FOODS, limit = 3, healthCondition = null) {
  // Filter foods based on health condition
  let filteredFoods = foods;
  if (healthCondition) {
    filteredFoods = filterFoodsForCondition(foods, healthCondition);
  }
  
  // score foods by how much they close the largest gaps per 100g
  const keys = Object.entries(deficits)
    .filter(([k]) => k !== "calories") // de-emphasize calories for healthfulness
    .sort((a, b) => b[1].gap - a[1].gap)
    .map(([k]) => k);

  const scored = filteredFoods.map((f) => {
    let score = 0;
    for (const k of keys) {
      const per100 = f[k] ?? 0;
      if (per100 <= 0) continue;
      const gap = deficits[k].gap;
      score += Math.min(per100, gap) * weightForNutrient(k);
    }
    return { food: f, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, limit).map(s => s.food);
}

function weightForNutrient(key) {
  switch (key) {
    case "iron_mg": return 3;
    case "vitaminD_IU": return 3;
    case "vitaminC_mg": return 2;
    case "calcium_mg": return 2;
    case "protein_g": return 1.5;
    default: return 1;
  }
}

// Filter foods based on health condition
function filterFoodsForCondition(foods, condition) {
  if (!condition) return foods;
  
  const conditionLower = condition.toLowerCase();
  
  // Diabetes-friendly foods (low sugar, high fiber, low GI)
  if (conditionLower.includes("diabetes")) {
    return foods.filter(f => {
      const name = f.name.toLowerCase();
      // Prefer: vegetables, lean proteins, whole grains, low-sugar fruits
      // Avoid: high-sugar items (though our food list doesn't have many)
      return !name.includes("cereal") || name.includes("fortified"); // Keep fortified cereal for nutrients
    });
  }
  
  // Heart disease - focus on omega-3, low saturated fat
  if (conditionLower.includes("heart")) {
    return foods.filter(f => {
      const name = f.name.toLowerCase();
      // Prefer: fish, vegetables, fruits, whole grains
      return !name.includes("chicken") || name.includes("breast"); // Prefer lean meats
    });
  }
  
  // Obesity - focus on high protein, high fiber, low calorie density
  if (conditionLower.includes("obesity")) {
    return foods.filter(f => {
      // Prefer foods with good protein-to-calorie ratio
      const proteinRatio = f.protein_g / (f.calories || 1);
      return proteinRatio > 0.1 || f.calories < 100; // High protein or low calorie
    });
  }
  
  // Anemia - focus on iron-rich foods
  if (conditionLower.includes("anemia")) {
    return foods.sort((a, b) => (b.iron_mg || 0) - (a.iron_mg || 0));
  }
  
  return foods;
}

export function generateDailyPlan(age, desiredCalories, foods = DEFAULT_FOODS, healthCondition = null) {
  // Filter foods based on health condition
  const filteredFoods = filterFoodsForCondition(foods, healthCondition);
  
  // very simple greedy planner: pick foods that close largest nutrient gaps until calories reached
  const targetCalories = desiredCalories;
  let meals = [];
  let totals = estimateMealNutrients([], filteredFoods);
  let { deficits } = computeDeficits(age, totals);
  let caloriesAccum = 0;

  while (caloriesAccum < targetCalories && meals.length < 6) {
    const suggestions = suggestFoodsForDeficits(deficits, filteredFoods, 1);
    const pick = suggestions[0] ?? filteredFoods[0];
    if (!pick) break;
    const portionGrams = 100; // fixed portion
    meals.push({ foodIdOrName: pick.id, grams: portionGrams });
    totals = estimateMealNutrients(meals, filteredFoods);
    caloriesAccum = totals.calories;
    deficits = computeDeficits(age, totals).deficits;
  }

  return { meals, totals, deficits, healthCondition };
}


