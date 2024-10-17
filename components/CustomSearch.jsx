// import { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
// import icons from "@/constants/icons.js";




// const CustomSearch = ({
//   title,
//   value,
//   placeholder,
//   handleChangeText,
//   otherStyles,
//   ...props
// }) => {
  

//   return (
//     <View className={`space-y-2 mb-10 ${otherStyles}`}>
//       <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

//       <View className="w-[85%] self-center bg-gray-200 h-12 rounded-3xl focus:border-secondary flex flex-row items-center pl-10">
//         <Image 
//         source={icons.searchIcon}
//         resizeMode="contain"
//           className="absolute w-5 h-5 left-4"
//         />
//        <TextInput
//           className="flex-1 text-black font-psemibold text-base pl-4"
//           value={value}
//           placeholder={placeholder}
//           placeholderTextColor="#7B7B8B"
//           onChangeText={handleChangeText}
//           {...props}
//         />

//       </View>
//     </View>
//   );
// };

// export default CustomSearch;