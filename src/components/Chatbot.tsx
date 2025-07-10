"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const BOT_AVATAR_URL =
  "https://res.cloudinary.com/dq3wkbgts/image/upload/v1751987789/maa-princess_nepjxk.jpg";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialMessage, setHasInitialMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasInitialMessage) {
      setIsTyping(true);
      // Simulate typing delay for more realistic feel
      setTimeout(() => {
        setMessages([
          {
            role: "model",
            text: "Hi there! I'm Naeku, your support assistant. How can I help you today? 😊",
          },
        ]);
        setIsTyping(false);
        setHasInitialMessage(true);
      }, 1000);
    }
  }, [isOpen, hasInitialMessage]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() === "") return;

    const userMessage: ChatMessage = { role: "user", text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const modelResponse: ChatMessage = { role: "model", text: data.response };
      setMessages((prevMessages) => [...prevMessages, modelResponse]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const chatWindowVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.2 } },
  };

  const messageVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Online indicator component
  const OnlineIndicator = ({ size = "w-3 h-3" }) => (
    <div
      className={`${size} absolute bottom-0 right-0 bg-green-500 rounded-full border-2 border-white`}
    ></div>
  );

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 hover:scale-110 transition-transform duration-300 z-50 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="bg-[var(--color-maasai-red)] text-black p-4 rounded-full" size={24} />
        ) : (
          <div className="relative">
            <img
              src={BOT_AVATAR_URL}
              alt="Bot Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Online indicator on toggle button */}
            <OnlineIndicator size="w-3 h-3" />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-[450px] bg-white rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-200"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Chat Header */}
            <div className="bg-[var(--color-maasai-red)] text-white p-4 rounded-t-lg flex items-center justify-between shadow-md">
              <div className="flex items-center">
                {/* Bot Avatar in Header */}
                <div className="relative">
                  <img
                    src={BOT_AVATAR_URL}
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full mr-3 object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Naeku</h3>
                  <p className="text-xs text-white/80">Online • Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar next to Model messages with online indicator */}
                  {msg.role === "model" && (
                    <div className="relative mr-2 flex-shrink-0">
                      <img
                        src={BOT_AVATAR_URL}
                        alt="Bot Avatar"
                        className="w-7 h-7 rounded-full object-cover self-end"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                      msg.role === "user"
                        ? "bg-[var(--color-maasai-red)] text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {/* User Icon for User messages */}
                      {msg.role === "user" && (
                        <User size={14} className="mr-1 text-white" />
                      )}
                      <span className="font-semibold text-xs">
                        {msg.role === "user" ? "You" : "Naeku"}
                      </span>
                      {msg.role === "model" && (
                        <span className="ml-1 text-xs text-gray-500">
                          • now
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  {/* Bot Avatar for typing indicator with online indicator */}
                  <div className="relative mr-2 flex-shrink-0">
                    <img
                      src={BOT_AVATAR_URL}
                      alt="Bot Avatar"
                      className="w-7 h-7 rounded-full object-cover self-end"
                    />
                  </div>
                  <div className="max-w-[75%] p-3 rounded-lg bg-white text-gray-800 rounded-bl-none border border-gray-100 flex items-center">
                    <span className="font-semibold text-xs mr-2">
                      Naeku is typing
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-maasai-red)] focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 p-2 bg-[var(--color-maasai-red)] text-white rounded-full hover:bg-[var(--color-maasai-accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isTyping || input.trim() === ""}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
