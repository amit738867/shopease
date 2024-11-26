import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const CustomText = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8, // equivalent to space-y-2
  },
  title: {
    fontSize: 16, // text-base
    color: '#f3f4f6', // gray-100
    fontFamily: 'Poppins-Medium', // font-pmedium
  },
  inputContainer: {
    width: '100%', // w-full
    backgroundColor: '#e5e7eb', // gray-200
    height: 64, // h-16
    paddingHorizontal: 16, // px-4
    borderRadius: 16, // rounded-2xl
    flexDirection: 'row', // flex-row
    alignItems: 'center', // items-center
  },
  textInput: {
    flex: 1, // flex-1
    color: '#000000', // text-black
    fontFamily: 'Poppins-SemiBold', // font-psemibold
    fontSize: 16, // text-base
  },
  icon: {
    width: 24, // w-6
    height: 24, // h-6
  },
});

export default CustomText;
