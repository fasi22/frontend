import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeckCard from "../components/DeckCard";

export default function Dashboard() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/decks");
        setDecks(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load decks");
      }
    };
    fetchDecks();
  }, []);

  const createDeck = async () => {
    try {
      const name = prompt("Deck name");
      if (!name) return;

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not logged in");
        return;
      }

      const res = await axios.post("http://localhost:7000/api/decks", {
        name,
        userId: user._id,
      });

      setDecks([...decks, res.data]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create deck");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#18161D] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">
            Dashboard
          </h2>

          <div className="flex gap-3">
            <button
              onClick={createDeck}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Create Deck
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 mb-6 font-medium text-center">
            {error}
          </p>
        )}

        {/* Decks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No decks yet. Create one!
            </p>
          ) : (
            decks.map((deck) => (
              <div
                key={deck._id}
                className="transition duration-300
                           hover:-translate-y-1
                           hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]"
              >
                <DeckCard deck={deck} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
