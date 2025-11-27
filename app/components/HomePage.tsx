import React from "react";
import { Search } from "lucide-react";


export default function HomePage() {
const cards = [
{
type: "Character",
title: "Luke Skywalker",
info: ["Birth Year: 19BBY", "Homeworld: Tatooine"],
badgeColor: "bg-green-700",
},
{
type: "Planet",
title: "Tatooine",
info: ["Climate: Arid", "Population: 200000"],
badgeColor: "bg-amber-700",
},
{
type: "Starship",
title: "X-wing",
info: ["Model: T-65 X-wing", "Manufacturer: Incom Corporation"],
badgeColor: "bg-indigo-700",
},
{
type: "Character",
title: "Darth Vader",
info: ["Birth Year: 41.9BBY", "Homeworld: Tatooine"],
badgeColor: "bg-green-700",
},
{
type: "Starship",
title: "Millennium Falcon",
info: ["Model: YT-1300 light freighter", "Manufacturer: Corellian Engineering"],
badgeColor: "bg-indigo-700",
},
{
type: "Planet",
title: "Hoth",
info: ["Climate: Frozen", "Population: unknown"],
badgeColor: "bg-amber-700",
},
];


return (
<div className="min-h-screen w-full bg-neutral-900 text-white px-6 py-10">
    <header className="flex items-center gap-3 mb-12">
        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
        <span className="font-semibold text-lg">SWAPI Explorer</span>
    </header>


<div className="text-center mb-10">
    <h1 className="text-4xl font-bold mb-3">Explore the Galaxy</h1>
    <p className="text-neutral-400 max-w-xl mx-auto">
    Enter a search term to begin your journey. Look for characters, planets, starships, and
    more from the Star Wars universe.
    </p>
</div>


<div className="max-w-3xl mx-auto mb-12">
    <div className="flex items-center bg-neutral-800 rounded-xl px-4 py-3 border border-neutral-700">
        <Search className="w-5 h-5 text-neutral-500" />
        <input
        type="text"
        placeholder="Search for characters, planets, starships..."
        className="grow bg-transparent outline-none ml-3 text-neutral-300"
        />
    </div>
</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
            <div
            key={index}
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 shadow-md">
                <span className={`text-xs px-3 py-1 rounded-full ${card.badgeColor} inline-block mb-4`}>
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
    </div>
</div>
)
}