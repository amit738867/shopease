// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { Tabs } from 'expo-router'
// import icons from "@/constants/icons.js";




// const TabIcon = ({ icon, color, name, focused }) => {
//   return (
//     <View className="flex items-center justify-center gap-2">
//       <Image
//         source={{uri: icon}}
//         resizeMode="contain"
//         tintColor={color}
//         className="w-7 h-7"
//       />

//     </View>
//   );
// };


// const TabLayout = () => {
//   return (
//     <>
//       <Tabs
//          screenOptions={{
//           tabBarActiveTintColor: "#353535",
//           tabBarInactiveTintColor: "#BAB9B9",
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             // backgroundColor: "#161622",
//             // borderTopWidth: 1,
//             // borderTopColor: "#232533",
//             height: 54,
//           },
//         }}
//       >

//       <Tabs.Screen
//           name="Home"
//           options={{
//             title: "Home",
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => (
//               <TabIcon
//               icon={icons.home}
//               color={color}
//               name="home"
//               focused={focused}
//             />
//             ),
//           }}
//         />
//       <Tabs.Screen
//           name="Apps"
//           options={{
//             title: "Apps",
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => (
//               <TabIcon
//               icon={icons.apps}
//               color={color}
//               name="apps"
//               focused={focused}
//             />
//             ),
//           }}
//         />
//       <Tabs.Screen
//           name="Track"
//           options={{
//             title: "Track",
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => (
//               <TabIcon
//               icon={icons.track}
//               color={color}
//               name="track"
//               focused={focused}
//             />
//             ),
//           }}
//         />
//       <Tabs.Screen
//           name="Me"
//           options={{
//             title: "Me",
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => (
//               <TabIcon
//               icon={icons.profile}
//               color={color}
//               name="profile"
//               focused={focused}
//             />
//             ),
//           }}
//         />

//       </Tabs>
//     </>
//   )
// }

// export default TabLayout