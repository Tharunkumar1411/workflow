import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFlowStore = create(
  persist(
    (set) => ({
      flows: {},
      setFlow: (name, data) =>
        set((state) => ({
          flows: {
            ...state.flows,
            [name]: data,
          },
        })),

        getFlow: (id) => {
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