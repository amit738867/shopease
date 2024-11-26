import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import icons from "@/constants/icons.js";

const CustomSearch = ({
  title,
  value,
  placeholder,
  handleChangeText,
  handleSubmitSearch,
  otherStyles,
  autoFocus, // pass autofocus here as props
  ...props
}) => {
  const inputRef = useRef(null); // create a ref for the TextInput

  useEffect(() => {
    if (autoFocus) {
      // Set a small timeout to ensure the input is ready before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <Image
          source={{ uri: icons.searchIcon }}
          resizeMode="contain"
          style={styles.icon}
        />
        <TextInput
          ref={inputRef} // attach the ref here
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitSearch}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#F3F4F6', // text-gray-100
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    width: '85%',
    backgroundColor: '#E5E7EB', // bg-gray-200
    height: 48,
    borderRadius: 24, // rounded-3xl
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 16,
  },
  textInput: {
    flex: 1,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    paddingLeft: 16,
  },
});

export default CustomSearch;
