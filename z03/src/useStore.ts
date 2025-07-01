import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
interface Expense {
    id: number;
    description: string;
    amount: number;
}

interface ExpenseStore {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    removeExpense: (id: number) => void
}
export const useStore = create<ExpenseStore>()(
    persist(
        (set) => ({
            expenses: [],
            addExpense: (expense) =>
                set((state) => ({
                    expenses: [...state.expenses, expense],
                })),
            removeExpense: (id) =>
                set((state) => ({
                    expenses: state.expenses.filter((expense) => expense.id !== id),
                })),
        }),
        {
            name: 'expense-storage', // clave de localStorage
            
            //Storage, propiedad que espera zustand cuando usamos persist para que sepa donde ira guardado el estado.
            //createJSONStorage(...) es la función que nos da un objeto storage con los métodos getItem y setItem, etc, adaptado para trabajar con objetos en lugar de strinsg.
            //() => localeStorage Es una función que le pasa el objeto localStorage a createJSONStorage, verificando de una vez si este no existe no se pasa.
            storage: createJSONStorage(() => localStorage)
        }
    )
)
