import {createContext, useContext} from 'react'
import i18n from 'i18next';
import {useTranslation } from 'react-i18next';
export const Language = createContext()
function LanguageContext({children}) {
    const {t} = useTranslation()
  return (
       <Language.Provider value={{t,i18n}}>
        {children}
       </Language.Provider>
  )
}
export const useLanguage = () => useContext(Language)
export default LanguageContext
