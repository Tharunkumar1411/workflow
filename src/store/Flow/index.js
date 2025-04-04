import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFlowStore = create(
  persist(
    (set) => ({
      flows: {},
      apiModalData: {},
      savedWorkflows: [],
      setApiModalData: (data) => set({ apiModalData: data }),
      setFlow: (id, data) =>
        set((state) => ({
          flows: {
            ...state.flows,
            [id]: data,
          },
        })),

        saveWorkflow: (workflow) =>
          set((state) => ({
            savedWorkflows: [...state.savedWorkflows, workflow],
          })),

        getFlowWithId: (id) => {
            const state = useFlowStore.getState();
            return state.flows[id] || null;
        },
    }),

    {
      name: "flow-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useFlowStore;