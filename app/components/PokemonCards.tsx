'use client';
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

// Tipagens
type PokemonAPI = {
  name: string;
  url: string;
}

type CardData = {
  type: string;
  title: string;
  info: string[];
  badgeColor: string;
}

export default function PokemonCards() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Função de busca
  const fetchPokemons = async (term: string) => {
    setLoading(true);
    try {
      // Chama nosso backend
      const endpoint = term 
        ? `/api/pokeapi?name=${term}` 
        : '/api/pokeapi';

      const response = await fetch(endpoint, { cache: 'no-store' });
      
      if (!response.ok) throw new Error("Falha ao carregar");

      const data = await response.json();
      
      // Transforma dados da API no formato do Card
      const mappedCards: CardData[] = data.results.map((pokemon: PokemonAPI, index: number) => ({
        type: "Pokemon",
        title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        info: [
            `ID: ${pokemon.url.split('/')[6] || 'N/A'}`, 
            `Source: PokeAPI`
        ],
        badgeColor: index % 2 === 0 ? "bg-green-700" : "bg-amber-700",
      }));

      setCards(mappedCards);
    } catch (error) {
      console.error(error);
      setCards([]); 
    } finally {
      setLoading(false);
    }
  };

  // Debounce: espera parar de digitar
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPokemons(searchTerm);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center bg-neutral-800 rounded-xl px-4 py-3 border border-neutral-700">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Search for pokemons (server-side)..."
            className="grow bg-transparent outline-none ml-3 text-neutral-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {loading && (
            <p className="text-neutral-400 col-span-full text-center animate-pulse">
                Searching in the backend...
            </p>
        )}

        {!loading && cards.length > 0 && cards.map((card, index) => (
          <div
            key={index}
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 shadow-md"
          >
            <span
              className={`text-xs px-3 py-1 rounded-full ${card.badgeColor} inline-block mb-4`}
            >
              {card.type}
            </span>
            <h2 className="text-xl font-semibold mb-3">{card.title}</h2>
            <ul className="text-neutral-400 text-sm space-y-1">
              {card.info.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        {!loading && cards.length === 0 && (
            <div className="col-span-full text-center py-10">
                <p className="text-neutral-500 text-lg">No Pokémon found.</p>
                <p className="text-neutral-600 text-sm">Try searching for another name.</p>
            </div>
        )}
      </div>
    </>
  );
}