import { useState } from "react";
import axios from "axios";

export default function CardForm({ deckId, cards, setCards }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [error, setError] = useState("");

  const addCard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not logged in");
        return;
      }

      if (!front || !back) {
        setError("Both front and back are required");
        return;
      }

      const res = await axios.post(`http://localhost:7000/api/cards/${deckId}`, {
        front,
        back,
        userId: user._id,
      });

      setCards([...cards, res.data]);
      setFront(""); // clear input
      setBack("");  // clear input
      setError(""); // clear error
    } catch (err) {
      console.error("Error adding card:", err.response || err);
      setError(err.response?.data?.message || "Failed to add card");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <input
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <button onClick={addCard} style={{ padding: "8px 12px" }}>
        Add Card
      </button>
    </div>
  );
}
