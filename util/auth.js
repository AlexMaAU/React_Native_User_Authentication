import axios from "axios";

const EXPO_PUBLIC_FIREBASE_BASE_URL = process.env.EXPO_PUBLIC_FIREBASE_BASE_URL;
const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

async function authenticate(mode, email, password) {
  const URL = `${EXPO_PUBLIC_FIREBASE_BASE_URL}:${mode}?key=${EXPO_PUBLIC_API_KEY}`;
  const response = await axios.post(URL, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  const token = await authenticate("signUp", email, password);
  return token;
}

export async function signinUser(email, password) {
  const token = await authenticate("signInWithPassword", email, password);
  return token;
}

