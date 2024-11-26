import React from 'react';
import { FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Bannerlogo from '@/constants/SiteLogos';

// ProductCard Component
const ProductCard = ({ 
  origin, 
  imgUrl, 
  productName, 
  price, 
  discount, 
  originUrl 
}) => {
  const handleBuyNow = () => {
    Linking.openURL(originUrl);
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-2">
        <View className="bg-white w-48 rounded-lg p-2 m-1 relative">
          {/* Logo Banner */}
          <Image
            source={{ uri: Bannerlogo[origin] || "none" }}
            className="absolute bottom-2 right-2 w-20 h-8 rounded-md z-10"
            resizeMode="contain"
          />
          
          {/* Product Image */}
          <View className="rounded-lg overflow-hidden">
            <Image
              source={{ uri: imgUrl || "none" }}
              className="w-44 h-48 rounded-lg"
              resizeMode="cover"
            />
          </View>
          
          {/* Product Details */}
          <View className="mt-2 space-y-2">
            <Text className="text-gray-800 text-base font-medium">
              {productName ? `${productName.slice(0, 30)}...` : 'No product name'}
            </Text>
            
            {/* Price Section */}
            <View className="flex-row items-center space-x-2">
              <Text className="text-gray-900 text-lg font-semibold">{price}</Text>
              {discount !== "none" && (
                <Text className="text-red-500 text-xs font-semibold">-{discount}</Text>
              )}
            </View>
            
            {/* Buy Button */}
            <TouchableOpacity onPress={handleBuyNow} className="bg-gray-800 w-20 h-8 rounded-md items-center justify-center">
              <Text className="text-white font-bold text-sm">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// CompareList Component
const CompareList = ({ productlist }) => {
  // Limit the displayed products to the top 6
  const limitedProductList = productlist?.slice(0, 6) || [];

  return (
    <View className="flex-1 p-4">
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 8 }}
        numColumns={2}
        data={limitedProductList}
        keyExtractor={(item, index) => `${item.productName || item.id}-${index}`} // Fallback for unique keys
        renderItem={({ item }) => (
          <View className="flex-1 p-2">
            <ProductCard {...item} />
          </View>
        )}
      />
    </View>
  );
};

export default CompareList;
