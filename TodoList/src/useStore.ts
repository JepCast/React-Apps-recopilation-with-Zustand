import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoStore {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (ide: number) => void;
}

export const useTodoStore = create<TodoStore>()(
    persist((set) => ({
        todos: [],
        addTodo: (todo) => set((state) =>
            ({ todos: [...state.todos, todo] })),
        removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
        toggleTodo: (id) =>
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            })),
    }), {
        name: 'todolist-storage',
        storage: createJSONStorage(() => localStorage)
    })
)