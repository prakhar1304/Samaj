// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../Screen/LoginScreen';
import ConnectWallet from '../../Screen/ConnectWallet';
import AdmineTabNavigation from './AdmineTabNavigation';






const Stack = createNativeStackNavigator();

 export default function AdminStackNavigation() {
  return (
    // <AuthProvider>
    <Stack.Navigator screenOptions={{headerShown: false}}>
           
                 
       <Stack.Screen name="AdminTabNavigation" component={AdmineTabNavigation} 
       options={{animation: 'slide_from_bottom'}}
       />               


    </Stack.Navigator>
    // </AuthProvider>
  );
} 