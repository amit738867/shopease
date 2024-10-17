import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  


  return (
 
      <Stack
      screenOptions={{
        headerShown: false,
      }}
      >
    
        <Stack.Screen name="index"  />
        {/* <Stack.Screen name="(tabs)"  /> */}
        {/* <Stack.Screen name="(apps)/LoadApps" /> */}
       
        
      </Stack>
 
  );
};

export default RootLayout;