import { View, Dimensions, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import list from '@/constants/HomeComp';

const HomeCarousel = () => {
  const width = Dimensions.get('window').width;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.carouselContainer, { opacity: fadeAnim }]}>
      <Carousel
        width={width}
        height={270}
        data={list}
        scrollAnimationDuration={2000}
        pagingEnabled
        autoPlay
        loop
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.touchable}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 12, // mt-3
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 8, // px-2
  },
  touchable: {
    borderRadius: 16, // rounded-2xl
    overflow: 'hidden',
    elevation: 3, // android:elevation-3
  },
  image: {
    width: '100%', // w-full
    height: '100%', // h-full
    borderRadius: 16, // rounded-2xl
  },
});

export default HomeCarousel;
