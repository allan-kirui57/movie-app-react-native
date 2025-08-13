import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login({ name: "John Doe", email });
    router.replace("/(tabs)/profile");
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* Title */}
      <Text className="text-center text-2xl font-bold text-blue-500 mb-8">
        MovieApp
      </Text>

      {/* Welcome */}
      <Text className="text-xl font-semibold mb-2">
        Welcome to MovieApp login now!
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="bg-gray-100 rounded-xl px-4 py-4 mt-4 text-base"
      />

      {/* Password */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4 mt-4">
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          className="flex-1 text-base"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Remember me + Forgot password */}
      <View className="flex-row justify-between items-center mt-3">
        <TouchableOpacity>
          <Text className="text-gray-500">Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-blue-500">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 rounded-full py-4 mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      {/* Or sign in with */}
      <Text className="text-center text-gray-500 mt-6">Or Sign in with</Text>

      {/* Social buttons */}
      <View className="flex-row justify-center gap-4 mt-4">
        <TouchableOpacity className="bg-gray-100 p-4 rounded-xl">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 p-4 rounded-xl">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 p-4 rounded-xl">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
