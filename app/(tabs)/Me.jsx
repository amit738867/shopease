import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { useFocusEffect } from 'expo-router';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import StatusBar from '@/components/StatusBar';

const { width } = Dimensions.get('window');

const StatsCard = ({ number, label, icon, color, delay = 0 }) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          damping: 15,
          mass: 1,
          stiffness: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYValue, {
          toValue: 0,
          damping: 12,
          mass: 1,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          { scale: scaleValue },
          { translateY: translateYValue },
        ],
        opacity: opacityValue,
      }}
      className="items-center"
    >
      <LinearGradient
        colors={[color.light, color.dark]}
        className="p-4 rounded-3xl overflow-hidden w-24 h-24 items-center justify-center mb-2"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={icon} size={24} color={color.dark} />
        <Text className="text-2xl font-bold mt-1" style={{ color: color.dark }}>
          {number}
        </Text>
      </LinearGradient>
      <Text className="text-gray-600 text-sm">{label}</Text>
    </Animated.View>
  );
};

const ProfileSection = ({ icon, title, subtitle, onPress, delay = 0 }) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          damping: 15,
          mass: 1,
          stiffness: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYValue, {
          toValue: 0,
          damping: 12,
          mass: 1,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          { scale: scaleValue },
          { translateY: translateYValue },
        ],
        opacity: opacityValue,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        className="mb-4"
        activeOpacity={0.7}
      >
        <BlurView intensity={30} tint="light" className="overflow-hidden rounded-2xl">
          <View className="p-4 flex-row items-center backdrop-blur-lg">
            <LinearGradient
              colors={['#E8F0FF', '#C7D9FF']}
              className="w-12 h-12 rounded-xl items-center justify-center"
            >
              <Ionicons name={icon} size={24} color="#3b82f6" />
            </LinearGradient>
            <View className="ml-4 flex-1">
              <Text className="text-gray-800 font-semibold text-lg">{title}</Text>
              <Text className="text-gray-500 text-sm">{subtitle}</Text>
            </View>
            <View className="bg-blue-50 p-2 rounded-xl">
              <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Me = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Main component animation values
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(50)).current;

  useFocusEffect(
    React.useCallback(() => {
      // Reset animations
      scaleValue.setValue(0.9);
      opacityValue.setValue(0);
      translateYValue.setValue(50);

      // Enhanced combined animation
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          damping: 15,
          mass: 1,
          stiffness: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYValue, {
          toValue: 0,
          damping: 12,
          mass: 1,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const logout = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Animated.View
      className="flex-1 bg-white"
      style={{
        transform: [
          { scale: scaleValue },
          { translateY: translateYValue }
        ],
        opacity: opacityValue,
      }}
    >
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
       <Animated.ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Profile Header */}
          <Animated.View
            style={{
              transform: [{ scale: headerScale }],
            }}
            className="items-center pt-8 pb-6"
          >
            <View className="relative">
              <LinearGradient
                colors={['#E8F0FF', '#C7D9FF']}
                className="p-1 rounded-full"
              >
                <Image 
                  className="h-32 w-32 rounded-full"
                  source={{ uri: user?.imageUrl }}
                  resizeMode="cover"
                />
              </LinearGradient>
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-blue-500 p-3 rounded-full"
                style={{ elevation: 4 }}
              >
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="mt-4 text-2xl font-bold text-gray-800">
              {user?.fullName || 'User Name'}
            </Text>
            <Text className="text-gray-500 mb-2">
              {user?.primaryEmailAddress?.emailAddress || 'email@example.com'}
            </Text>
            <TouchableOpacity
              className="bg-blue-50 px-4 py-2 rounded-full flex-row items-center"
              onPress={() => router.push('/edit-profile')}
            >
              <Ionicons name="pencil" size={16} color="#3b82f6" />
              <Text className="ml-2 text-blue-500 font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Stats Section */}
          <View className="flex-row justify-around px-4 py-6">
            <StatsCard
              number="12"
              label="Orders"
              icon="cart-outline"
              color={{ light: '#E8F0FF', dark: '#3b82f6' }}
              delay={100}
            />
            <StatsCard
              number="5"
              label="Wishlist"
              icon="heart-outline"
              color={{ light: '#FFE8E8', dark: '#f43f5e' }}
              delay={200}
            />
            <StatsCard
              number="3"
              label="Reviews"
              icon="star-outline"
              color={{ light: '#FFF3E8', dark: '#f59e0b' }}
              delay={300}
            />
          </View>

          {/* Menu Sections */}
          <View className="px-4 pt-4">
            <ProfileSection
              icon="cart"
              title="My Orders"
              subtitle="Track and manage your orders"
              onPress={() => router.push('/components/UserInput')}
              delay={400}
            />
            <ProfileSection
              icon="heart"
              title="Wishlist"
              subtitle="Items you've saved for later"
              onPress={() => router.push('/(apps)/Test')}
              delay={500}
            />
            <ProfileSection
              icon="location"
              title="Addresses"
              subtitle="Manage delivery locations"
              onPress={() => router.push('/addresses')}
              delay={600}
            />
            <ProfileSection
              icon="notifications"
              title="Notifications"
              subtitle="Manage your alerts"
              onPress={() => router.push('/notifications')}
              delay={700}
            />
            <ProfileSection
              icon="headset"
              title="Help Center"
              subtitle="Get support and assistance"
              onPress={() => router.push('/support')}
              delay={800}
            />

            {/* Sign Out Button */}
            <Animated.View
              style={{
                transform: [{ scale: scaleValue }],
                opacity: opacityValue,
              }}
              className="mt-6 mb-20"
            >
              <TouchableOpacity
                onPress={logout}
                className="bg-red-50 p-4 rounded-2xl"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                  <Text className="ml-2 text-red-500 font-semibold text-lg">
                    Sign Out
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default Me;