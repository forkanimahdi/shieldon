import { useAppContext } from '@/context';
import React from 'react';
import { Text, View } from 'react-native';

const Footer = () => {
    const { darkMode } = useAppContext();

    return (

        <View className={`${darkMode ? "bg-[#1c1c1e]" : "bg-white"} absolute bottom-0 py-2 w-screen items-center`}>
            <Text className="text-xs text-gray-400">
                🛡️ ShieldOn powered by <Text className="font-semibold">Forkani Studio</Text>
            </Text>
        </View>
    );
};

export default Footer;