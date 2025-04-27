import { router, useNavigation } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '@/context';

const Topnav = ({name , backto}) => {
    const navigation = useNavigation();
    const { darkMode } = useAppContext();

    return (
        <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity
                onPress={() => router.navigate(backto)}
                className={`${darkMode ? "bg-[#252728]" : "bg-gray-200"} items-center justify-center rounded-lg w-12 h-12`}
            >
                <MaterialIcons size={20} name="arrow-back" color={darkMode ? "white" : "#111"} />
            </TouchableOpacity>
            <Text className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold`}>
                {name}
            </Text>
            <View className="w-12" /> {/* Spacer */}
        </View>
    );
};

export default Topnav;