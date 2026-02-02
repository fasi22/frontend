import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CardForm from "../components/CardForm";

export default function Deck() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/cards/${id}`
        );
        setCards(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch cards");
      }
    };

    fetchCards();
  }, [id]);

  const deleteCard = async (cardId) => {
    if (!window.confirm("Delete this card?")) return;

    try {
      await axios.delete(`http://localhost:7000/api/cards/${cardId}`);
      setCards((prev) => prev.filter((card) => card._id !== cardId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete card");
    }
  };

  return (
    <div className="min-h-screen bg-[#444054] p-6">
      <div className="mx-auto max-w-3xl">
        {error && (
          <p className="mb-4 rounded bg-red-500/20 px-3 py-2 text-red-300">
            {error}
          </p>
        )}

        {/* DECK CARD */}
        <div
          className="
            mb-6 rounded-md border border-gray-600 bg-gray-800/40 p-6
            [&_input]:text-black
            [&_input]:bg-white
            [&_textarea]:text-black
            [&_textarea]:bg-white
            [&_button]:border
            [&_button]:border-blue-600
            [&_button]:bg-blue-600
            [&_button]:text-white
            [&_button]:hover:bg-blue-700
          "
        >
          <h2 className="mb-4 text-2xl font-bold text-black">Deck</h2>

          <CardForm deckId={id} cards={cards} setCards={setCards} />
        </div>

        {cards.length === 0 ? (
          <p className="mt-4 text-gray-300">No cards yet.</p>
        ) : (
          <div className="mt-6 space-y-3">
            {cards.map((card) => (
              <div
                key={card._id}
                className="flex items-center justify-between rounded-md border border-gray-600 bg-gray-800/40 p-4 text-gray-100"
              >
                <div className="max-w-xl">
                  <p>
                    <span className="font-semibold">Front:</span>{" "}
                    {card.front}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Back:</span>{" "}
                    {card.back}
                  </p>
                </div>

                <button
                  onClick={() => deleteCard(card._id)}
                  className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
