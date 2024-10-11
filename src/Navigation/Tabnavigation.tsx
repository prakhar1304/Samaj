import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import color from '../utility/color';

import { COLORS } from '../theme/theme';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import Icon from '../Components/Icon';

const Tab = createBottomTabNavigator();

export default function Tabnavigation() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeIndicator} />}
                  
                <Icon
                    type={"Ionicons"}
                    name="home"
                    size={25}
                    color={focused ? color.light_purple : color.GREY}
                  />
                <Text style={[styles.label, { color: focused ? color.purple : color.grey }]}>HOME</Text>
              </View>
            )
          }}
        />

  
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeIndicator} />}
                
                <Icon
                    type={"FontAwesome"}
                    name="user"
                    size={25}
                    color={focused ? color.light_purple : color.GREY}
                  />

                <Text style={[styles.label, { color: focused ? color.purple : color.GREY }]}>Profile</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    position: 'absolute',
    height: "6.5%",
    backgroundColor: color.WHITE,
    borderTopWidth: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 3,
    //  backgroundColor:"red"

  },
  icon: {
    width: 25,
    height: 25,

  },
  label: {
    fontSize: 12,
    marginBottom: 2,

  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: '80%',
    height: 3,
    backgroundColor: color.purple,

  },
});
