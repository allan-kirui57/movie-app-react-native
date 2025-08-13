import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function VerifyCodeScreen() {
    const router = useRouter();
    const { email, user_id } = useLocalSearchParams<{ email: string, user_id: string }>();
    const { verifyOtp } = useAuth();

    const [otp, setOtp] = useState("");

    const handleVerify = async () => {
        const success = await verifyOtp(user_id, otp);
        if (success) {
            router.replace("/(tabs)/profile");
        } else {
            alert("Invalid OTP code. Please try again.");
        }
    };

    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="text-xl font-semibold mb-2">Verify Your OTP Code</Text>
            <Text className="text-gray-500 mb-4">
                We sent an OTP to <span className="text-primary font-bold">{email}</span>. Please enter it below.
            </Text>

            <TextInput
                placeholder="Enter verification code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                className="bg-gray-100 rounded-xl px-4 py-4 text-base"
            />

            <TouchableOpacity
                onPress={handleVerify}
                className="bg-blue-500 rounded-full py-4 mt-6"
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Verify
                </Text>
            </TouchableOpacity>
        </View>
    );
}
