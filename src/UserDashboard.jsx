import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { DEFAULT_FOODS, findRdaForAge } from "./nutritionData";
import { estimateMealNutrients, computeDeficits, suggestFoodsForDeficits } from "./recommendationEngine";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const [age, setAge] = useState(12);
  const [entries, setEntries] = useState([]); // { foodIdOrName, grams }
  const [selectedFoodId, setSelectedFoodId] = useState(DEFAULT_FOODS[0]?.id || "");
  const [grams, setGrams] = useState(100);
  const [syncServer, setSyncServer] = useState(false);
  const userId = "demo-user";

  const totals = useMemo(() => estimateMealNutrients(entries), [entries]);
  const { rda, deficits } = useMemo(() => computeDeficits(Number(age) || 12, totals), [age, totals]);
  const suggestions = useMemo(() => suggestFoodsForDeficits(deficits, DEFAULT_FOODS, 3), [deficits]);

  const addEntry = async () => {
    if (!selectedFoodId || !grams) return;
    const newEntry = { foodIdOrName: selectedFoodId, grams: Number(grams) };
    setEntries([...entries, newEntry]);
    if (syncServer) {
      try {
        await fetch(`/api/meals/${userId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntry) });
      } catch {}
    }
  };

  const removeEntry = (idx) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (!syncServer) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/meals/${userId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setEntries(data);
      } catch {}
    })();
    return () => { mounted = false };
  }, [syncServer]);

  const chartData = useMemo(() => {
    return {
      labels: ["Calories", "Protein (g)", "Iron (mg)", "Vit C (mg)", "Calcium (mg)", "Vit D (IU)"],
      datasets: [
        {
          label: "Intake",
          data: [
            totals.calories || 0,
            totals.protein_g || 0,
            totals.iron_mg || 0,
            totals.vitaminC_mg || 0,
            totals.calcium_mg || 0,
            totals.vitaminD_IU || 0
          ],
          backgroundColor: "rgba(75,192,192,0.6)"
        },
        {
          label: "Recommended",
          data: [
            rda.calories,
            rda.protein_g,
            rda.iron_mg,
            rda.vitaminC_mg,
            rda.calcium_mg,
            rda.vitaminD_IU
          ],
          backgroundColor: "rgba(255,99,132,0.6)"
        }
      ]
    };
  }, [totals, rda]);

  return (
    <div style={{padding: "20px"}}>
      <h2>User Dashboard</h2>
      <div style={{marginBottom: "16px"}}>
        <h3>Profile</h3>
        <label>
          Age:
          <input type="number" min="4" max="18" value={age} onChange={(e) => setAge(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
        <span style={{ marginLeft: 12, color: "#666" }}>{findRdaForAge(Number(age) || 12).label}</span>
        <label style={{ marginLeft: 16 }}>
          <input type="checkbox" checked={syncServer} onChange={(e) => setSyncServer(e.target.checked)} /> sync with server
        </label>
      </div>

      <div>
        <h3>Log Meal</h3>
        <select value={selectedFoodId} onChange={(e) => setSelectedFoodId(e.target.value)}>
          {DEFAULT_FOODS.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <input type="number" min="1" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder="grams" style={{ marginLeft: 8, width: 100 }} />
        <button onClick={addEntry}>Add</button>
        <ul>
          {entries.map((entry, idx) => {
            const food = DEFAULT_FOODS.find(f => f.id === entry.foodIdOrName) || { name: entry.foodIdOrName };
            return (
              <li key={idx}>
                {food.name} - {entry.grams} g
                <button onClick={() => removeEntry(idx)} style={{ marginLeft: 8 }}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3>Nutrient Intake</h3>
        <Bar data={chartData} />
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Deficit Alerts</h3>
        <ul>
          {Object.entries(deficits).filter(([k]) => k !== "calories").map(([key, d]) => (
            <li key={key} style={{ color: d.gap > 0 ? "#c0392b" : "#2e7d32" }}>
              {key}: {d.have.toFixed(1)} / {d.target} {d.gap > 0 ? `(deficit ${d.gap.toFixed(1)})` : "(met)"}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Suggestions to Close Gaps</h3>
        <ul>
          {suggestions.map(f => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
        <div style={{ marginTop: 8 }}>
          <button onClick={async () => {
            try {
              const res = await fetch('/api/recommendations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ age: Number(age) || 12, entries }) });
              const data = await res.json();
              alert(`Server suggests: ${data.suggestions.map(s => s.name).join(', ')}`);
            } catch {}
          }}>Ask Server Recommendations</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
