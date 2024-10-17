
// import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
// import React from 'react'
// import AppComp from '@/components/AppComp'
// import images from '@/constants/images'
// import icons from '@/constants/icons'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CustomSearch from '@/components/CustomSearch'
// import BackButton from '@/components/BackButton'
// import StatusBar from '@/components/StatusBar'


// const numColumns = 3;

// const { width } = Dimensions.get('window');

// const Apps = () => {
//     const [searchQuery, setSearchQuery] = React.useState('');

//     const appsData = [
//         { name: "Flipkart", image: images.flipkart, link:"https://fktr.in/a7uZz6a"  },
//         { name: "Amazon", image: images.amazon, link:"https://amzn.to/3zPnUcH"  },
//         { name: "Ajio", image: images.ajio, link:"https://ajiio.in/8YbqKaJ"  },
//         { name: "Myntra", image: images.myntra, link:"https://myntr.it/oIHS5Yq"  },
//         { name: "Bewakoof", image: images.bewakoof, link:"https://www.bewakoof.com/"  },
//         { name: "Meesho", image: images.meesho, link:"https://www.meesho.com/"  },
//         { name: "Nykaa", image: images.nykaa, link:"https://bitli.in/EKvZ057"  },
//         { name: "Nykaa Fashion", image: images.nykaafashion, link:"https://www.nykaafashion.com/"  },
//         { name: "Nykaa Man", image: images.nykaaman, link:"https://www.nykaaman.com/"  },
//         { name: "Shopsy", image: images.shopsy, link:"https://bitli.in/ncw1D2G"  },
//         { name: "Snapdeal", image: images.snapdeal, link:"https://www.snapdeal.com/"  },
//         { name: "Shopclues", image: images.shopclues, link:"https://www.shopclues.com/"  },
//         { name: "JioMart", image: images.jiomart, link:"https://www.jiomart.com/"  },
//         { name: "Tata Cliq", image: images.tatacliq, link:"https://www.tatacliq.com/"  },
//         { name: "Mamaearth", image: images.mamaearth, link:"https://bitli.in/gnh5S20"  },
//         { name: "Snitch", image: images.snitch, link:"https://www.snitch.co.in/"  },
//         { name: "Croma", image: images.croma, link:"https://bitli.in/QpYHf48"  },
        

//     ];

//     const filteredApps = appsData.filter(item =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     const handleSearch = (text) => {
//       setSearchQuery(text);
//     };

//   return (
//     <SafeAreaView className='w-full h-full bg-white mt-8'>
      
//     <StatusBar />

//     <CustomSearch
//       title="Search"
//       placeholder="Search for apps"
//       otherStyles=""
//       value={searchQuery}
//       onChangeText={handleSearch}
//     />
//     <FlatList
      
//       data={filteredApps}
//       renderItem={({ item }) => (
//         <AppComp title={item.name} source={item.image} link={item.link} />
//       )}
//       keyExtractor={(item, index) => index.toString()}
//       numColumns={numColumns}
//       contentContainerStyle={{
//         paddingHorizontal: 15,
//         paddingVertical: 20,
//       }}
//       columnWrapperStyle={{
//         justifyContent: 'space-around',
//         marginBottom: 10,
//       }}
//     />
//   </SafeAreaView>
//   )
// }

// export default Apps