// import { View, Text, Dimensions, Image } from 'react-native'
// import React from 'react'
// import Carousel from 'react-native-reanimated-carousel'
// import list from '@/constants/HomeComp'

// const HomeCarousel = () => {
//     const width = Dimensions.get('window').width

//   return (
      
//       <Carousel 
//         className='mt-3'    
//         width={width}
//         height={260}
//         data = {list}
//         scrollAnimationDuration={2000}
//         autoPlay
//         renderItem={({item})=>(
//             <View className=' flex-1 justify-center overflow-hidden' >
//               <Image
//                 source={{uri: item.image}}
//                 resizeMode='contain'
//                 className="w-full h-full overflow-hidden"
//                 />
//             </View>
//         )}
//       />
    
//   )
// }

// export default HomeCarousel