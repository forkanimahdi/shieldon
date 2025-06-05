import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    ToastAndroid,
    Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppContext } from "@/context";
import * as Clipboard from 'expo-clipboard';
import Footer from "@/components/footer";
import Topnav from "@/components/topnav";

export default function DetailScreen() {
    const { darkMode } = useAppContext();
    const route = useRoute();
    const navigation = useNavigation();
    const { item } = route.params;
    const [showSecret, setShowSecret] = useState(false);

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
        if (Platform.OS === "android") {
            ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
        } else {
            Alert.alert("Copied", "Copied to clipboard");
        }
    };

    return (
        <View className={`flex-1 px-4 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
            {/* Header */}

            <Topnav backto={"/"} name={"OTP Details"} />

            {/* Info Box */}
            <View className={`${darkMode ? "bg-[#1c1c1e]" : "bg-white"} p-5 rounded-2xl shadow mt-10`}>
                <Text className={`${darkMode ? "text-white" : "text-black"} text-base mb-2 font-semibold`}>
                    Issuer:
                </Text>
                <Text className="text-gray-500 mb-4">{item.issuer}</Text>

                <Text className={`${darkMode ? "text-white" : "text-black"} text-base mb-2 font-semibold`}>
                    Label:
                </Text>
                <Text className="text-gray-500 mb-4">{item.label}</Text>

                <Text className={`${darkMode ? "text-white" : "text-black"} text-base mb-2 font-semibold`}>
                    Secret Key:
                </Text>
                <View className="flex-row items-center border rounded px-3 py-2 mb-4 border-gray-300">
                    <TextInput
                        secureTextEntry={!showSecret}
                        editable={false}
                        value={item.secret}
                        style={{ flex: 1, color: darkMode ? "#fff" : "#111" }}
                    />
                    <TouchableOpacity onPress={() => setShowSecret(!showSecret)}>
                        <MaterialIcons
                            name={showSecret ? "visibility-off" : "visibility"}
                            size={22}
                            color={darkMode ? "#aaa" : "#555"}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => copyToClipboard(item.secret)}
                    className={`${darkMode ? "bg-[#252728]" : "bg-gray-200"} flex-row justify-center items-center py-2 rounded-lg`}
                >
                    <MaterialIcons name="content-copy" size={18} color={darkMode ? "#fff" : "#000"} />
                    <Text className={`ml-2 ${darkMode ? "text-white" : "text-black"} font-medium`}>
                        Copy Secret
                    </Text>
                </TouchableOpacity>
            </View>

            <Footer />
        </View>
    );
}
