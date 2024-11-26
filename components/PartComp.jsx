import { View, Text, FlatList, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import React from 'react';
import Deals from '@/constants/Deals';
import icons from '@/constants/icons';
import { MaterialIcons } from '@expo/vector-icons';

const PartComp = ({ title, imgstyle }) => {
  const translateX = React.useRef(new Animated.Value(50)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        damping: 12,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const data = Deals[title];
  if (!data) return <Text>No Deals Available</Text>;

  return (
    <Animated.View style={[styles.animatedView, { transform: [{ translateX }], opacity }]}>
      <View style={styles.header}>
        <Image 
          source={{ uri: icons[title] }}
          style={[styles.image, imgstyle]}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dealItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.dealImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

      <View style={styles.separator} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 16,
    marginBottom: 8,
  },
  image: {
    width: 50,  // Adjust this value according to your specific image size requirement
    height: 50,  // Adjust this value according to your specific image size requirement
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ebf8ff',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
    marginRight: 8,
  },
  separator: {
    width: '94%',
    height: 2,
    alignSelf: 'center',
    backgroundColor: '#e5e7eb',
  },
  flatList: {
    height: 145,
    width: '95%',
    borderRadius: 16,
  },
  flatListContent: {
    marginTop: 8,
    height: 160,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dealItem: {
    elevation: 2,  // Specific for Android shadow
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    transform: [{ scale: 0.98 }],
  },
  dealImage: {
    width: 170,
    height: 140,
    marginHorizontal: 8,
    alignSelf: 'center',
  },
});

export default PartComp;
