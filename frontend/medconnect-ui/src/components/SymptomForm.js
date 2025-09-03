import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function SymptomForm() {
  const [symptoms, setSymptoms] = useState([]);
  const [form, setForm] = useState({});
  const [result, setResult] = useState("");
  const [probs, setProbs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE}/symptoms`).then((res) => {
      const list = res.data.symptoms || [];
      setSymptoms(list);
      const init = {};
      list.forEach((s) => (init[s] = 0));
      setForm(init);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/predict`, form);
      setResult(res.data.prediction);
      setProbs(res.data.probabilities || null);
    } catch {
      alert("Prediction failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const visibleSymptoms = symptoms.filter(s => s.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <div className="mb-3">
        <input
          placeholder="Search symptom..."
          className="border rounded px-3 py-2 w-full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto border rounded p-3">
        {visibleSymptoms.map((sym, i) => (
          <label key={i} className="flex items-center gap-2">
            <input type="checkbox" name={sym} onChange={handleChange} />
            <span className="text-sm">{sym}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="mt-4">
          <p className="font-semibold">Prediction: <span className="font-bold">{result}</span></p>
          {probs && (
            <details className="mt-2">
              <summary className="cursor-pointer">Show probabilities</summary>
              <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
{JSON.stringify(probs, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

