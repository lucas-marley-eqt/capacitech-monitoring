export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b1220] text-white px-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Pokemon Dex</h1>

        <p className="text-neutral-400 max-w-md mb-8">
          Sign in to begin your journey through the Pokemons.
        </p>

        <button
          className="
            flex items-center gap-3 bg-blue-600 hover:bg-blue-700
            text-white font-medium px-6 py-3 rounded-lg shadow-md
            transition
          "
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          Login with Google
        </button>
      </div>

      <footer className="absolute bottom-10 flex flex-col items-center text-sm text-neutral-500 space-y-4">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-neutral-300">Terms of Use</a>
          <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
        </div>
        <p>© 2025 Mentoria capacitech</p>
      </footer>
    </main>
  );
}