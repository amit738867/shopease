import { View, FlatList, Dimensions, Animated, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AppComp from '@/components/AppComp';
import CustomSearch from '@/components/CustomSearch';
import StatusBar from '@/components/StatusBar';
import appsData from '@/constants/AppData';

const numColumns = 2;
const { width } = Dimensions.get('window');

const Apps = () => {
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const translateYValue = React.useRef(new Animated.Value(50)).current;

  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredApps = appsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useFocusEffect(
    React.useCallback(() => {
      // Reset animations
      scaleValue.setValue(0.9);
      opacityValue.setValue(0);
      translateYValue.setValue(50);

      // Enhanced combined animation
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          damping: 15,
          mass: 1,
          stiffness: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateYValue, {
          toValue: 0,
          damping: 12,
          mass: 1,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ scale: scaleValue }, { translateY: translateYValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBox}>
            <View style={styles.headerContent}>
              <MaterialIcons name="apps" size={24} color="#3b82f6" />
              <Text style={styles.headerTitle}>All Applications</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Quick access to your favorite apps
            </Text>
          </View>
        </View>

        <CustomSearch
          placeholder="Search for your favorite apps..."
          otherStyles={{ marginBottom: 16 }} // Tailwind's mb-4
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredApps}
          renderItem={({ item, index }) => (
            <AppComp
              title={item.name}
              source={item.image}
              link={item.link}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: '#ffffff', // bg-white
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16, // px-4
    marginBottom: 16, // mb-4
  },
  headerBox: {
    backgroundColor: '#ebf8ff', // blue-50 to blue-100 gradient equivalent
    padding: 16, // p-4
    borderRadius: 16, // rounded-2xl
    elevation: 2, // android:elevation-2
    marginBottom: 16, // mb-4
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8, // mb-2
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20, // text-xl
    color: '#1f2937', // text-gray-800
    marginLeft: 8, // ml-2
  },
  headerSubtitle: {
    textAlign: 'center',
    color: '#6b7280', // text-gray-600
    fontSize: 14, // text-sm
  },
  flatListContent: {
    paddingHorizontal: 16, // px-4
    paddingBottom: 100, // pb-24
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16, // mb-4
  },
});

export default Apps;
