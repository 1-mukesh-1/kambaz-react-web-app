import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";

const initialState = {
    modules: modules,
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, action) => {
            state.modules = [action.payload, ...state.modules];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module._id !== action.payload
            );
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map((module) =>
                module._id === action.payload._id ? action.payload : module
            );
        },
        editModule: (state, action) => {
            state.modules = state.modules.map((module) =>
                module._id === action.payload ? { ...module, editing: true } : module
            );
        },
    },
});

export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;