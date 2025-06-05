import {
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
} from "react-native";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import Topnav from "@/components/topnav";
import { useAppContext } from "@/context";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem = ({ title, content, darkMode }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View
            className={`mb-4 rounded-xl border px-4 py-4 ${darkMode ? "bg-[#1a1a1d] border-[#333]" : "bg-white border-gray-200"
                }`}
        >
            <TouchableOpacity onPress={toggleExpand} className="flex-row justify-between items-center">
                <Text
                    className={`text-base font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    {title}
                </Text>
                <Text className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {expanded ? "−" : "+"}
                </Text>
            </TouchableOpacity>

            {expanded && (
                <Text
                    className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    {content}
                </Text>
            )}
        </View>
    );
};

export default function HelpSupportScreen() {
    const { colorScheme } = useColorScheme();
    const {darkMode} = useAppContext();

    const data = [
        {
            title: "What is Shieldon?",
            content:
                "Shieldon is a secure OTP manager that helps you generate and store TOTP (Time-based One-Time Passwords) for two-factor authentication, all stored safely on your device.",
        },
        {
            title: "How do I add a new OTP?",
            content:
                "Tap the 'Add One' button on the home screen, then scan a QR code or manually input the secret key provided by your service.",
        },
        {
            title: "Are my OTPs backed up to the cloud?",
            content:
                "No. For maximum security, all OTPs remain only on your device. We do not sync or store any data online.",
        },
        {
            title: "What happens if I lose my device?",
            content:
                "Unfortunately, if you lose your device, your stored OTPs are gone too. We strongly recommend saving backup codes or using multiple devices where supported.",
        },
        {
            title: "How secure is this app?",
            content:
                "We follow best practices and use industry-standard TOTP algorithms. Secrets are stored locally using encrypted device storage.",
        },
        {
            title: "Can I use Shieldon with Google, Discord, etc.?",
            content:
                "Absolutely! Shieldon is compatible with all TOTP-based services like Google, Facebook, Discord, GitHub, and more.",
        },
        {
            title: "Does Shieldon support Dark Mode?",
            content:
                "Yes. Shieldon automatically adapts to your device's light or dark theme for a smooth visual experience.",
        },
        {
            title: "Need more help?",
            content:
                "Reach out to us at forkanimahdi@gmail.com — we're always happy to assist with any issue or question!",
        },
    ];

    return (
        <View
            className={`flex-1 px-6 pt-20 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"
                }`}
        >
            <Topnav backto={"/settings"} name={"Help & Support"} />

            <ScrollView
                className={`flex-1 mt-10 ${darkMode ? "bg-[#0e0e10]" : "bg-[#f9f9f9]"
                    }`}
            >



                {data.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        content={item.content}
                        darkMode={darkMode}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
