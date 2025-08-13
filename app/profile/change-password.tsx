import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ChangePassword = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    // TODO: Add validation & API call here
    console.log('Password updated', form);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      {/* <View className="flex-row items-center mt-10 px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-bold">Change Password</Text>
      </View> */}

      {/* Form */}
      <View className="mt-6 px-5">
        <FormInput
          label="Current Password"
          secureTextEntry
          value={form.currentPassword}
          onChangeText={(v) => handleChange('currentPassword', v)}
        />
        <FormInput
          label="New Password"
          secureTextEntry
          value={form.newPassword}
          onChangeText={(v) => handleChange('newPassword', v)}
        />
        <FormInput
          label="Confirm New Password"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(v) => handleChange('confirmPassword', v)}
        />

        <TouchableOpacity
          onPress={handleSave}
          className="mt-6 bg-blue-600 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-medium">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const FormInput = ({ label, value, onChangeText, secureTextEntry }: any) => (
  <View className="mb-4">
    <Text className="text-gray-600 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      className="border border-gray-300 rounded-lg px-4 py-2"
    />
  </View>
);

export default ChangePassword;
