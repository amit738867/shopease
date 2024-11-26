import { View, Text, BackHandler, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from '@/components/BottomSheet';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function LoadApp() {
  const { link } = useLocalSearchParams();
  const router = useRouter();
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(link); // Initialize with the initial link
  const [showButton, setShowButton] = useState(false);

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
    setCurrentUrl(navState.url); // Update the currentUrl with the new URL
  };

  const isProductPage = (url) => {
    const patterns = {
      flipkart: /^(https?:\/\/)?(www\.)?flipkart\.com\/[^\/]+\/p\/[^\/]+$/,
      amazon: /^(https?:\/\/)?(www\.)?amazon\.[a-z]{2,3}\/[^\/]+\/dp\/[^\/]+(\/.*)?(\?.*)?$/,
      ajio: /^(https?:\/\/)?(www\.)?ajio\.com\/[^\/]+\/p\/[^\/]+$/,
      myntra: /^(https?:\/\/)?(www\.)?myntra\.com\/[a-z0-9\-]+\/[a-z0-9\-]+\/[a-z0-9\-]+\/[0-9]+\/buy$/,
      meesho: /^(https?:\/\/)?(www\.)?meesho\.com\/[^\/]+\/p\/[^\/]+$/,
      shopsy: /^(https?:\/\/)?(www\.)?shopsy\.com\/[^\/]+\/p\/[^\/]+$/,
      nykaa: /^(https?:\/\/)?(www\.)?nykaa\.com\/[^\/]+\/p\/[^\/]+$/,
      jiomart: /^(https?:\/\/)?(www\.)?jiomart\.com\/[^\/]+\/p\/[^\/]+$/,
      croma: /^(https?:\/\/)?(www\.)?croma\.com\/[^\/]+\/p\/[^\/]+$/,
    };

    return Object.values(patterns).some((pattern) => pattern.test(url));
  };

  useEffect(() => {
    if (isProductPage(currentUrl)) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [currentUrl]);

  // Inject JavaScript to retrieve the document title
  const injectedJavaScript = `
    setTimeout(() => {
      window.ReactNativeWebView.postMessage(document.title);
    }, 100);
    true;
  `;
  

  const handleMessage = (event) => {
    const pageTitle = event.nativeEvent.data;
    console.log('Page Title:', pageTitle);
  };

  

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: '100%', width: '100%' }}>
    <SafeAreaView className="h-full w-full">
      <WebView
        ref={webViewRef}
        source={{ uri: link }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript} // Inject JS to get title
        onMessage={handleMessage} // Handle the message to get the title
        onNavigationStateChange={handleNavigationStateChange}
      />
      {showButton && <BottomSheet currentUrl={currentUrl}/>}
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

