// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabnavigation from './Tabnavigation';
import DepartmentDetailScreen from '../Screen/DepartmentDetailScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import ConnectWallet from '../Screen/ConnectWallet';
import Project from '../Screen/Project';
import AdminStackNavigation from '../admin/adminNavigation/AdminStackNavigation';





const Stack = createNativeStackNavigator();

 export default function StackNavigator() {
  return (
    // <AuthProvider>
    <Stack.Navigator screenOptions={{headerShown: false}}>
           
       <Stack.Screen name="LoginScreen" component={LoginScreen} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="ConnectWallet" component={ConnectWallet} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="Register" component={RegisterScreen} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="Tabnavigation" component={Tabnavigation} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="DepartmentDetailScreen" component={DepartmentDetailScreen} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="ProjectDetailScreen" component={Project} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="Profile" component={ProfileScreen} 
       options={{animation: 'slide_from_bottom'}}
       />               
       <Stack.Screen name="AdminStackNavigation" component={AdminStackNavigation} 
       options={{animation: 'slide_from_bottom'}}
       />               

    </Stack.Navigator>
    // </AuthProvider>
  );
} 