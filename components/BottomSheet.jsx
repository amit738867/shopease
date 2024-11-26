import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { searchEngine } from '@/lib/Complib';
import { ActivityIndicator } from 'react-native';
import CompareList from './CompareList';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const BottomSheet = ({ currentUrl, executeJavaScript }) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [compProducts, setCompProducts] = useState([]);
  const [localLoader, setLocalLoader] = useState(false);
  const [compModal, setCompModal] = useState(false);
  const [isTitleLoaded, setIsTitleLoaded] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const webViewRef = useRef(null);
  const titleExtractTimeout = useRef(null);

  const [animations, setAnimations] = useState({
    wishlist: new Animated.Value(1),
    track: new Animated.Value(1),
    compare: new Animated.Value(1),
    share: new Animated.Value(1)
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log(currentUrl);
    console.log('handleSheetChanges', index);
  }, [currentUrl]);

  useEffect(() => {
    setCurrentTitle("");
    setIsTitleLoaded(false);

    if (titleExtractTimeout.current) {
      clearTimeout(titleExtractTimeout.current);
    }
  }, [currentUrl]);

  const extractPageTitle = useCallback(() => {
    const extractScript = `
      function getProductTitle() {
        return document.title;
      }
      window.ReactNativeWebView.postMessage(getProductTitle());
      true;
    `;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(extractScript);
    }
  }, []);

  const animateOption = (key) => {
    Animated.sequence([
      Animated.timing(animations[key], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animations[key], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };


  const onCompare = async () => {
    if (!currentTitle || !isTitleLoaded) {
      extractPageTitle();
      return;
    }

    try {
      setLocalLoader(true);
      const searchTitle = currentTitle.slice(0, 40).trim();
      const products = await searchEngine(searchTitle);
      setCompProducts(products);
    } catch (error) {
      console.error('Comparison error:', error);
    } finally {
      setLocalLoader(false);
    }
  };

  useEffect(() => {
    if (compProducts.length > 0) {
      setCompModal(true);
    }
  }, [compProducts]);

  const handleTitleExtraction = useCallback((event) => {
    const extractedTitle = event.nativeEvent.data;
    if (extractedTitle && extractedTitle.length > 0) {
      setCurrentTitle(extractedTitle);
      setIsTitleLoaded(true);
    } else {
      titleExtractTimeout.current = setTimeout(extractPageTitle, 1000);
    }
  }, [extractPageTitle]);

  return (
   <>
      <TouchableOpacity onPress={handlePresentModalPress} style={{ width: 40, alignSelf: 'center', padding: 8, backgroundColor: 'black', borderRadius: 50, position: 'absolute', bottom:54}}>
        <AntDesign name="arrowup" size={24} color="white" />
      </TouchableOpacity>

      <View>
        <WebView
          key={currentUrl}
          source={{ uri: currentUrl }}
          originWhitelist={['*']}
          ref={webViewRef}
          onLoadEnd={extractPageTitle}
          onMessage={handleTitleExtraction}
          className="hidden"
        />
      </View>
       

        <BottomSheetModalProvider >
          <BottomSheetModal 
            ref={bottomSheetModalRef} 
            onChange={handleSheetChanges}
            style={{ flex: 1, justifyContent: 'center',  width: '80%', alignSelf: 'center', position: 'absolute', marginLeft: 40 }}
           >
            <BottomSheetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {localLoader ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <View style={{ flexDirection: 'row', marginVertical: 16, justifyContent: 'space-evenly', width: '100%' }}>
                <TouchableOpacity onPress={() => { console.log('Add to Wishlist'); animateOption('wishlist'); }}>
                  <Animated.View style={{ transform: [{ scale: animations.wishlist }] }}>
                    <AntDesign name="heart" size={32} color="red" />
                    <Text style={{ textAlign: 'center' }}>Wishlist</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { console.log('Track Product'); animateOption('track'); }}>
                  <Animated.View style={{ transform: [{ scale: animations.track }] }}>
                    <MaterialIcons name="track-changes" size={32} color="blue" />
                    <Text style={{ textAlign: 'center' }}>Track</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onCompare(); animateOption('compare'); }}>
                  <Animated.View style={{ transform: [{ scale: animations.compare }] }}>
                    <AntDesign name="linechart" size={32} color="green" />
                    <Text style={{ textAlign: 'center' }}>Compare</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { console.log('Share'); animateOption('share'); }}>
                  <Animated.View style={{ transform: [{ scale: animations.share }] }}>
                    <MaterialIcons name="share" size={32} color="purple" />
                    <Text style={{ textAlign: 'center' }}>Share</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              )}
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
          
       

      {compModal && (
        <View className="absolute h-[70%] w-[90%] justify-center">
          <CompareList productlist={compProducts} />
          <TouchableOpacity onPress={() => setCompModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default BottomSheet;