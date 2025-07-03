import { FaTimes } from "react-icons/fa";
import { useTaskStore } from "../useStore"

function Modal() {
    const { isListModalOpen,isWorkspaceModalOpen, modalName, modalEmoji, modalType, setModalEmoji, setModalName, handleSaveModal, closeWorkspaceModal, closeListModal } = useTaskStore();

    const handleSave = () => {
        handleSaveModal();
    }
    const handleClose = () => {
        if (modalType === 'List'){
            closeListModal();
        } else if (modalType === 'Workspace'){
            closeWorkspaceModal();
        }
    }

    if(!isListModalOpen && !isWorkspaceModalOpen ) return null

    return (
        <div className="fixed z-50 bg-gray-900/50 inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{`Create New ${modalType}`}</h2>
                    <button onClick={handleClose} className="cursor-pointer text-gray-600 hover:text-gray-900">
                        <FaTimes />
                    </button>
                </div>
                <input type="text" value={modalName} onChange={(e) => setModalName(e.target.value)}
                    placeholder={`Enter ${modalType} name`}
                    className="border border-gray-300 p-2 rounded-lg w-full mb-4"
                />
                <input type="text" value={modalEmoji} onChange={(e) => setModalEmoji(e.target.value)}
                    placeholder="Enter Emoji (optional)"
                    className="border border-gray-300 p-2 rounded-lg w-full mb-4"
                />
                <button onClick={handleSave} className="cursor-pointer px-4 py-2 rounded-lg bg-black text-white ">Save</button>
            </div>
        </div>
    )
}

export default Modal