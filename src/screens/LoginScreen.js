import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Field from "../components/Field";
import { getUsers } from "../services/storage";
import styles from "../styles/styles";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password)
      return Alert.alert("Atenção", "Informe usuário e senha para entrar.");

    try {
      const normalizedUsername = username.trim().toLowerCase();
      const registeredUsers = await getUsers();
      const authenticatedUser = registeredUsers.find(
        (item) =>
          item.username.toLowerCase() === normalizedUsername &&
          item.password === password,
      );

      if (!authenticatedUser)
        return Alert.alert(
          "Dados inválidos",
          "Usuário ou senha incorretos. Caso ainda não tenha conta, cadastre-se.",
        );

      navigation.replace("pokedex", { user: authenticatedUser });
    } catch {
      Alert.alert("Erro", "Não foi possível acessar os dados de login.");
    }
  };

  const goToRegister = () => navigation.navigate("cadastro");

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.authContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../assets/pokeball.png")}
            style={styles.logo}
            accessibilityLabel="Pokébola"
          />
          <Text style={styles.title}>Pokédex</Text>
          <Text style={styles.subtitle}>Sua coleção de Pokémon</Text>
          <View style={styles.form}>
            <Field
              label="Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <Field
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button title="ENTRAR" onPress={handleLogin} textStyle={{ color: "#fff" }}/>
            <Button
              title="CADASTRAR USUÁRIO"
              onPress={goToRegister}
              secondary
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
