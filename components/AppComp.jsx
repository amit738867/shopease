
// import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
// import React, { useState, useRef } from 'react'
// import images from "@/constants/images.js";
// import { Animated } from 'react-native';
// import { router } from 'expo-router';



// const AppComp = ({ title, source, link }) => {
//   const scaleValue = useRef(new Animated.Value(1)).current;


//   const handlePress = () => {
//     // Start zoom in animation
//     const zoomIn = Animated.timing(scaleValue, {
//       toValue: 300,
//       duration: 900,
//       useNativeDriver: true,
//     });
      
//     // Start zoom out animation after zoom in completes
//     zoomIn.start(() => {
//       Animated.timing(scaleValue, {
//         toValue: 1,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     });    
//     // Navigate to the new screen
//       router.push({ pathname: "/LoadApps", params: { link } });
//   };

//   return (
//       <TouchableOpacity 
//       className='  flex justify-center items-center '
//       onPress={handlePress}
//       >
//         <View className='w-24 h-24 justify-center  rounded-2xl items-center'>
//           <Animated.Image
//         source={{uri: source}} 
//             className='w-16 h-16'
//         resizeMode='contain'
//             style={{ transform: [{ scale: scaleValue }] }} 
//         />
//         </View>
//         <Text
//               className=' font-semibold mt-2 text-base text-center'
//             >
//             {title}
//         </Text>

//       </TouchableOpacity>
   
//   )
// }

// export default AppComp