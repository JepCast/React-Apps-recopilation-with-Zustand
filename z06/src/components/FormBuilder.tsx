import { useState, type ChangeEvent } from "react";
import { useFormStore } from "../useStore"
import FormField from "./FormFIeld";

interface NewField {
    label: string;
    type: 'text' | 'number' | 'password' | 'textarea' | 'date' | 'file';
    value: string;
}



function FormBuilder() {
    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewField((prev) => ({ ...prev, [name]: value }))
    }
    const handleChange = () => {

    }
    const handleAddField = () => {
        addField(newField)
        setNewField({
            label: '',
            type: 'text',
            value: ''
        })
    }
    const handleFieldUpdate = (index: number, updatedFiled: NewField) => {
        updateFiled(index, updatedFiled)
    }
    const handleFieldRemove = (index: number) => {
        removeField(index)
    }

    const { formFields, addField, removeField, resetForm, updateFiled } = useFormStore();
    const [newField, setNewField] = useState<NewField>({
        label: '',
        type: 'text',
        value: ''
    })
    return (
        <div className="m-2 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Form Builder</h1>
            <div className="flex flex-col mb-6">
                <input
                    className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    type="text" name="label" placeholder="Field Label" value={newField.label}
                    onChange={handleFieldChange}
                />
                <select name="type" value={newField.type} className="mb-4 cursor-pointer"
                    onChange={handleChange}
                >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="textarea">Textarea</option>
                    <option value="date">Date</option>
                    <option value="field">Field</option>
                </select>

                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        type="button"
                        onClick={handleAddField}
                    >Add Field</button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
                        type="button"
                        onClick={resetForm}
                    >Reset Form</button>
                </div>
            </div>
            <form>
                {formFields.map((field, index) => (
                    <FormField
                        key={index}
                        index={index}
                        field={field}
                        onUpdate={handleFieldUpdate}
                        onRemove={handleFieldRemove}
                    />
                ))}
            </form>
        </div >
    )
}

export default FormBuilder