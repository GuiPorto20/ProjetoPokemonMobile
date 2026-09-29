import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";

export const formatName = (name) =>
  name.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function PokemonCard({
  pokemon,
  onDetails,
  onAddToTeam,
  onRemoveFromTeam,
  isInTeam = false,
  teamIsFull = false,
}) {
  const { id, name, sprites, stats, types } = pokemon;
  const officialArtwork = sprites.other?.["official-artwork"]?.front_default;
  const imageUrl = officialArtwork || sprites.front_default;
  const pokemonNumber = String(id).padStart(3, "0");
  const healthPoints = stats[0]?.base_stat ?? 0;
  const addToTeamLabel = isInTeam
    ? "JÁ ESTÁ NO TIME"
    : teamIsFull
      ? "TIME COMPLETO"
      : "ADICIONAR AO TIME";
  const isAddToTeamDisabled = isInTeam || teamIsFull;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.number}>#{pokemonNumber}</Text>
        <Text style={styles.cardTitle}>{formatName(name)}</Text>

        <View style={styles.types}>
          {types.map(({ type }) => (
            <Text key={type.name} style={styles.type}>
              {formatName(type.name)}
            </Text>
          ))}
        </View>

        <Text style={styles.status}>Status: {healthPoints} HP</Text>

        <TouchableOpacity
          style={styles.cardAction}
          onPress={() => onDetails(pokemon)}
        >
          <Text style={styles.details}>VER MAIS DETALHES</Text>
        </TouchableOpacity>

        {onAddToTeam && (
          <TouchableOpacity
            style={styles.teamCardAction}
            onPress={() => onAddToTeam(pokemon)}
            disabled={isAddToTeamDisabled}
          >
            <Text
              style={[
                styles.teamCardActionText,
                isAddToTeamDisabled && styles.disabledTeamCardActionText,
              ]}
            >
              {addToTeamLabel}
            </Text>
          </TouchableOpacity>
        )}

        {onRemoveFromTeam && (
          <TouchableOpacity
            style={styles.removeFromTeamAction}
            onPress={() => onRemoveFromTeam(pokemon.id)}
          >
            <Text style={styles.removeFromTeamText}>REMOVER DO TIME</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
