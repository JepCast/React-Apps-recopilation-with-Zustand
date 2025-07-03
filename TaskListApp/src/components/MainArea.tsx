import { FaPlus } from "react-icons/fa6";
import { useTaskStore } from "../useStore"

function MainArea() {
    const { lists, workspaces, selectedList, setSelectedList, selectedWorkspace, todoText, setSelectedWorkspace, setTodoText, handleAddTodo } = useTaskStore();

    return (
        <div className="flex-1 p-6">
            <div className="mb-4">
                <input type="text" placeholder="Add a new Todo"
                    className="border border-gray-300 p-2 rounded-lg w-full"
                    value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <div className="mt-2 flex items-center">
                    <select value={selectedList}
                        className="border border-gray-300 p-2 rounded-lg mr-2"
                        onChange={(e) => setSelectedList(e.target.value)}>
                        <option value="" disabled>Select List</option>
                        {lists.map((lists, index) => (
                            <option value={lists.name} key={index}>{lists.emoji}{lists.name}</option>
                        ))}
                    </select>
                    <select value={selectedWorkspace}
                        className="border border-gray-300 p-2 rounded-lg mr-2"
                        onChange={(e) => setSelectedWorkspace(e.target.value)}
                        >
                        <option value="" disabled>Select Workspace</option>
                        {workspaces.map((workspace, index) => (
                            <option value={workspace.name} key={index}>
                                {workspace.emoji}{workspace.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleAddTodo} className="bg-black cursor-pointer items-center text-white px-4 py-2 ml-4 flex rounded-lg ">
                        <FaPlus className="mr-2 hover:rotate-360 duration-[1s]"/>
                        Add Todo
                        </button>
                </div>
            </div>
        </div>
    )
}

export default MainArea