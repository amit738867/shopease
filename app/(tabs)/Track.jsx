import { View, Text, Animated, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StatusBar from '@/components/StatusBar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import LoadApp from '../(apps)/LoadApps';
import { router, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';

const LoadTrack = () => {
  const  link  = "http://shopease-track.vercel.app/"
  const router = useRouter();
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        router.back(); // Go back to the previous component
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [canGoBack, router]);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    
      <WebView
        ref={webViewRef}
        source={{ uri: link }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={handleNavigationStateChange}
      />
    
  );
};



const Track = () => {
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      // Reset both animations
      scaleValue.setValue(0.9);
      opacityValue.setValue(0);

      // Classy combined animation (scale + fade-in)
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }, [scaleValue, opacityValue])
  );


  return (
    <Animated.View
      className="w-full h-full bg-white"
      style={{
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,  // Adding opacity animation
      }}
    >
    <SafeAreaView className='w-full h-full bg-white mt-3'>

      
    <StatusBar />
      <LoadTrack />
      
    
    </SafeAreaView>
    </Animated.View>
  )

}
export default Track