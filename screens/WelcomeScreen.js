import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getMessage } from "../util/http";
import { useAuthContext } from "../store/authContext";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState();
  const { token } = useAuthContext();

  useEffect(() => {
    async function fetchMessageData() {
      const data = await getMessage(token);
      setFetchedMessage(data);
    }
    fetchMessageData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

