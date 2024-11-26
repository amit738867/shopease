import { StyleSheet, FlatList, SafeAreaView, Animated, Text, View } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import ProductCard from '@/components/ProductCard';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { searchEngine } from '@/lib/SearchEngine';
import StatusBar from '@/components/StatusBar';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { useGlobalContext } from '@/Context/GlobalProvider';

export default function Index() {
  const { searchQuery } = useLocalSearchParams();
  const [productlist, setProductlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searched, setSearched } = useGlobalContext();

  // Animation values
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const loadingScale = useRef(new Animated.Value(0.8)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Start loading animation
        Animated.parallel([
          Animated.spring(loadingScale, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 7
          }),
          Animated.timing(loadingOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          })
        ]).start();

        const products = await searchEngine(searchQuery);
        setProductlist(products);
      } catch (error) {
        console.log(error);
      } finally {
        // Fade out loading animation
        setSearched(true);

        Animated.parallel([
          Animated.timing(loadingOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.spring(loadingScale, {
            toValue: 0.8,
            useNativeDriver: true
          })
        ]).start(() => setLoading(false));
      }
    };
    fetchProducts();
  }, [searchQuery]);

  const loadMoreData = () => {
    setProductlist(prevData => [
      ...prevData,
      ...Array.from({ length: 20 }, (_, i) => `Item ${prevData.length + i + 1}`)
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reset animations
      scaleValue.setValue(0.9);
      opacityValue.setValue(0);

      // Animate content in
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }, [scaleValue, opacityValue])
  );

  return (
    <Animated.View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        {loading ? (
          <Animated.View
            style={[
              styles.loadingContainer,
              { transform: [{ scale: loadingScale }], opacity: loadingOpacity }
            ]}
          >
            <BlurView
              tint="light"
              intensity={20}
              style={styles.blurView}
              experimentalBlurMethod
            />
            <LottieView
              source={require("@/components/splash4.json")}
              style={styles.lottie}
              autoPlay
              loop
            />
          </Animated.View>
        ) : (
          <>
            <StatusBar />
            <FlatList
              contentContainerStyle={styles.cardContainer}
              numColumns={2}
              data={productlist}
              keyExtractor={(item) => item.productName}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => <ProductCard {...item} />}
            />
          </>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 28,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  blurView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  lottie: {
    width: 500,
    height: 350,
  },
  cardContainer: {
    justifyContent: 'space-between',
    padding: 10,
  },
});

