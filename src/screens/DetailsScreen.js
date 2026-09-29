import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatName } from "../components/PokemonCard";
import styles from "../styles/styles";

export default function DetailsScreen({ navigation, route }) {
  const { pokemon } = route.params;
  const { abilities, base_experience, height, id, name, sprites, stats, weight } =
    pokemon;
  const officialArtwork = sprites.other?.["official-artwork"]?.front_default;
  const imageUrl = officialArtwork || sprites.front_default;
  const pokemonNumber = String(id).padStart(3, "0");
  const heightInMeters = height / 10;
  const weightInKilograms = weight / 10;
  const abilityNames = abilities
    .map(({ ability }) => formatName(ability.name))
    .join(", ");

  const goBackToPokedex = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.detailsScreen}>
        <TouchableOpacity onPress={goBackToPokedex}>
          <Text style={styles.back}>‹ Voltar para cards</Text>
        </TouchableOpacity>

        <Image source={{ uri: imageUrl }} style={styles.detailImage} />
        <Text style={styles.number}>#{pokemonNumber}</Text>
        <Text style={styles.detailTitle}>{formatName(name)}</Text>

        <Text style={styles.sectionTitle}>Informações</Text>
        <View style={styles.infoBox}>
          <Text style={styles.info}>Altura: {heightInMeters} m</Text>
          <Text style={styles.info}>Peso: {weightInKilograms} kg</Text>
          <Text style={styles.info}>Experiência base: {base_experience}</Text>
        </View>

        <Text style={styles.sectionTitle}>Status base</Text>
        {stats.map(({ stat, base_stat }) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{formatName(stat.name)}</Text>
            <Text style={styles.statValue}>{base_stat}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Habilidades</Text>
        <Text style={styles.info}>{abilityNames}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
