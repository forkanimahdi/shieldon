import React from "react";
import { View, Text, TouchableOpacity, Switch, useColorScheme } from "react-native";
import { router, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppContext } from "@/context";
import Topnav from "@/components/topnav";
import Constants from 'expo-constants';


export default function SettingsScreen() {
  const navigation = useNavigation();
  const { darkMode, setDarkMode } = useAppContext();

  const options = [
    { label: "Manage OTP Accounts", icon: "security", screen: "manage-accounts" },
    // { label: "Backup & Restore", icon: "backup", screen: "backup" },
    { label: "Security Settings", icon: "lock", screen: "security" },
    { label: "Notification Preferences", icon: "notifications", screen: "notifications" },
    { label: "About Application", icon: "info", screen: "about" },
    { label: "Help & Support", icon: "help-outline", screen: "support" },
    { label: "Rate the App", icon: "star-rate", screen: "rate" },
  ];

  return (
    <View className={`flex-1 px-4 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>

      <Topnav name={"Settings"} />
      {/* Settings Options */}
      <View className="mt-10">
        {/* Dark Mode Toggle */}
        <View
          className={`flex-row justify-between items-center px-5 py-4 rounded-2xl ${darkMode ? "bg-[#1c1c1e]" : "bg-white"}`}
        >
          <Text className={`${darkMode ? "text-white" : "text-black"} text-base`}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={useColorScheme} />
        </View>

        {/* Spacer before other options */}
        <View className="mt-4 space-y-5">
          {options?.map((opt, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(opt.screen)}
              className={`flex-row items-center p-5 mt-3 rounded-2xl ${darkMode ? "bg-[#1c1c1e]" : "bg-white"}`}
            >
              <MaterialIcons name={opt.icon} size={22} color={darkMode ? "white" : "#222"} />
              <Text className={`${darkMode ? "text-white" : "text-black"} ml-4 text-base`}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="absolute bottom-0 items-center w-screen py-2">
          <Text className={`${darkMode ? "text-white/50" : "text-black"}  text-base`}>Shieldon ( v {Constants.expoConfig.version} )</Text>
      </View>
    </View>
  );
}
