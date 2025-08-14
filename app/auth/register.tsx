import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        birthdate: "",
        phone_number: "",
    });
    const [errors, setErrors] = useState<any>({});

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const validate = () => {
        let valid = true;
        let newErrors: any = {};

        if (!form.name.trim()) { newErrors.name = "Name is required"; valid = false; }
        if (!form.email.trim()) { newErrors.email = "Email is required"; valid = false; }
        if (!form.password.trim()) { newErrors.password = "Password is required"; valid = false; }
        if (!form.confirm_password.trim()) { newErrors.confirm_password = "Confirm password is required"; valid = false; }
        if (form.password && form.confirm_password && form.password !== form.confirm_password) {
            newErrors.confirm_password = "Passwords do not match"; valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        // API call here
        console.log("Registering:", form);
        router.replace("/auth/login");
    };

    return (
        <ScrollView className="flex-1 bg-white px-6 pt-16">
            <Text className="text-2xl font-bold text-blue-500 mb-8">Create Account</Text>

            <FormInput label="Name" value={form.name} onChangeText={(v) => handleChange("name", v)} error={errors.name} />
            <FormInput label="Email" value={form.email} onChangeText={(v) => handleChange("email", v)} error={errors.email} keyboardType="email-address" />
            <FormInput label="Password" value={form.password} onChangeText={(v) => handleChange("password", v)} error={errors.password} secureTextEntry />
            <FormInput label="Confirm Password" value={form.confirm_password} onChangeText={(v) => handleChange("confirm_password", v)} error={errors.confirm_password} secureTextEntry />
            <FormInput label="Birthdate" value={form.birthdate} onChangeText={(v) => handleChange("birthdate", v)} />
            <FormInput label="Phone Number" value={form.phone_number} onChangeText={(v) => handleChange("phone_number", v)} keyboardType="phone-pad" />

            <TouchableOpacity onPress={handleRegister} className="bg-blue-500 rounded-full py-4 mt-6">
                <Text className="text-white text-center text-lg font-semibold">Register</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const FormInput = ({ label, error, ...props }: any) => (
    <View className="mb-4">
        <Text className="text-gray-600 mb-1">{label}</Text>
        <TextInput {...props} className="bg-gray-100 rounded-xl px-4 py-3" />
        {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
);
