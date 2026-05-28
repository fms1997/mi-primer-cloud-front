import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const cargarTareas = async () => {
    const res = await axios.get(`${API_URL}/tareas`);
    setTareas(res.data);
  };

  const crearTarea = async () => {
    if (!titulo.trim()) return;

    await axios.post(`${API_URL}/tareas`, {
      titulo,
      completada: false,
    });

    setTitulo("");
    cargarTareas();
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Mi app fullstack cloud</h1>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nueva tarea."
      />

      <button onClick={crearTarea}>Guardar</button>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;