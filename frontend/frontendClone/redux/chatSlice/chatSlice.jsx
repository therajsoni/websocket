import {createSlice} from "@redux/toolkit";

const initialState = {
    messages : [],
}

const chatSlice = createSlice({
    name  : 'chat',
    initialState : initialState,
    reducers : {
    addMessage : (state,action) => {
    state.messages.push(action.payload);    
    }    
    }
})


export default chatSlice.reducer;
export const {addMessage} = chatSlice.action;
