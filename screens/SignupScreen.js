import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../store/authContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState();

  const { isAuthenticated, authenticate } = useAuthContext();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please check your input or try again later."
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;

