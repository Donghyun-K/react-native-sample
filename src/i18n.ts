import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            hello: 'Hello',
            welcome: 'Welcome!',
            language_screen_title: 'Language Settings',
            current_language: 'Current Language',
        },
    },
    ko: {
        translation: {
            hello: '안녕하세요',
            welcome: '환영합니다!',
            language_screen_title: '언어 설정',
            current_language: '현재 언어',
        },
    },
    jp: {
        translation: {
            hello: 'こんにちは',
            welcome: 'ようこそ！',
            language_screen_title: '言語設定',
            current_language: '現在の言語',
        },
    },
};

i18n.use(initReactI18next).init({
    // compatibilityJSON: 'v3',
    resources,
    lng: 'ko', // 초기 언어
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
