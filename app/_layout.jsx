import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import GlobalProvider from "@/Context/GlobalProvider";
import {ClerkProvider, useAuth} from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import "../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});



const publishablekey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;




if(!publishablekey){
  throw new Error("missong clerk key");
}

const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log("error in getting token", error);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log("error in storing token");
      return;
    }
  }
}

const RootLayout = () => {

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishablekey}>
      <GlobalProvider>
   
       
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarBackgroundColor: "white",
            statusBarStyle: "dark"
          }}
        >
          <Stack.Screen name="(auth)/Auth"  />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index"  />
          
        </Stack>
      </GlobalProvider>
    </ClerkProvider>
    
  );
};

export default RootLayout;