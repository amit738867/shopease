import { Image, Linking, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Bannerlogo from '@/constants/SiteLogos';

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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Logo Banner */}
          <Image
            source={{ uri: Bannerlogo[origin] || "none" }}
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imgUrl || "none" }}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
          
          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>
              {productName ? `${productName.slice(0, 30)}...` : 'No product name'}
            </Text>
            
            {/* Price Section */}
            <View style={styles.priceSection}>
              <Text style={styles.price}>{price}</Text>
              {discount !== "none" && (
                <Text style={styles.discount}>-{discount}</Text>
              )}
            </View>
            
            {/* Buy Button */}
            <TouchableOpacity onPress={handleBuyNow} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    width: 192,
    borderRadius: 12,
    padding: 8,
    margin: 4,
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 80,
    height: 32,
    borderRadius: 8,
    zIndex: 10,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: 176,
    height: 192,
    borderRadius: 12,
  },
  detailsContainer: {
    marginTop: 8,
    gap: 8,
  },
  productName: {
    color: '#1f2937', // gray-800
    fontSize: 16,
    fontWeight: '500',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    color: '#111827', // gray-900
    fontSize: 18,
    fontWeight: '600',
  },
  discount: {
    color: '#ef4444', // red-500
    fontSize: 12,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#1f2937', // gray-800
    width: 80,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ProductCard;
