import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Platform,

} from "react-native";
import { useCameraPermissions } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppContext } from "@/context";
import CameraComponent from "@/components/camera";
import { GenerateTOTP } from "@/components/generateTOTP";

import * as Clipboard from 'expo-clipboard';
import { Circle, Svg } from "react-native-svg";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [codes, setCodes] = useState([]);
  const [remaining, setRemaining] = useState(30);
  const { darkMode, urls } = useAppContext();

  const toggleCamera = () => {
    if (!permission.granted) {
      requestPermission();
    } else {
      setHasPermission(true);
    }
  };

  const updateCodes = () => {
    const newCodes = urls.map((entry) => ({
      ...entry,
      otp: GenerateTOTP(entry.secret),
    }));
    setCodes(newCodes);
  };

  const copyToClipboard = async (text) => {
    // console.log("h");

    await Clipboard.setStringAsync(text);
    if (Platform.OS === "android") {
      ToastAndroid.show("Code copied to clipboard", ToastAndroid.SHORT);
    } else {
      // Optionally add a fallback for iOS
      alert("Code copied to clipboard");
    }
  };

  useEffect(() => {
    updateCodes();

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          updateCodes();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [urls]);

  const getCircleColor = () => {
    if (remaining <= 5) return "#FF4C4C"; // red
    if (remaining <= 10) return "#FFA500"; // orange
    return "#4CAF50"; // green
  };

  const radius = 12;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = (remaining / 30) * circumference;

  if (hasPermission) {
    return <CameraComponent setHasPermission={setHasPermission} />;
  }

  const toggleDelete = (i) => {
    console.log(i);

  }


  return (
    <View className={`flex-1 px-4 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"}`}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className={`${darkMode ? "bg-[#252728]" : "bg-gray-200"} items-center justify-center rounded-lg w-12 h-12`}>
          <MaterialIcons size={20} name="settings" color={darkMode ? "white" : "#111"} />
        </View>
        <Text className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold`}>Good Morning</Text>
        <TouchableOpacity
          onPress={toggleCamera}
          className={`${darkMode ? "bg-[#252728]" : "bg-gray-200"} items-center justify-center rounded-lg w-12 h-12`}
        >
          <MaterialIcons size={20} name="add" color={darkMode ? "white" : "#111"} />
        </TouchableOpacity>
      </View>



      {/* OTP List */}
      <FlatList
        data={codes}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={({ item }) => (
          <View className={`${darkMode ? "bg-[#1c1c1e]" : "bg-white"} mb-4 p-5 rounded-2xl shadow mt-2`}>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-500 text-base">
                <Text className={`${darkMode ? "text-white" : "text-black"} font-medium`}>
                  {item.issuer}
                </Text>{" "}
                ({item.label.split(":")[1]})
              </Text>

              {/* Circular shield timer */}
              <Svg height={30} width={30}>
                <Circle
                  stroke={darkMode ? "#fff" : "#333"}
                  fill="none"
                  cx={15}
                  cy={15}
                  r={radius}
                  strokeWidth={strokeWidth}
                  opacity={0.2}
                />
                <Circle
                  stroke={getCircleColor()}
                  fill="none"
                  cx={15}
                  cy={15}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="15,15"
                />
              </Svg>
            </View>

            {/* OTP and clipboard */}
            <View className="mt-4 flex-row justify-between items-center">
              <Text className={`${darkMode ? "text-white" : "text-black"} text-2xl tracking-widest`}>
                {item.otp}
              </Text>
              <TouchableOpacity onPress={() => copyToClipboard(item.otp)}>
                <MaterialIcons name="content-copy" size={22} color={darkMode ? "#fff" : "#222"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
