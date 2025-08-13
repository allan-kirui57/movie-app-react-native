import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Redirect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="items-center mt-10">
        <Image
          source={{ uri: user.avatar || 'https://via.placeholder.com/100' }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="mt-3 text-lg font-bold text-gray-800">{user.name}</Text>
        <Text className="text-gray-500">@{user.username}</Text>

        <TouchableOpacity
          onPress={() => router.push('/profile/edit')}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-medium">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View className="mt-8">
        <MenuItem
          icon="lock-closed-outline"
          label="Change Password"
          onPress={() => router.push('/profile/change-password')}
        />
        <MenuItem icon="help-circle-outline" label="Help & Support" onPress={() => {}} />
        <MenuItem icon="log-out-outline" label="Log out" onPress={logout} />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center px-5 py-4 border-b border-gray-200"
  >
    <Ionicons name={icon} size={22} color="#4B5563" />
    <Text className="ml-4 text-gray-700 text-base">{label}</Text>
  </TouchableOpacity>
);

export default Profile;
