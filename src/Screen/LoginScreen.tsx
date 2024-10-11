import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
 
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Icon, { Icons } from "../Components/Icon";
import { useNavigation } from "@react-navigation/native";
import color from "../utility/color";
 
  
  type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;


  
  
  const LoginScreen: React.FC<Props> = () => {

    const navigation = useNavigation();
    const handleSignIn  = () =>{
        navigation.navigate('ConnectWallet');
      };

    const handelGOVnavigation = () => {

      navigation.navigate('AdminStackNavigation');
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.centerContent}>
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>
              Welcome back you've been missed!
            </Text>
          </View>
  
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
          </View>
  
          <View style={styles.passwordContainer}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </View>
  
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn }>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.createAccountText}>Create new account</Text>
          </TouchableOpacity>
  
          <View style={styles.continueWithContainer}>
            <Text style={styles.continueWithText}>Or</Text>
            <TouchableOpacity onPress={handelGOVnavigation}>
                <View style  = {styles.GOvButton}>
                <Text style = {styles.GovText}>Goverment login</Text>
                </View>
              </TouchableOpacity>
          <View>
            
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      justifyContent:"center"
    },
    content: {
      padding: 20,
    },
    centerContent: {
      alignItems: "center",
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      color: "#666",
    },
    inputContainer: {
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      fontSize: 16,
    },
    passwordContainer: {
      alignItems: "flex-end",
      marginVertical: 10,
    },
    forgotPassword: {
      fontSize: 14,
      color: "#007bff",
    },
    signInButton: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 8,
      marginVertical: 20,
    },
    signInText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
    },
    createAccountText: {
      textAlign: "center",
      color: "#333",
      fontSize: 16,
    },
    continueWithContainer: {
      marginTop: 30,
      alignItems: "center",
    },
    continueWithText: {
      fontSize: 14,
      color: "#333",
    },
    socialButtonsContainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    socialButton: {
      padding: 10,
      backgroundColor: "#eee",
      borderRadius: 8,
      marginHorizontal: 10,
    },
    GOvButton:{
      height:50,
      width:300,
      alignItems:"center",
      backgroundColor:color.light_gold , 
      borderRadius:20,
      justifyContent:"center",
      elevation:2
    },
    GovText:{
      color:color.Obsidian,
      fontSize:25
    }
  });
  