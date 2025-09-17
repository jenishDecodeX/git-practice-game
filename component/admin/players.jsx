import { useContext, useState } from "react";
import Head from "next/head";
import players from "../../data/tournaments.json";
import { AuthContext } from "../../context/AuthContext";
import { FaGamepad, FaUsers, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

export default function Players() {
    const { user } = useContext(AuthContext);

    const [selectedGame, setSelectedGame] = useState("All");
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const normalize = (s = "") => s.trim().toLowerCase();

    const filteredPlayers =
        selectedGame === "All"
            ? players
            : players.filter((p) => normalize(p.game) === normalize(selectedGame));

    if (!user || user.role !== "admin") {
        return (
            <p className="p-6 sm:p-10 min-w-[93vw] text-center pt-32 sm:pt-40 text-2xl sm:text-3xl text-red-500">
                Access Denied. Admins only.
            </p>
        );
    }

    const winRate = (p) => {
        const m = p?.stats?.matches ?? 0;
        const w = p?.stats?.wins ?? 0;
        if (!m) return 0;
        return ((w / m) * 100).toFixed(1);
    };

    return (
        <>
            <Head>
                <title>Players</title>
            </Head>

            <div className="min-h-screen bg-[#0e0e0e] text-white p-4 sm:p-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 border-b border-gray-800 pb-4 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400">
                            🎮 Teams Players
                        </h1>
                        <span className="text-xs sm:text-sm text-gray-400">
                            Total Players: {filteredPlayers.length}
                        </span>
                    </div>

                    {/* Game Filter Dropdown */}
                    <select
                        value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}
                        className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none focus:border-indigo-500 transition-all"
                    >
                        <option value="All">All Games</option>
                        <option value="BGMI">BGMI</option>
                        <option value="PUBG Mobile">PUBG Mobile</option>
                        <option value="PUBG PC">PUBG PC</option>
                    </select>
                </div>

                {/* Player Cards Grid */}
                {filteredPlayers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredPlayers.map((p) => (
                            <div
                                key={p.id ?? p.email}
                                className="bg-[#1a1a1a] rounded-xl shadow-lg p-4 sm:p-5 hover:scale-[1.02] transition-all border border-gray-800 hover:border-indigo-500"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-1">
                                    <h2 className="text-lg sm:text-xl font-semibold">{p.name}</h2>
                                    <span className="text-xs text-gray-500">
                                        {p.registeredAt}
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                                    <p className="flex items-center gap-2 break-all">
                                        <FaEnvelope className="text-indigo-400 shrink-0" />{" "}
                                        {p.email}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaPhone className="text-green-400 shrink-0" /> {p.phone}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaGamepad className="text-yellow-400 shrink-0" /> Game:{" "}
                                        <span className="capitalize">{p.game}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaUsers className="text-pink-400 shrink-0" /> Team: {p.team}
                                    </p>
                                </div>

                                {/* View Stats Button */}
                                <button
                                    onClick={() => setSelectedPlayer(p)}
                                    className="mt-4 sm:mt-5 w-full px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-sm sm:text-base"
                                >
                                    View Stats
                                </button>

                                {/* Quick glance footer */}
                                {p?.stats && (
                                    <div className="mt-3 text-xs text-gray-400 flex justify-between">
                                        <span>Matches: {p.stats.matches}</span>
                                        <span>WR: {winRate(p)}%</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-20 text-base sm:text-lg">
                        No teams found for this game.
                    </p>
                )}
            </div>

            {/* Modal */}
            {selectedPlayer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setSelectedPlayer(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-5 sm:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">
                                    {selectedPlayer.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                                    Registered: {selectedPlayer.registeredAt}
                                </p>
                            </div>
                            <button
                                aria-label="Close"
                                onClick={() => setSelectedPlayer(null)}
                                className="p-2 rounded-lg hover:bg-white/10 text-gray-300"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-300">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-indigo-400 shrink-0" />
                                {selectedPlayer.email}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-green-400 shrink-0" />
                                {selectedPlayer.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaGamepad className="text-yellow-400 shrink-0" />
                                Game: <span className="capitalize">{selectedPlayer.game}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaUsers className="text-pink-400 shrink-0" /> Team:{" "}
                                {selectedPlayer.team}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="my-4 h-px bg-gray-800" />

                        {/* Stats */}
                        {selectedPlayer?.stats ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                                {[
                                    { label: "Matches", value: selectedPlayer.stats.matches },
                                    { label: "Wins", value: selectedPlayer.stats.wins },
                                    { label: "Kills", value: selectedPlayer.stats.kills },
                                    { label: "K/D", value: selectedPlayer.stats.kd },
                                    { label: "Win Rate", value: `${winRate(selectedPlayer)}%` },
                                    { label: "Rank", value: selectedPlayer.stats.rank },
                                ].map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-3"
                                    >
                                        <p className="text-xs text-gray-400">{stat.label}</p>
                                        <p className="text-lg sm:text-xl font-semibold">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">
                                No stats available for this player.
                            </p>
                        )}

                        {/* Footer */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setSelectedPlayer(null)}
                                className="w-full px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-sm sm:text-base"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
