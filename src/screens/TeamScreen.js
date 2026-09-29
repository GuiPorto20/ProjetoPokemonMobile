import { FlatList, Text, View } from "react-native";
import Button from "../components/Button";
import PokemonCard from "../components/PokemonCard";
import styles from "../styles/styles";

export default function TeamScreen({
  team,
  onDetails,
  onRemovePokemon,
  onClearTeam,
}) {
  return (
    <View style={styles.teamArea}>
      <View style={styles.teamIntro}>
        <Text style={styles.teamTitle}>Meu time ({team.length}/6)</Text>
        <Text style={styles.headerText}>
          Escolha seus Pokémon na aba Pokédex. O limite é de seis Pokémon.
        </Text>
      </View>
      <View style={styles.teamActions}>
        <Button
          title="EXCLUIR"
          secondary
          onPress={onClearTeam}
          style={styles.teamButton}
        />
      </View>
      <FlatList
        data={team}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onDetails={onDetails}
            onRemoveFromTeam={onRemovePokemon}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Seu time está vazio. Escolha Pokémon na aba Pokédex.
          </Text>
        }
      />
    </View>
  );
}
