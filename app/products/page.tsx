'use client'

import { useAuth } from "../context/AuthProvider";

export default function Products() {
    const { user, logOut } = useAuth();

    return(<div>
        <p>Hello world</p>
        <button
          className="
            flex items-center gap-3 bg-blue-600 hover:bg-blue-700
            text-white font-medium px-6 py-3 rounded-lg shadow-md
            transition
          "
          onClick={logOut}>
            sign out ----
        </button>
    </div>)
}