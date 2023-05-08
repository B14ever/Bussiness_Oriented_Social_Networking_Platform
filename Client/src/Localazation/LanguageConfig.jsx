import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { TranslationEn,TranslationAm } from './Languages'

i18n 
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'en',
  resources:{
       en:{translation: TranslationEn},
       am:{translation:TranslationAm}
    }
}
)
export default i18n