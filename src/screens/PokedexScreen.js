import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import PokemonCard from "../components/PokemonCard";
import TeamScreen from "./TeamScreen";
import { getPokemonByUrl, getPokemonList } from "../services/pokeApi";
import {
  deleteTeam,
  getPreferences,
  getTeam,
  savePreferences,
  saveTeam,
} from "../services/storage";
import styles from "../styles/styles";

const PAGE_SIZE = 20;
const TEAM_LIMIT = 6;
const POKEDEX_TAB = "pokedex";
const TEAM_TAB = "team";

export default function PokedexScreen({ navigation, route }) {
  const currentUser = route.params.user;
  const [pokemonList, setPokemonList] = useState([]);
  const [cards, setCards] = useState([]);
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(POKEDEX_TAB);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);

  const userDisplayName = currentUser.name || currentUser.username;
  const openDetails = (pokemon) => navigation.navigate("details", { pokemon });
  const logout = () => navigation.replace("login");

  useEffect(() => {
    const loadPokedex = async () => {
      try {
        const [list, preferences, savedTeam] = await Promise.all([
          getPokemonList(),
          getPreferences(currentUser.username),
          getTeam(currentUser.username),
        ]);

        setPokemonList(list);
        setSearch(preferences.lastSearch || "");
        setTeam(savedTeam);
      } catch {
        Alert.alert(
          "Erro",
          "Não foi possível carregar a Pokédex. Verifique sua internet.",
        );
      } finally {
        setLoadingList(false);
      }
    };

    loadPokedex();
  }, [currentUser.username]);

  const filteredPokemon = useMemo(() => {
    const term = search.trim().toLowerCase();

    return term
      ? pokemonList.filter((pokemon) => pokemon.name.includes(term))
      : pokemonList;
  }, [pokemonList, search]);

  const firstPokemonIndex = page * PAGE_SIZE;
  const currentPagePokemon = filteredPokemon.slice(
    firstPokemonIndex,
    firstPokemonIndex + PAGE_SIZE,
  );
  const currentPageKey = currentPagePokemon
    .map((pokemon) => pokemon.name)
    .join(",");
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPokemon.length / PAGE_SIZE),
  );

  useEffect(() => {
    if (!currentPagePokemon.length) {
      setCards([]);
      return undefined;
    }

    let isScreenActive = true;

    const loadCurrentPageCards = async () => {
      setLoadingCards(true);

      try {
        const pokemonCards = await Promise.all(
          currentPagePokemon.map((pokemon) => getPokemonByUrl(pokemon.url)),
        );

        if (isScreenActive) setCards(pokemonCards);
      } catch {
        if (isScreenActive)
          Alert.alert(
            "Erro",
            "Não foi possível carregar os cards desta página.",
          );
      } finally {
        if (isScreenActive) setLoadingCards(false);
      }
    };

    loadCurrentPageCards();

    return () => {
      isScreenActive = false;
    };
  }, [currentPageKey]);

  const updateSearch = (value) => {
    setSearch(value);
    setPage(0);
    savePreferences(currentUser.username, { lastSearch: value });
  };

  const goToPreviousPage = () =>
    setPage((currentPage) => Math.max(0, currentPage - 1));
  const goToNextPage = () =>
    setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1));

  const addPokemonToTeam = async (pokemon) => {
    if (team.some((teamPokemon) => teamPokemon.id === pokemon.id)) {
      Alert.alert("Pokémon já adicionado", "Este Pokémon já está no seu time.");
      return;
    }

    if (team.length >= TEAM_LIMIT) {
      Alert.alert("Time completo", "Seu time pode ter no máximo seis Pokémon.");
      return;
    }

    const updatedTeam = [...team, pokemon];
    setTeam(updatedTeam);

    try {
      await saveTeam(currentUser.username, updatedTeam);
    } catch {
      setTeam(team);
      Alert.alert("Erro", "Não foi possível salvar o Pokémon no time.");
    }
  };

  const removePokemonFromTeam = async (pokemonId) => {
    const updatedTeam = team.filter((pokemon) => pokemon.id !== pokemonId);
    setTeam(updatedTeam);

    try {
      await saveTeam(currentUser.username, updatedTeam);
    } catch {
      setTeam(team);
      Alert.alert("Erro", "Não foi possível atualizar o seu time.");
    }
  };

  const clearTeam = () =>
    Alert.alert("Excluir time", "Deseja remover todos os Pokémon do time?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "EXCLUIR",
        style: "destructive",
        onPress: async () => {
          setTeam([]);

          try {
            await deleteTeam(currentUser.username);
          } catch {
            setTeam(team);
            Alert.alert("Erro", "Não foi possível excluir o seu time.");
          }
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Pokédex</Text>
          <Text style={styles.headerText}>Olá, {userDisplayName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === POKEDEX_TAB && styles.activeTab]}
            onPress={() => setTab(POKEDEX_TAB)}
          >
            <Text
              style={[
                styles.tabText,
                tab === POKEDEX_TAB && styles.activeTabText,
              ]}
            >
              POKÉDEX
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === TEAM_TAB && styles.activeTab]}
            onPress={() => setTab(TEAM_TAB)}
          >
            <Text
              style={[styles.tabText, tab === TEAM_TAB && styles.activeTabText]}
            >
              MEU TIME
            </Text>
          </TouchableOpacity>
        </View>
        {tab === TEAM_TAB ? (
          <TeamScreen
            team={team}
            onDetails={openDetails}
            onRemovePokemon={removePokemonFromTeam}
            onClearTeam={clearTeam}
          />
        ) : (
          <>
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={updateSearch}
                placeholder="Pesquisar Pokémon por nome"
                placeholderTextColor="#9aa3b2"
              />
            </View>
            {loadingList ? (
              <ActivityIndicator
                size="large"
                color="#e3350d"
                style={styles.loader}
              />
            ) : (
              <FlatList
                data={cards}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <PokemonCard
                    pokemon={item}
                    onDetails={openDetails}
                    onAddToTeam={addPokemonToTeam}
                    isInTeam={team.some((pokemon) => pokemon.id === item.id)}
                    teamIsFull={team.length >= TEAM_LIMIT}
                  />
                )}
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                  loadingCards ? (
                    <ActivityIndicator color="#e3350d" />
                  ) : (
                    <Text style={styles.empty}>Nenhum Pokémon encontrado.</Text>
                  )
                }
                ListFooterComponent={
                  <View style={styles.pagination}>
                    <Button
                      title="ANTERIOR"
                      secondary
                      compact
                      onPress={goToPreviousPage}
                    />
                    <Text style={styles.pageText}>
                      Página {page + 1} de {totalPages}
                    </Text>
                    <Button
                      title="PRÓXIMA"
                      compact
                      onPress={goToNextPage}
                    />
                  </View>
                }
              />
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
