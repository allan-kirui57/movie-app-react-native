import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: 'Katrina Jackson',
    gender: 'Female',
    birthdate: '07/21/1997',
    phone: '+1 (627)455 - 4254',
    email: 'kjackson@gmail.com',
    username: 'kjackson',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center mt-10 px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-bold">Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <View className="items-center mt-6">
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          className="w-24 h-24 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-[40%] bg-blue-600 p-2 rounded-full">
          <Ionicons name="camera" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View className="mt-6 px-5">
        <FormInput label="Full name" value={form.fullName} onChangeText={(v) => handleChange('fullName', v)} />
        <View className="flex-row space-x-4">
          <View className="flex-1">
            <FormInput label="Gender" value={form.gender} onChangeText={(v) => handleChange('gender', v)} />
          </View>
          <View className="flex-1">
            <FormInput label="Birthdate" value={form.birthdate} onChangeText={(v) => handleChange('birthdate', v)} />
          </View>
        </View>
        <FormInput label="Number" value={form.phone} onChangeText={(v) => handleChange('phone', v)} />
        <FormInput label="Email" value={form.email} onChangeText={(v) => handleChange('email', v)} />
        <FormInput label="Username" value={form.username} onChangeText={(v) => handleChange('username', v)} />

        <TouchableOpacity className="mt-6 bg-blue-600 py-3 rounded-lg">
          <Text className="text-white text-center font-medium">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const FormInput = ({ label, value, onChangeText }: any) => (
  <View className="mb-4">
    <Text className="text-gray-600 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      className="border border-gray-300 rounded-lg px-4 py-2"
    />
  </View>
);

export default EditProfile;
