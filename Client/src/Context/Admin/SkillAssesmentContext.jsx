import React,{ createContext,useReducer,useContext} from 'react'
const skillAssesmentContext = createContext()
const initialState = {
      loading:false,
      assesments:[]
  };
const authReducer = (state, action) => {
    switch (action.type) {
      case 'ASSESSMENT_LODNING':
        return {
          loading:true,
          assesments:[]
        };
      case 'GET_ASSESSMENT':
        return {
          loading:false,
          assesments:action.payload
        };
      default:
        return state;
    }
  };
const SkillAssesmentContext = ({children}) => {
    const [assesments,dispatch] = useReducer(authReducer,initialState)
  return (
     <skillAssesmentContext.Provider value={{ assesments, dispatch }}>
      {children}
     </skillAssesmentContext.Provider>
  )
}
export const useSkillAssesmentContext = () => useContext(skillAssesmentContext)
export default SkillAssesmentContext
