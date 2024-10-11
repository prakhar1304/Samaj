import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const ConnectWallet = () => {

    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Wallet Logo and Title */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/nft-wallet-6271662-5175173.png' }} // Placeholder logo
          style={styles.logo}
        />
        <Text style={styles.title}>Choose your wallet</Text>
        <Text style={styles.subTitle}>
          By connecting your wallet you agree to our 
          <Text style={styles.link}> Terms of Service </Text>
          and 
          <Text style={styles.link}> Privacy Policy</Text>
        </Text>
      </View>

      {/* Wallet Options */}
      <TouchableOpacity style={styles.walletButton}>
        <Image 
          source={{ uri: 'https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png' }} // MetaMask logo
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>MetaMask</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.walletButton}>
        <Image 
          source={{ uri: 'https://www.yadawallets.com/wp-content/uploads/2021/06/Phantom-wallet-logo.png' }} // Trust Wallet logo
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>Phantom</Text>
      </TouchableOpacity>

     

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Tabnavigation')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',  // Solid black background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginLeft: -10,
    marginTop: -40,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  link: {
    color: '#4B9BFF',
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
  },
  walletIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  walletText: {
    color: '#fff',
    fontSize: 16,
  },
  continueButton: {
    marginTop: 30,
    backgroundColor: '#1c1c1c',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConnectWallet;
