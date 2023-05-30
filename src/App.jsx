import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoArray = [
  {
    titulo: "Titulo 1",
    descripcion: "Descripcion 1",
    isComplete: false,
    id: 1
  },
  {
    titulo: "Titulo 2",
    descripcion: "Descripcion 2",
    isComplete: true,
    id: 2
  }
];

const TodoList = () => {
  const [todos, setTodos] = useState(todoArray);
  const [newTodo, setNewTodo] = useState({ titulo: '', descripcion: '', isComplete: false, id: 0 });

  const CambioInput = (event) => {
    const { name, value } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const AñadirTodo = (event) => {
    event.preventDefault();
    if (newTodo.titulo.trim() !== '' && newTodo.descripcion.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo({ titulo: '', descripcion: '', isComplete: false, id: 0 });
    }
  };

  const BorrarTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const EditarTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...updatedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const MarcaCompletado = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const BorrarCompletado = () => {
    const updatedTodos = todos.filter(todo => !todo.isComplete);
    setTodos(updatedTodos);
  };

  return (
    <div className='Container m-75'>
      <form onSubmit={AñadirTodo}>
        <input type="text" name='titulo' placeholder='Titulo' value={newTodo.titulo} onChange={CambioInput} />
        <input type="text" name='descripcion' placeholder='Descripcion' value={newTodo.descripcion} onChange={CambioInput} />
        <input type="submit" value='Añadir' />
      </form>

      <div className='container m-100'>
        <div>
          <h5>TodoList</h5>
          <button onClick={BorrarCompletado}>Eliminar tareas completadas</button>
        </div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.isComplete} onChange={() => MarcaCompletado(todo.id)} />
            <p>
              {todo.titulo}<br />
              <span>{todo.descripcion}</span>
            </p>
            {todo.isComplete && <span>Completada</span>}
            <button onClick={() => EditarTodo(todo.id, { titulo: prompt('Actualizar titulo:', todo.titulo), descripcion: prompt('Actualizar descripcion:', todo.descripcion) })}>
              Editar
            </button>
            <button onClick={() => BorrarTodo(todo.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;