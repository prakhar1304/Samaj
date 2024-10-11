import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    ActivityIndicator,
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { FONTFAMILY } from '../theme/theme';
import color from '../utility/color';


const AnimatedView = Animated.createAnimatedComponent(View);
const { height } = Dimensions.get('window');

export default function Profile() {
    const navigation = useNavigation();









    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image
                        style={styles.coverImage}
                        source={{
                            uri: 'https://th.bing.com/th/id/OIP.28ByQG1U9Vh1WR4bQCpAKQHaEK?rs=1&pid=ImgDetMain',
                        }}
                    />
                    <View style={styles.profileContainer}>
                        <AnimatedView style={styles.profileImageView}>
                            <Image
                                style={styles.profileImage}
                                source={{
                                    uri: 'https://th.bing.com/th/id/R.e2bb45fff1e398723c711c519502d5a3?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0',
                                }}
                            />
                        </AnimatedView>

                        <View style={styles.accountDetails}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50
                            }}>
                                <Text 
                                  style={{ color: color.BLACK,
                                  fontSize: 20,
                                  fontFamily: FONTFAMILY.poppins_medium }}>
                                    Prakhar  Madharia
                                    </Text>
                            </View>
                        </View>    

                     


                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
    },
    coverImage: {
        height: 200,
        width: '100%',
        opacity: 0.9,
        backgroundColor: '#333',
    },
    profileContainer: {
        backgroundColor: color.WHITE,
        marginTop: -80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 5, // Added elevation for shadow on Android
    },
    profileImageView: {
        alignItems: 'center',
        marginTop: -50,
        shadowColor: '#E472C4',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
    },


   
});
