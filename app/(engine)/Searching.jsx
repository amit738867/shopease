import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React,{ useContext } from 'react';
import ProductCard from '@/components/ProductCard';
import { useGlobalContext } from '@/Context/GlobalProvider';

export default function index( {productlist }) {
  console.log(productlist)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.cardcontainer}
        numColumns={2}
        data={productlist}
        keyExtractor={(item) => item.productName}
        renderItem={({ item }) => <ProductCard {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9FCFF',
    transform: [{ translateY: 50 }],
  },
  cardcontainer: {
    justifyContent: 'space-between',
  },
});
