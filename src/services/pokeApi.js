import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = async () => {
  const response = await api.get("/pokemon", { params: { limit: 2000 } });
  return response.data.results;
};

export const getPokemonByUrl = async (url) => (await axios.get(url)).data;

export const getPokemonById = async (id) =>
  (await api.get(`/pokemon/${id}`)).data;

