import React, { useEffect, useMemo, useState } from "react";

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [rdas, setRdas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newFood, setNewFood] = useState({
    id: "",
    name: "",
    calories: 0,
    protein_g: 0,
    iron_mg: 0,
    vitaminC_mg: 0,
    calcium_mg: 0,
    vitaminD_IU: 0
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [fRes, rRes] = await Promise.all([
          fetch("/api/foods"),
          fetch("/api/rdas")
        ]);
        const [fJson, rJson] = await Promise.all([fRes.json(), rRes.json()]);
        if (!mounted) return;
        setFoods(fJson);
        setRdas(rJson);
      } catch (e) {
        setError("Failed to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const canAddFood = useMemo(() => newFood.id && newFood.name, [newFood]);

  async function addFood() {
    if (!canAddFood) return;
    try {
      setError("");
      const res = await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newFood,
          calories: Number(newFood.calories) || 0,
          protein_g: Number(newFood.protein_g) || 0,
          iron_mg: Number(newFood.iron_mg) || 0,
          vitaminC_mg: Number(newFood.vitaminC_mg) || 0,
          calcium_mg: Number(newFood.calcium_mg) || 0,
          vitaminD_IU: Number(newFood.vitaminD_IU) || 0
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to add food");
      }
      const created = await res.json();
      setFoods([...foods, created]);
      setNewFood({ id: "", name: "", calories: 0, protein_g: 0, iron_mg: 0, vitaminC_mg: 0, calcium_mg: 0, vitaminD_IU: 0 });
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteFood(id) {
    try {
      setError("");
      const res = await fetch(`/api/foods/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Failed to delete food");
      setFoods(foods.filter(f => f.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function updateRda(id, field, value) {
    try {
      setError("");
      const res = await fetch(`/api/rdas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: Number(value) || 0 })
      });
      if (!res.ok) throw new Error("Failed to update RDA");
      const updated = await res.json();
      setRdas(rdas.map(r => r.id === id ? updated : r));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div style={{padding: "20px"}}>
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#c0392b" }}>{error}</p>}

      <div>
        <h3>Manage Foods</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <input type="text" value={newFood.id} onChange={(e) => setNewFood({ ...newFood, id: e.target.value })} placeholder="id" />
          <input type="text" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} placeholder="name" />
          <input type="number" value={newFood.calories} onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })} placeholder="kcal/100g" />
          <input type="number" value={newFood.protein_g} onChange={(e) => setNewFood({ ...newFood, protein_g: e.target.value })} placeholder="protein g" />
          <input type="number" value={newFood.iron_mg} onChange={(e) => setNewFood({ ...newFood, iron_mg: e.target.value })} placeholder="iron mg" />
          <input type="number" value={newFood.vitaminC_mg} onChange={(e) => setNewFood({ ...newFood, vitaminC_mg: e.target.value })} placeholder="vit C mg" />
          <input type="number" value={newFood.calcium_mg} onChange={(e) => setNewFood({ ...newFood, calcium_mg: e.target.value })} placeholder="calcium mg" />
          <input type="number" value={newFood.vitaminD_IU} onChange={(e) => setNewFood({ ...newFood, vitaminD_IU: e.target.value })} placeholder="vit D IU" />
          <button onClick={addFood} disabled={!canAddFood}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th><th>Name</th><th>kcal</th><th>Protein (g)</th><th>Iron (mg)</th><th>Vit C (mg)</th><th>Calcium (mg)</th><th>Vit D (IU)</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.calories}</td>
                <td>{f.protein_g}</td>
                <td>{f.iron_mg}</td>
                <td>{f.vitaminC_mg}</td>
                <td>{f.calcium_mg}</td>
                <td>{f.vitaminD_IU}</td>
                <td><button onClick={() => deleteFood(f.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Recommended Daily Allowances (edit inline)</h3>
        <table>
          <thead>
            <tr>
              <th>Age Band</th><th>Calories</th><th>Protein (g)</th><th>Iron (mg)</th><th>Vit C (mg)</th><th>Calcium (mg)</th><th>Vit D (IU)</th>
            </tr>
          </thead>
          <tbody>
            {rdas.map((r) => (
              <tr key={r.id}>
                <td>{r.label}</td>
                <td><input type="number" defaultValue={r.calories} onBlur={(e) => updateRda(r.id, "calories", e.target.value)} /></td>
                <td><input type="number" defaultValue={r.protein_g} onBlur={(e) => updateRda(r.id, "protein_g", e.target.value)} /></td>
                <td><input type="number" defaultValue={r.iron_mg} onBlur={(e) => updateRda(r.id, "iron_mg", e.target.value)} /></td>
                <td><input type="number" defaultValue={r.vitaminC_mg} onBlur={(e) => updateRda(r.id, "vitaminC_mg", e.target.value)} /></td>
                <td><input type="number" defaultValue={r.calcium_mg} onBlur={(e) => updateRda(r.id, "calcium_mg", e.target.value)} /></td>
                <td><input type="number" defaultValue={r.vitaminD_IU} onBlur={(e) => updateRda(r.id, "vitaminD_IU", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
