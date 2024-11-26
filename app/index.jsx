import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRootNavigationState } from "expo-router";
import { useState, useEffect } from "react";
import { Text } from "react-native";

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    
    // Use push instead of replace to maintain navigation stack
    router.replace('/(auth)/Auth');
    // router.replace('/(tabs)/Home');
  }, [rootNavigationState?.key]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className='text-3xl font-bold' >This is Index page</Text>
    </SafeAreaView>
  );
}