import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {images } from '@/constants/images'

// Placeholder for user profile info
const UserProfile = () => (
  <View className="items-center mb-4">
    <View className="w-20 h-20 rounded-full bg-gray-200 mb-2" />
    <Text className="text-xl font-semibold text-gray-50">Allan Doe</Text>
    <Text className="text-gray-50 ">allan@example.com</Text>
  </View>
)

// Placeholder for settings
const Settings = () => (
  <View className="w-full px-4 mb-4">
    <TouchableOpacity className="py-3 border-b border-gray-200 bg-gray-500 rounded-md mb-2 p-2">
      <Text className="text-base text-gray-50">Account Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity className="py-3 border-b border-gray-200 bg-gray-500 rounded-md p-2">
      <Text className="text-base text-gray-50">Privacy</Text>
    </TouchableOpacity>
    <TouchableOpacity className="py-3">
      <Text className="text-base">Logout</Text>
    </TouchableOpacity>
  </View>
)

// Placeholder for user posts
const UserPosts = () => (
  <View className="w-full px-4">
    <Text className="text-lg font-bold mb-2 ">Your Posts</Text>
    <View className="bg-gray-500 p-3 rounded mb-2">
      <Text className='text-gray-50'>Post #1: My favorite movie!</Text>
    </View>
    <View className="text-gray-500 p-3 rounded mb-2">
      <Text className='text-gray-50'>Post #2: Just watched something awesome.</Text>
    </View>
  </View>
)

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-star pt-10 bg-primary px-10 text-gray-50">
      <Image source={images.bg} className="absolute w-full h-full" />
    
      
      <UserProfile />
      <Settings />
      <UserPosts />
    </View>
  )
}

export default Profile