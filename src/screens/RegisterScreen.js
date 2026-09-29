import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Field from "../components/Field";
import { getUsers, saveUser } from "../services/storage";
import styles from "../styles/styles";
const initialForm = {
  phone: "",
  cpf: "",
  email: "",
  course: "",
  username: "",
  password: "",
};

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (fieldName) => (value) => {
    setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
  };

  const handleSave = async () => {
    if (Object.values(form).some((value) => !value.trim()))
      return Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os dados do cadastro.",
      );

    const registeredUsers = await getUsers();
    const username = form.username.trim();
    const usernameAlreadyExists = registeredUsers.some(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );

    if (usernameAlreadyExists)
      return Alert.alert(
        "Usuário indisponível",
        "Escolha outro nome de usuário para o login.",
      );

    await saveUser({ ...form, username });
    Alert.alert("Cadastro realizado", "Seus dados foram salvos localmente.");
    navigation.goBack();
  };

  const goBackToLogin = () => navigation.goBack();

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
          <Text style={styles.title}>Cadastrar usuário</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para acessar a Pokédex
          </Text>
          <View style={styles.form}>
            <Field
              label="Usuário"
              value={form.username}
              onChangeText={updateField("username")}
              autoCapitalize="none"
            />
            <Field
              label="Telefone"
              value={form.phone}
              onChangeText={updateField("phone")}
              keyboardType="phone-pad"
            />
            <Field
              label="CPF"
              value={form.cpf}
              onChangeText={updateField("cpf")}
              keyboardType="numeric"
            />
            <Field
              label="E-mail"
              value={form.email}
              onChangeText={updateField("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Field
              label="Curso"
              value={form.course}
              onChangeText={updateField("course")}
            />
            <Field
              label="Senha para login"
              value={form.password}
              onChangeText={updateField("password")}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button title="SALVAR" onPress={handleSave} />
            <Button title="VOLTAR" onPress={goBackToLogin} secondary />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
