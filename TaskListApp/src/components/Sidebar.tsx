import { FaPlus } from "react-icons/fa6";
import { useTaskStore } from "../useStore"
import Modal from "./Modal";

function Sidebar() {
  const { lists, workspaces, openListModal, openWorkspaceModal } = useTaskStore();
  return (
    <div className="w-60 bg-[#F9F9F9] flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-semibold flex items-center">Lists</h3>

        {/* Render Lists */}

        <ul>
          {lists.map((list, index)=> (
            <li key={index} className="p-2 hover:bg-[#ccc] cursor-pointer flex items-center rounded-lg">
              <span className="mr-2">{list.emoji}</span>
              {list.name}
              </li>
          ))}
        </ul>
          <button onClick={openListModal} className="cursor-pointer flex justify-center items-center mt-[1rem]">
            <FaPlus className="mr-2" />List
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold flex items-center ">Workspaces</h3>

          {/* Render Workspaces */}
          {workspaces.map((workspaces, index) => (
            <li key={index}  className="p-2 hover:bg-[#ccc] cursor-pointer flex items-center rounded-lg">
              <span className="mr-2">{workspaces.emoji}</span>
              {workspaces.name}
            </li>
          ))}

    <button onClick={openWorkspaceModal} className="cursor-pointer flex justify-center items-center mt-[1rem]">
      <FaPlus className="mr-2" />Workspaces
    </button>

        </div>
      </div>
      <Modal/>
    </div>
  )
}

export default Sidebar