import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@pokedex_fatec:users";
const preferencesKey = (username) => `@pokedex_fatec:preferences:${username}`;
const teamKey = (username) => `@pokedex_fatec:team:${username}`;

export async function getUsers() {
  const text = await AsyncStorage.getItem(USERS_KEY);
  return text ? JSON.parse(text) : [];
}
export async function saveUser(user) {
  const users = await getUsers();
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
}
export const getPreferences = async (username) =>
  JSON.parse((await AsyncStorage.getItem(preferencesKey(username))) || "{}");

export const savePreferences = (username, preferences) =>
  AsyncStorage.setItem(preferencesKey(username), JSON.stringify(preferences));

export const getTeam = async (username) =>
  JSON.parse((await AsyncStorage.getItem(teamKey(username))) || "[]");

export const saveTeam = (username, team) =>
  AsyncStorage.setItem(teamKey(username), JSON.stringify(team));

export const deleteTeam = (username) =>
  AsyncStorage.removeItem(teamKey(username));
