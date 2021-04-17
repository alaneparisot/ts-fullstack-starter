import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  ns: ['translations'],
  defaultNS: 'translations',

  resources: { en: { translations: {} } },
})

export default i18n
