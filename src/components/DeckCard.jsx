import { useNavigate } from "react-router-dom";

export default function DeckCard({ deck }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/deck/${deck._id}`)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "15px",
        marginBottom: "10px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      <h3 style={{ margin: 0 }}>{deck.name}</h3>
    </div>
  );
}
