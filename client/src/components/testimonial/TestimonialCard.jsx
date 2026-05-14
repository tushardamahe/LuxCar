const TestimonialCard = ({ card }) => (
  <div
    className="p-5 rounded-xl mx-4 w-72 shrink-0 
    bg-[#1c1c1e]/80 backdrop-blur-md 
    border border-neutral-800 
    shadow-lg shadow-black/30 
    hover:shadow-[0_0_20px_rgba(254,93,0,0.2)]
    transition-all duration-300"
  >
    <div className="flex gap-3 items-center">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={card.image}
        alt="User"
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="text-white font-medium">{card.name}</p>

          <svg
            className="mt-0.5 fill-primary"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72...z" />
          </svg>
        </div>

        <span className="text-xs text-neutral-400">{card.handle}</span>
      </div>
    </div>

    <p className="text-sm py-4 text-neutral-200 leading-relaxed">
      <span className="text-primary">“</span>
      {card.review}
      <span className="text-primary">”</span>
    </p>
  </div>
);

export default TestimonialCard;
