import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { signinUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../store/authContext";

function LoginScreen() {
  const { isAuthenticated, authenticate } = useAuthContext();

  const [isLoggingIn, setIsLoggingIn] = useState();

  async function signinHandler({ email, password }) {
    setIsLoggingIn(true);
    try {
      const token = await signinUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later."
      );
    }
    setIsLoggingIn(false);
  }

  if (isLoggingIn) return <LoadingOverlay message="Logging in..." />;

  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;

