import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, Modal, BackHandler, StyleSheet } from 'react-native';
import { Tabs, router, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import CustomSearch from '@/components/CustomSearch';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '@/Context/GlobalProvider';
import { BlurView } from 'expo-blur';

const AnimatedTabIcon = ({ icon, color, name, focused }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: focused ? 1.2 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: focused ? 1 : 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <View style={styles.iconContainer}>
      <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: opacityValue }}>
        <MaterialIcons name={icon} size={24} color={color} />
      </Animated.View>
    </View>
  );
};

const TabLayout = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searched, setSearched } = useGlobalContext();

  const handleSearch = async () => {
    setModalVisible(false);
    router.push({ pathname: "/(tabs)/Search", params: { searchQuery } });
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon icon="home" color={color} name="home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Apps"
          options={{
            title: "Apps",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon icon="apps" color={color} name="apps" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              const isCurrentlyOnSearch = pathname.includes('/Search');

              if (!searched) {
                e.preventDefault();
                setModalVisible(true);
              }

              if (isCurrentlyOnSearch) {
                setModalVisible(true);
              }
            },
          })}
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon icon="search" color={color} name="Search" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Track"
          options={{
            title: "Track",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon icon="local-shipping" color={color} name="track" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Me"
          options={{
            title: "Me",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon icon="person" color={color} name="profile" focused={focused} />
            ),
          }}
        />
      </Tabs>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
       <BlurView intensity={20} className='h-[1000] w-[1000] absolute' experimentalBlurMethod /> 
        <View style={styles.modalContainer}>
          
          <View style={styles.searchContainer}>
            <CustomSearch
              placeholder="Search"
              otherStyles={styles.customSearch}
              autoFocus={true}
              handleChangeText={(text) => setSearchQuery(text)}
              handleSubmitSearch={handleSearch}
              />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    top: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: '#fff',
    height: 65,
    width: 410,
    position: 'absolute',
    marginLeft: 20,
    bottom: 15,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 25,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    zIndex: 2,
  },
  customSearch: {
    position: 'absolute',
    width: 470,
    top: 400,
    left: -13,
    alignSelf: 'center',
  },
});

export default TabLayout;
