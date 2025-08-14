import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        setError("");
        // API call here
        console.log("Sending reset link to:", email);
        alert("If the email is registered, a reset link has been sent.");
        router.back();
    };

    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="text-2xl font-bold text-blue-500 mb-8">Forgot Password</Text>

            <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className="bg-gray-100 rounded-xl px-4 py-4"
            />
            {error && <Text className="text-red-500 mt-1">{error}</Text>}

            <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 rounded-full py-4 mt-6">
                <Text className="text-white text-center text-lg font-semibold">Send Reset Link</Text>
            </TouchableOpacity>
        </View>
    );
}
