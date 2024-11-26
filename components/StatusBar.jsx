import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import React from 'react';
import BackButton from './BackButton';
import icons from '@/constants/icons';

const StatusBar = () => {
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      damping: 15,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity>
        <Animated.Image
          source={{ uri: icons.main }}
          resizeMode="contain"
          style={[
            styles.logo,
            { transform: [{ scale: scaleValue }] },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  logo: {
    width: 144, // 36 * 4
    height: 40, // 10 * 4
  },
});

export default StatusBar;
