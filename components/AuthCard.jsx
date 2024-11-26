import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const FeatureCard = ({ IconComponent, iconName, title, description }) => (
  <View className="bg-white p-6 rounded-3xl mb-4 android:elevation-2">
    <View className="items-center">
      <IconComponent name={iconName} size={32} color="#3b82f6" />
      <Text className="font-semibold text-gray-800 mt-4 mb-2 text-center">
        {title}
      </Text>
      <Text className="text-gray-600 text-sm text-center">
        {description}
      </Text>
    </View>
  </View>
);

const AuthCard = ({ onPress }) => {
  return (
    <View className="flex-1 h-full w-full bg-gray-50">
      
        {/* Hero Section */}
        <View className="items-center justify-center px-6 pt-12 pb-8 w-full h-[90%]">
          {/* Store Icon */}
          <MaterialCommunityIcons 
            name="storefront-outline" 
            size={64} 
            color="#3b82f6" 
            className="mb-6"
          />
          
          {/* Welcome Text */}
          <Text className="text-3xl font-bold text-gray-800 mb-4 text-center android:tracking-tight">
            Welcome to Shopease
          </Text>
          <Text className="text-gray-600 text-center mb-8 px-4 leading-6">
            Discover amazing products with the best deals and secure shopping experience
          </Text>

          {/* Login Button */}
          <TouchableOpacity
            onPress={onPress}
            className="bg-blue-600 rounded-full px-8 py-4 flex-row items-center android:elevation-3 active:bg-blue-700"
          >
            <View className="flex-row items-center">
              <MaterialIcons name="login" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                Continue with Google
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color="white" className="ml-2" />
            </View>
          </TouchableOpacity>
        </View>

       

        {/* Decorative Circles - Using Views for Android */}
        <View 
          className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-30"
          style={{ backgroundColor: '#93c5fd' }} // blue-200
        />
        <View 
          className="absolute bottom-10 right-0 w-64 h-64 rounded-full opacity-30"
          style={{ backgroundColor: '#93c5fd' }} // blue-200
        />
     
    </View>
  );
};

export default AuthCard;