import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { router } from 'expo-router';

const BackButton = () => {
  return (
    <TouchableOpacity 
      onPress={() => router.back()} 
      style={styles.button}
    >
      <Image 
        source={{ uri: icons.back }}
        resizeMode="contain"
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 8, // top-2 (converted to 8 pixels)
    left: 20, // left-5 (converted to 20 pixels)
  },
  image: {
    width: 24, // w-6 (converted to 24 pixels)
    height: 24, // h-6 (converted to 24 pixels)
  },
});

export default BackButton;
