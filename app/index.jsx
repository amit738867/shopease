import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import CustomButton from "@/components/CustomButton";
// import CustomText from "@/components/CustomText";
import { router } from "expo-router";

export default function Index() {
  return (  
    <SafeAreaView>
      <View className=' w-full flex justify-center h-full px-4' >

      <LottieView
      source={require("../components/splash4.json")}
      style={{width: 500, height: 350}}
      autoPlay
      loop
      className='relative right-10 top-10'
    />
    <Text className='text-3xl font-bold text-[#181d1d]  ' >Join Our Community of Happy Shoppers...</Text>
    
    {/* <CustomText
    title='Email Address'
    placeholder='Enter your email address'
    otherStyles="mt-5"
    /> */}

    {/* <CustomButton 
     title="Get Started"
     handlePress={() => router.push("/Home")} 
     containerStyles="mt-3"
     
      />  */}
      </View>
    </SafeAreaView>
    
    
    
  );
}
