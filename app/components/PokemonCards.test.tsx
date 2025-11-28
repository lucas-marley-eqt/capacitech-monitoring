import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCards from "./PokemonCards"; // ajuste o caminho
import React from "react";

// Necessário para lidar com debounce e timers 
jest.useFakeTimers();

// Mock global.fetch atualizado para 2025
global.fetch = jest.fn();

describe("PokemonCards Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza o input de busca", () => {
    render(<PokemonCards />);
    expect(
      screen.getByPlaceholderText("Search for pokemons (server-side)...")
    ).toBeInTheDocument();
  });

  test("exibe loading ao buscar pokemons", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(<PokemonCards />);

    const input = screen.getByPlaceholderText(
      "Search for pokemons (server-side)..."
    );

    // Digita no input → deve acionar debounce
    fireEvent.change(input, { target: { value: "pikachu" } });

    // Avança o debounce de 600ms
    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(
      await screen.findByText(/Searching in the backend/i)
    ).toBeInTheDocument();
  });

  test("renderiza cards retornados pelo backend", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        ],
      }),
    });

    render(<PokemonCards />);

    const input = screen.getByPlaceholderText(
      "Search for pokemons (server-side)..."
    );
    fireEvent.change(input, { target: { value: "bul" } });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Charmander")).toBeInTheDocument();
  });

  test("mostra mensagem quando nenhum Pokémon é encontrado", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(<PokemonCards />);

    const input = screen.getByPlaceholderText(
      "Search for pokemons (server-side)..."
    );

    fireEvent.change(input, { target: { value: "aaaa" } });

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(
      await screen.findByText("No Pokémon found.")
    ).toBeInTheDocument();
  });
});