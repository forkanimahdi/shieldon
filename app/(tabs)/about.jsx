import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useAppContext } from "@/context";
import Constants from 'expo-constants';
import Topnav from '@/components/topnav';

export default function AboutScreen() {
    const { darkMode } = useAppContext();

    const handleContactPress = () => {
        Linking.openURL("forkanimahdi@gmail.com"); // Replace with your actual email
    };

    return (
        <View className={`flex-1 px-6 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
            <Topnav  backto={"/settings"}   name={"About"} />

            <ScrollView className={`flex-1   ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
                <Text className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                    About This App
                </Text>

                <Text className={`text-base mb-6 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Welcome to <Text className="font-semibold">Shieldon</Text>, your trusted companion for securely managing Time-based One-Time Passwords (TOTP). Easily generate, store, and access OTPs for all your accounts—making your 2FA process both safe and seamless.

                    Your secrets are stored locally on your device and never leave it, ensuring maximum privacy and security. Shieldon supports all major TOTP-compatible platforms, including Google, Facebook, and more.

                    Enjoy a smooth experience with a clean, intuitive interface and real-time code updates.
                </Text>

                <Text className={`text-base mb-4 font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                    Features
                </Text>

                <View className="mb-6 gap-y-4">
                    <Text className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>• Secure local storage of OTP secrets</Text>
                    <Text className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>• Instant OTP generation and display</Text>
                    <Text className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>• Real-time countdown for OTP expiration</Text>
                    <Text className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>• Minimalist and intuitive interface</Text>
                    <Text className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>• Light & Dark mode support</Text>
                </View>


                <View className="mb-6 flex-row items-center justify-between py-3">
                    <View>
                        <Text className={`text-base font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                            Version
                        </Text>
                        <Text className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {Constants.expoConfig.version}
                        </Text>
                    </View>
                    <View className="">
                        <Text className={`text-base font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                            Developed By
                        </Text>
                        <Text className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Mehdi Forkani
                        </Text>
                    </View>
                </View>


                <TouchableOpacity
                    onPress={handleContactPress}
                    className={`rounded-xl px-5 py-3 ${darkMode ? "bg-[#252728]" : "bg-[#e4e4e4]"}`}
                    style={{ opacity: 0.9 }}
                >
                    <Text className={`text-center font-medium ${darkMode ? "text-white" : "text-black"}`}>
                        Contact Support
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
