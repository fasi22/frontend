import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function Study() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  // Fetch cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/cards/${id}`);
        setCards(res.data);
      } catch (err) {
        console.error("Error fetching cards:", err.response || err);
        setError(err.response?.data?.message || "Failed to load cards");
      }
    };

    fetchCards();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cards.length) return <p>No cards in this deck.</p>;
  if (index >= cards.length) return <p>You've completed all cards!</p>;

  const card = cards[index];

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>Study</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "20px",
          marginBottom: "20px",
          fontSize: "1.2rem",
          minHeight: "100px",
        }}
      >
        {!show ? <InlineMath math={card.front} /> : <InlineMath math={card.back} />}
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          style={{ padding: "8px 12px", marginRight: "10px" }}
        >
          Show Answer
        </button>
      ) : (
        <button
          onClick={() => {
            setShow(false);
            setIndex((i) => i + 1);
          }}
          style={{ padding: "8px 12px" }}
        >
          Next
        </button>
      )}

      <p>
        Card {index + 1} of {cards.length}
      </p>
    </div>
  );
}
