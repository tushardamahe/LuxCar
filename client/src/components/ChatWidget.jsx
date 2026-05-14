import { useState, useEffect, useRef } from "react";
import { parseQuery } from "../lib/chatParser";
import { useAppContext } from "../context/useAppContext";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Tell me what car you need.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);

  const { axios, navigate } = useAppContext();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { text: trimmed, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const parsed = parseQuery(trimmed);

    if (Object.keys(parsed).length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Try something like 'BMW under 5000'",
          sender: "bot",
        },
      ]);
      return;
    }

    setIsThinking(true);

    try {
      const { data } = await axios.post("/api/cars/search", parsed);
      await delay(400);

      if (data.cars.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            cars: data.cars,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "No cars found 😕", sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong 😕", sender: "bot" },
      ]);
    }
    setIsThinking(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg z-50 cursor-pointer"
        >
          💬
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 w-96 h-125 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">LuxCar</span>
              <span className="text-xs text-orange-100">AI Assistant</span>
            </div>
            <button
              className="cursor-pointer hover:opacity-80 transition"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-zinc-950 text-sm">
            {messages.map((msg, i) => {
              const isBotReply =
                msg.sender === "bot" &&
                i > 0 &&
                messages[i - 1]?.sender === "user";

              if (msg.cars) {
                return (
                  <div key={i} className="space-y-2">
                    {msg.cars.map((car) => (
                      <div
                        key={car._id}
                        onClick={() => navigate(`/car-details/${car._id}`)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-2 hover:scale-[1.02] hover:shadow-lg transition cursor-pointer"
                      >
                        <img
                          src={car.image}
                          alt={car.model}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <div className="mt-2 text-sm text-white font-medium">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-xs text-zinc-400">
                          ₹{car.pricePerDay} / day
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-white ml-auto"
                      : isBotReply
                        ? "bg-zinc-800 text-zinc-400 italic"
                        : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {msg.text}
                </div>
              );
            })}
            {isThinking && (
              <div className="flex flex-row gap-2 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:.1s]"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:.3s]"></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-zinc-700 flex gap-2 bg-zinc-900">
            <input
              type="text"
              placeholder="Ask for cars..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 bg-zinc-800 text-white border border-zinc-600 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-lg cursor-pointer"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
