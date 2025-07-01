import { create } from 'zustand'

type CounterStore = {
    count: number;
    increment: () => void;
    decrement: () => void;
    resetCounter: () => void;
}

export const useCounter = create<CounterStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({count: state.count + 1 })),
    decrement: () => set((state) => ({count: state.count - 1 })),
    resetCounter: () => set({count: 0})
}))