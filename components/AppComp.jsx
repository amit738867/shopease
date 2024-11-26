import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const AppComp = ({ title, source, link, index }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateYValue = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const delay = index * 100; // Stagger the animations
    
    Animated.parallel([
      Animated.spring(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        delay,
      }),
      Animated.spring(translateYValue, {
        toValue: 0,
        damping: 12,
        mass: 1,
        stiffness: 100,
        useNativeDriver: true,
        delay,
      }),
    ]).start();
  }, []);

  const handlePress = () => {
    // Perform navigation first
    setTimeout(() => {
      router.push({ pathname: "/LoadApps", params: { link } });
    }, 900);

    // Then start the animations
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        damping: 15,
        mass: 1,
        stiffness: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        damping: 12,
        mass: 1,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.touchable}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [
              { scale: scaleValue },
              { translateY: translateYValue },
            ],
            opacity: opacityValue,
          },
        ]}
      >
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.gradient}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: source }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text style={styles.subtitle}>
            Tap to launch
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '48%',
    marginBottom: 16, // mb-4
  },
  animatedView: {
    backgroundColor: '#ffffff', // bg-white
    borderRadius: 24, // rounded-3xl
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3, // shadow-sm
    elevation: 2, // android:elevation-2
  },
  gradient: {
    borderRadius: 20, // rounded-2xl
    padding: 16, // p-4
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 96, // h-24
  },
  image: {
    width: 64, // w-16
    height: 64, // h-16
  },
  title: {
    textAlign: 'center',
    fontWeight: '600', // font-semibold
    color: '#1f2937', // text-gray-800
    fontSize: 16, // text-base
    marginTop: 8, // mt-2
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280', // text-gray-500
    fontSize: 12, // text-xs
    marginTop: 4, // mt-1
  },
});

export default AppComp;
