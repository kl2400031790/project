import express from "express";
import cors from "cors";
import { loadUsers, saveUsers } from "./storage.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// Load users from file
let users = loadUsers();

// Foods data
let foods = [
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

// RDA data
let rdas = [
  { id: "4-8", label: "Age 4-8", calories: 1400, protein_g: 19, iron_mg: 10, vitaminC_mg: 25, calcium_mg: 1000, vitaminD_IU: 600 },
  { id: "9-13", label: "Age 9-13", calories: 1800, protein_g: 34, iron_mg: 8, vitaminC_mg: 45, calcium_mg: 1300, vitaminD_IU: 600 },
  { id: "14-18", label: "Age 14-18", calories: 2200, protein_g: 46, iron_mg: 11, vitaminC_mg: 65, calcium_mg: 1300, vitaminD_IU: 600 }
];

// Meals storage
let mealsByUser = {};

// === AUTH ENDPOINTS ===
app.post('/api/auth/signup', (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters' });
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      password: password,
      role: role === 'admin' ? 'admin' : 'user'
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Return user without password
    const { password: _, ...userResponse } = newUser;
    res.status(201).json(userResponse);
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Return user without password
    const { password: _, ...userResponse } = user;
    res.json(userResponse);
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// === FOODS ENDPOINTS ===
app.get("/api/foods", (req, res) => {
  res.json(foods);
});

app.post("/api/foods", (req, res) => {
  const f = req.body;
  if (!f?.id || !f?.name) return res.status(400).json({ error: "id and name required" });
  if (foods.some(x => x.id === f.id)) return res.status(409).json({ error: "id exists" });
  foods.push(f);
  res.status(201).json(f);
});

app.put("/api/foods/:id", (req, res) => {
  const i = foods.findIndex(x => x.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "not found" });
  foods[i] = { ...foods[i], ...req.body };
  res.json(foods[i]);
});

app.delete("/api/foods/:id", (req, res) => {
  const before = foods.length;
  foods = foods.filter(x => x.id !== req.params.id);
  if (foods.length === before) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

// === RDA ENDPOINTS ===
app.get("/api/rdas", (req, res) => res.json(rdas));
app.put("/api/rdas/:id", (req, res) => {
  const i = rdas.findIndex(x => x.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "not found" });
  rdas[i] = { ...rdas[i], ...req.body };
  res.json(rdas[i]);
});

// === MEALS ENDPOINTS ===
app.get("/api/meals/:userId", (req, res) => {
  res.json(mealsByUser[req.params.userId] || []);
});

app.post("/api/meals/:userId", (req, res) => {
  const arr = mealsByUser[req.params.userId] || [];
  const entry = { ...req.body, at: Date.now() };
  arr.push(entry);
  mealsByUser[req.params.userId] = arr;
  res.status(201).json(entry);
});

// === RECOMMENDATIONS ===
function findRdaForAge(age) {
  if (age <= 8) return rdas.find(r => r.id === "4-8");
  if (age <= 13) return rdas.find(r => r.id === "9-13");
  return rdas.find(r => r.id === "14-18");
}

function normalizeFoodIndex() {
  const index = new Map();
  for (const food of foods) {
    index.set(food.id, food);
    index.set((food.name || "").toLowerCase(), food);
  }
  return index;
}

function estimateMealNutrients(entries) {
  const idx = normalizeFoodIndex();
  const totals = { calories: 0, protein_g: 0, iron_mg: 0, vitaminC_mg: 0, calcium_mg: 0, vitaminD_IU: 0 };
  for (const e of entries || []) {
    const key = (e.foodIdOrName || "").toString().toLowerCase();
    const f = idx.get(key);
    if (!f) continue;
    const factor = (e.grams ?? 100) / 100;
    totals.calories += f.calories * factor;
    totals.protein_g += f.protein_g * factor;
    totals.iron_mg += f.iron_mg * factor;
    totals.vitaminC_mg += f.vitaminC_mg * factor;
    totals.calcium_mg += f.calcium_mg * factor;
    totals.vitaminD_IU += f.vitaminD_IU * factor;
  }
  return totals;
}

function computeDeficits(age, totals) {
  const rda = findRdaForAge(age);
  const keys = ["calories", "protein_g", "iron_mg", "vitaminC_mg", "calcium_mg", "vitaminD_IU"];
  const deficits = {};
  for (const k of keys) {
    const target = rda[k];
    const have = totals[k] || 0;
    const gap = Math.max(0, target - have);
    deficits[k] = { target, have, gap, pct: target > 0 ? have / target : 1 };
  }
  return { rda, deficits };
}

function nutrientWeight(k) {
  switch (k) {
    case "iron_mg": return 3;
    case "vitaminD_IU": return 3;
    case "vitaminC_mg": return 2;
    case "calcium_mg": return 2;
    case "protein_g": return 1.5;
    default: return 1;
  }
}

function suggestFoodsForDeficits(deficits) {
  const keys = Object.entries(deficits)
    .filter(([k]) => k !== "calories")
    .sort((a, b) => b[1].gap - a[1].gap)
    .map(([k]) => k);
  const scored = foods.map((f) => {
    let score = 0;
    for (const k of keys) {
      const per100 = f[k] ?? 0;
      if (per100 <= 0) continue;
      const gap = deficits[k].gap;
      score += Math.min(per100, gap) * nutrientWeight(k);
    }
    return { food: f, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, 3).map(s => s.food);
}

app.post("/api/recommendations", (req, res) => {
  try {
    const age = Number(req.body?.age) || 12;
    const entries = Array.isArray(req.body?.entries) ? req.body.entries : [];
    const totals = estimateMealNutrients(entries);
    const { rda, deficits } = computeDeficits(age, totals);
    const suggestions = suggestFoodsForDeficits(deficits);
    res.json({ totals, rda, deficits, suggestions });
  } catch (e) {
    res.status(400).json({ error: "Failed to compute recommendations" });
  }
});

const port = process.env.PORT || 5174;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
});