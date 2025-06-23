import { useState, useEffect } from 'react';

function App() {
  const [tarea, setTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    setListaTareas(tareasGuardadas);
  }, []);

  // Guardar tareas cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(listaTareas));
  }, [listaTareas]);

  // Agregar o editar tarea
  const manejarSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim() === '') return;

    if (modoEdicion) {
      const nuevasTareas = listaTareas.map((t, index) =>
        index === idEditando ? tarea : t
      );
      setListaTareas(nuevasTareas);
      setModoEdicion(false);
      setIdEditando(null);
    } else {
      setListaTareas([...listaTareas, tarea]);
    }

    setTarea('');
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = listaTareas.filter((_, i) => i !== index);
    setListaTareas(nuevasTareas);
  };

  const editarTarea = (index) => {
    setModoEdicion(true);
    setIdEditando(index);
    setTarea(listaTareas[index]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Tareas</h1>

      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Escribe una tarea"
        />
        <button type="submit">{modoEdicion ? 'Guardar' : 'Agregar'}</button>
      </form>

      <ul>
        {listaTareas.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => editarTarea(index)}>Editar</button>
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
