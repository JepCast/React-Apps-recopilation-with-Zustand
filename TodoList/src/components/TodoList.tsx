import { useState } from 'react';
import { useTodoStore } from '../useStore';

function TodoList() {
  const { addTodo, removeTodo, todos, toggleTodo } = useTodoStore();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;

    addTodo({
      id: Date.now() * 200,
      text: inputValue,
      completed: false
    })
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') handleAddTodo();
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">To-Do List</h1>

        <div className="flex items-center mt-4  mb-4">
          <input
            placeholder='Add a new To-do'
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-grow px-4 py-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button
            className="bg-blue-500 text-white cursor-pointer px-4 py-2.5 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddTodo}
          >Add</button>
        </div>
        <ul className='space-y-3'>
          {todos.map(({ id, completed, text }) => (
            <li key={id} className='flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm'>
              <div className='flex items-center'>
                <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)}
                  className='mr-2 h-5 w-5 text-blue-600'
                />
                <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{text}</span>
              </div>
              <button onClick={() => removeTodo(id)}
                className="text-red-500 hover:text-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
              >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList