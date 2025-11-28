'use client'
import PokemonCards from "../components/PokemonCards"; 
import { useAuth } from "../context/AuthProvider";
import LoginPage from "../components/LoginPage";

export default function HomePage() {

const { user, logOut } = useAuth();

  if(!user){
    return (
      <LoginPage />
    );
  }

return (
    <div className="min-h-screen w-full bg-neutral-900 text-white px-6 py-10">
      <header className="flex items-center gap-3 mb-12">
        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
        <span className="font-semibold text-lg">Poke Explorer</span>
      </header>

      {/* Título Estático */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Explore the Dex</h1>
        <p className="text-neutral-400 max-w-xl mx-auto">
          Enter a search term to begin your journey. Fetched directly from our Next.js Backend.
        </p>
      </div>

      <PokemonCards />
    </div>
  );
}