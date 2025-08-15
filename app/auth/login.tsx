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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    let valid = true;
    let newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const result = await login(email, password);
    console.log("Login result:", result);
    if (result.success) {
      router.push({
        pathname: "/auth/verify-code",
        params: { user_id: result.user_id },
      });
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-center text-2xl font-bold text-blue-500 mb-8">
        MovieApp
      </Text>

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
      {errors.email && <Text className="text-red-500 mt-1">{errors.email}</Text>}

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
      {errors.password && <Text className="text-red-500 mt-1">{errors.password}</Text>}

      {/* Login button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 rounded-full py-4 mt-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      {/* Links */}
      <View className="flex-row justify-between items-center mt-4">
        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text className="text-blue-500">Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
          <Text className="text-blue-500">Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
