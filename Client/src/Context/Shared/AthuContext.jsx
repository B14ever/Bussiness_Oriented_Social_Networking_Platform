import React,{ createContext,useReducer,useContext} from 'react'
const authuContext = createContext()
const initialState = {
    token: localStorage.getItem('TOKEN'),
    user: JSON.parse(localStorage.getItem('USER_DATA'))
  };
const authReducer = (state, action) => {
    switch (action.type) {
      case 'AUTHENTICATE':
        return {
          token: action.payload.token,
          user:action.payload.user
        };
      case 'LOGOUT':
        return {
          token: null,
          user:null
        };
      default:
        return state;
    }
  };
const AthuContext = ({children}) => {
    const [user,dispatch] = useReducer(authReducer,initialState)
  return (
     <authuContext.Provider value={{ user, dispatch }}>
      {children}
     </authuContext.Provider>
  )
}
export const useAthuContext = () => useContext(authuContext)
export default AthuContext
