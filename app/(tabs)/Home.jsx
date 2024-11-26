import { ScrollView, Text, View, Animated, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import HomeCarousel from '@/components/HomeCarousel';
import PartComp from '@/components/PartComp';
import StatusBar from '@/components/StatusBar';

const Home = () => {
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const translateYValue = React.useRef(new Animated.Value(50)).current;

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

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ scale: scaleValue }, { translateY: translateYValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Carousel Section */}
          <View style={styles.carouselSection}>
            <HomeCarousel />
          </View>

          {/* Deals Section */}
          <View style={styles.dealsSection}>
            <View style={styles.dealsContainer}>
              <View style={styles.dealsHeader}>
                <MaterialIcons name="local-offer" size={24} color="#3b82f6" />
                <Text style={styles.dealsTitle}>
                  Exclusive Deals of the Day
                </Text>
              </View>
              <Text style={styles.dealsDescription}>
                Grab the best offers before they're gone!
              </Text>
            </View>
          </View>
            
          {/* Partners Section */}
          <View style={styles.partnersSection}>
            <PartComp title="myntra" imgstyle={styles.partnerImage} />
            <PartComp title="flipkart" imgstyle={styles.partnerImage} />
            <PartComp title="amazon" imgstyle={styles.amazonImage} />
            <PartComp title="ajio" imgstyle={styles.ajioImage} />
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  carouselSection: {
    marginBottom: 24,
  },
  dealsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  dealsContainer: {
    backgroundColor: 'linear-gradient(90deg, rgba(240,246,255,1) 0%, rgba(219,234,254,1) 100%)',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  dealsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dealsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: 8,
  },
  dealsDescription: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
  partnersSection: {
    marginBottom: 80,
  },
  partnerImage: {
    width: 90,
    height: 80,
  },
  amazonImage: {
    width: 78,
    height: 80,
  },
  ajioImage: {
    width: 60,
    height: 80,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default Home;
