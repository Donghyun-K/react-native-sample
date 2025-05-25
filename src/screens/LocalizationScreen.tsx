import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LocalizationScreen = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('language_screen_title')}</Text>
            <Text style={styles.current}>
                {t('current_language')}: {i18n.language}
            </Text>

            <View style={styles.buttonGroup}>
                <Button title="🇰🇷 한국어" onPress={() => changeLanguage('ko')} />
                <View style={styles.spacer} />
                <Button title="🇺🇸 English" onPress={() => changeLanguage('en')} />
                <View style={styles.spacer} />
                <Button title="🇯🇵 日本語" onPress={() => changeLanguage('jp')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start', // 상단으로 정렬
        alignItems: 'center',
        paddingTop: 50, // 상단 여백 추가
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    current: {
        fontSize: 16,
        marginBottom: 30,
    },
    buttonGroup: {
        width: '100%',
        alignItems: 'center',
    },
    spacer: {
        height: 10,
    },
});

export default LocalizationScreen;
