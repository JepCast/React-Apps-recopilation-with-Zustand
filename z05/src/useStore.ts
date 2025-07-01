import { create } from "zustand";

type PasswordState = {
    length: number;
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeUppercase: boolean;
    includeLowercase: boolean;
    generatedPassword: string;
    toggleNumbers: () => void;
    toggleSymbols: () => void;
    toggleUppercase: () => void;
    toggleLowercase: () => void;
    generatePassword: () => void;
    setLength: (length: number) => void;
};

export const usePasswordStore = create<PasswordState>((set) => ({
    length: 12,
    includeNumbers: false,
    includeLowercase: false,
    includeUppercase: true,
    includeSymbols: true,
    generatedPassword: "",

    setLength: (length) => set({ length }),
    toggleNumbers: () => set((state) => ({ includeNumbers: !state.includeNumbers })),
    toggleSymbols: () => set((state) => ({ includeSymbols: !state.includeSymbols })),
    toggleUppercase: () => set((state) => ({ includeUppercase: !state.includeUppercase })),
    toggleLowercase: () => set((state) => ({ includeLowercase: !state.includeLowercase })),

    generatePassword: () => set((state) => {
        const numbers = '0123456789';
        const symbols = '~!@#$%^&*()_-+={[}]|:;"<,>.?/';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';

        let characters = ''

        // += operator es un shorthan para agregación y asignación
        /*
            let message = "Hello, ";
            message += "world!";
            console.log(message); 'Hello world';
        */

        //If the user selects an option an it is (true), the corresponding character set like
        //numbers, symbols, ect will be added (+=) to the characters string.
        if (state.includeNumbers) characters += numbers
        if (state.includeSymbols) characters += symbols
        if (state.includeLowercase) characters += lowercase
        if (state.includeUppercase) characters += uppercase

        let password = ''

        for (let i = 0; i < state.length; i++) {
            //I'll give us a random character each time
            password += characters[Math.floor(Math.random() * characters.length)]
        }

        return { generatedPassword: password }
    })

}))
