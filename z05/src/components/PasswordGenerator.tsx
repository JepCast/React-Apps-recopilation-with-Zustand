import { useState } from "react";
import { usePasswordStore } from "../useStore"
import { MdCopyAll } from "react-icons/md";

function PasswordGenerator() {
  const [copied, setCopied] = useState(false);

  const {
    length,
    includeNumbers,
    includeSymbols,
    includeUppercase,
    includeLowercase,
    generatedPassword,
    setLength,
    toggleNumbers,
    toggleSymbols,
    toggleUppercase,
    toggleLowercase,
    generatePassword,
  } = usePasswordStore();


  const handleGeneratePassword = () => {
    generatePassword();
  }

  const handleCopy = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str);
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000);
    } catch (error) {
      console.error(error)
    }
  }

  console.log(length)
  return (
    <div className="p-8 w-[40rem] mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Password Generator</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="length" className="block text-sm text-gray-700">Password Length</label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={4}
            max={64}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
            focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center mb-2">
            <input className="cursor-pointer" type="checkbox" onChange={toggleNumbers} checked={includeNumbers} />
            <label className="ml-2 text-sm">Include Numbers</label>
          </div>
          <div className="flex items-center mb-2">
            <input className="cursor-pointer" type="checkbox" onChange={toggleSymbols} checked={includeSymbols} />
            <label className="ml-2 text-sm">Include Symbols</label>
          </div>
          <div className="flex items-center mb-2">
            <input className="cursor-pointer" type="checkbox" onChange={toggleLowercase} checked={includeLowercase} />
            <label className="ml-2 text-sm">Include Lowercase</label>
          </div>
          <div className="flex items-center mb-2">
            <input className="cursor-pointer" type="checkbox" onChange={toggleUppercase} checked={includeUppercase} />
            <label className="ml-2 text-sm">Include Uppercase</label>
          </div>
        </div>

        <button
          className="mt-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleGeneratePassword}>
          Generate Password
        </button>
        {generatedPassword && (
          <div className="flex flex-col justify-center items-center">
          <div className="mt-4 p-4 flex justify-between bg-gray-100 rounded-lg w-[100%]">
            <p className="text-lg break-all">{generatedPassword}</p>
              <button className="cursor-pointer" onClick={() => handleCopy(generatedPassword)}>
                <MdCopyAll className="text-2xl" />
              </button>
          </div>
          {copied && (
            <span className="mt-5 text-sm text-red-500 font-bold">¡Copied!</span>
          )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordGenerator