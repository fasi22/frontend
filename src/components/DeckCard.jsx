import { useNavigate } from "react-router-dom";

export default function DeckCard({ deck }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/deck/${deck._id}`)}
      className="
        bg-transparent
        border border-white/20
        rounded-lg
        p-4
        cursor-pointer

        transition-all duration-300
        hover:border-white
        hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]
        hover:-translate-y-1

        active:scale-[0.98]
        focus:outline-none
      "
    >
      <h3 className="text-white font-semibold text-lg">
        {deck.name}
      </h3>
    </div>
  );
}
