import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/styles";
import AuthContextProvider, { useAuthContext } from "./store/authContext";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack({ logout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : (
        <AuthenticatedStack logout={logout} />
      )}
    </NavigationContainer>
  );
}

function Root() {
  const { authenticate } = useAuthContext();

  // App加载时先查看local storage中是否已经有token，有的话可以自动登录
  useEffect(() => {
    async function fetchLocalToken() {
      const localToken = await AsyncStorage.getItem("token");

      if (localToken) {
        authenticate(localToken);
      }

      // 先一直显示加载页面，等local token查询结束以后再渲染组件，这样可以解决先显示login页面再快速跳转到主页面的问题
      await SplashScreen.hideAsync();
    }
    fetchLocalToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

