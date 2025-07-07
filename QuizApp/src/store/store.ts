import { create } from "zustand";

interface List {
    name: string;
    emoji: string;
}

interface StoreState {
    lists: List[];
    handleUpdateEmoji: (index: number, emoji: string) => void;
}

export const useEmojiStore = create<StoreState>((set) => ({
    lists: [
        { name: "Compras", emoji: "🛒" },
        { name: "Trabajo", emoji: "💼" },
        { name: "Estudio", emoji: "📚" },
    ],
    handleUpdateEmoji: (index, emoji) =>
        set((state) => {
            const updateList = [...state.lists]
            updateList[index].emoji = emoji

            return {
                lists: updateList
            }
        })
}))