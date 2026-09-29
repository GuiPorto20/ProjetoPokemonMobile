import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PokedexScreen from "./screens/PokedexScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createStackNavigator();
const headerOptions = {
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#0095ff" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "800" },
};

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "POKÉDEX", headerLeft: () => null }}
      />
      <Stack.Screen
        name="cadastro"
        component={RegisterScreen}
        options={{ title: "CADASTRAR USUÁRIO" }}
      />
      <Stack.Screen
        name="pokedex"
        component={PokedexScreen}
        options={{ title: "POKÉDEX", headerLeft: () => null }}
      />
      <Stack.Screen
        name="details"
        component={DetailsScreen}
        options={{ title: "DETALHES" }}
      />
    </Stack.Navigator>
  );
}
