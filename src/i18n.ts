import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            hello: 'Hello',
            welcome: 'Welcome!',
            language_screen_title: 'Language Settings',
            current_language: 'Current Language',
            not_allowed_screenshot: 'Screenshots are not allowed on this screen.',
            bt_screenshot: 'Screenshot',
            bt_camera_gallery: 'Camera/Gallery',
            bt_language: 'Language Settings',
            bt_open_camera: 'Open Camera',
            bt_open_gallery: 'Open Gallery',
            bt_board: 'Board',
        },
    },
    ko: {
        translation: {
            hello: '안녕하세요',
            welcome: '환영합니다!',
            language_screen_title: '언어 설정',
            current_language: '현재 언어',
            not_allowed_screenshot: '이 화면에서는 스크린샷을 찍을 수 없습니다.',
            bt_screenshot: '스크린샷',
            bt_camera_gallery: '카메라/갤러리',
            bt_language: '언어 설정',
            bt_open_camera: '카메라 열기',
            bt_open_gallery: '갤러리 열기',
            bt_board: '게시판',
        },
    },
    jp: {
        translation: {
            hello: 'こんにちは',
            welcome: 'ようこそ！',
            language_screen_title: '言語設定',
            current_language: '現在の言語',
            not_allowed_screenshot: 'この画面ではスクリーンショットが許可されていません。',
            bt_screenshot: 'スクリーンショット',
            bt_camera_gallery: 'カメラ/ギャラリー',
            bt_language: '言語設定',
            bt_open_camera: 'カメラを開く',
            bt_open_gallery: 'ギャラリーを開く',
            bt_board: '掲示板',
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
