import { TaskInfo } from "@/components/task-board/GqlType";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Tasks {
  draggedTask: TaskInfo | null;
  taskKeywork: string;
}

interface Actions {
  setDraggedTask: (dragTask: TaskInfo | null) => void;
  setTaskKeyword: (keyword: string) => void;
}

// persist store
export const useGeneralStore = create<Tasks & Actions>()(
  devtools((set) => ({
    draggedTask: null,
    taskKeywork: "",
    setTaskKeyword: (keyword: string) => set((_) => ({ taskKeywork: keyword })),
    setDraggedTask: (dragTask) => set((_) => ({ draggedTask: dragTask })),
  })),
);
