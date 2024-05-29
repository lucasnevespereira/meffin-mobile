import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import fr from './locales/fr.json';


const deviceLanguageCode = Localization.getLocales()[0].languageCode as string;

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        lng: deviceLanguageCode,
        resources: {
            en: {
                translation: en,
            },
            fr: {
                translation: fr,
            },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
