import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    login({ name: "John Doe", email });
    router.replace("/(tabs)/profile"); // go back to profile after login
  };

  return (
    <View className="flex-1 justify-center p-6 bg-black">
      <Text className="text-white text-3xl font-bold mb-6">Login</Text>

      <TextInput
        className="bg-gray-800 text-white p-4 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        className="bg-red-500 p-4 rounded-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-center text-lg">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
