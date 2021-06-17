import React,{useReducer,createContext, Children} from 'react';

//Reducer
const firebaseReducer = (state,action) => {
    switch(action.type) {
        case "LOGGED_IN_USER":
            return {...state,user:action.payload};
        default:
            return state;
    }
}

//State
const initialState = {
    user:null
}

//create Context
const AuthContext = createContext();

//context provider
const AuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(firebaseReducer,initialState);
    const value = {state,dispatch}

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

//Export

export {AuthContext,AuthProvider}