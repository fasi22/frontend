import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CardForm from "../components/CardForm";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
  },
  cardText: {
    maxWidth: "650px",
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default function Deck() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCards();
  }, [id]);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/cards/${id}`);
      setCards(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch cards");
    }
  };

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
    <div style={styles.container}>
      <h2 style={styles.title}>Deck</h2>

      {error && <p style={styles.error}>{error}</p>}

      <CardForm deckId={id} cards={cards} setCards={setCards} />

      {cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        cards.map((card) => (
          <div key={card._id} style={styles.cardRow}>
            <div style={styles.cardText}>
              <strong>Front:</strong> {card.front}
              <br />
              <strong>Back:</strong> {card.back}
            </div>

            <button
              onClick={() => deleteCard(card._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
