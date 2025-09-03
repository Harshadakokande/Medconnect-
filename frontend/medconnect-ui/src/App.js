import SymptomForm from "./components/SymptomForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">MedConnect++ – Symptom Checker</h1>
        <SymptomForm />
      </div>
    </div>
  );
}

export default App;

