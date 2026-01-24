import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeckCard from "../components/DeckCard";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  primaryBtn: {
    backgroundColor: "#4f46e5",
    color: "white",
    marginRight: "10px",
  },
  dangerBtn: {
    backgroundColor: "#dc2626",
    color: "white",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  deckRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
  },
  deckName: {
    cursor: "pointer",
    margin: 0,
  },
};

export default function Dashboard() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/decks");
      setDecks(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load decks");
    }
  };

  const createDeck = async () => {
    const name = prompt("Enter deck name");
    if (!name) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not logged in");

      const res = await axios.post("http://localhost:7000/api/decks", {
        name,
        userId: user._id,
      });

      setDecks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const deleteDeck = async (deckId) => {
    if (!window.confirm("Delete this deck?")) return;

    try {
      await axios.delete(`http://localhost:7000/api/decks/${deckId}`);
      setDecks((prev) => prev.filter((deck) => deck._id !== deckId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete deck");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Dashboard</h2>
        <div>
          <button
            onClick={createDeck}
            style={{ ...styles.button, ...styles.primaryBtn }}
          >
            + Create Deck
          </button>
          <button
            onClick={logout}
            style={{ ...styles.button, ...styles.dangerBtn }}
          >
            Logout
          </button>
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {decks.length === 0 ? (
        <p>No decks yet. Create one!</p>
      ) : (
        decks.map((deck) => (
          <div key={deck._id} style={styles.deckRow}>
            <h3
              style={styles.deckName}
              onClick={() => navigate(`/deck/${deck._id}`)}
            >
              {deck.name}
            </h3>
            <button
              onClick={() => deleteDeck(deck._id)}
              style={{ ...styles.button, ...styles.dangerBtn }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
