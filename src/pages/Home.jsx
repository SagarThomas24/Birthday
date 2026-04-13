import { useState } from "react";

export default function Home({ setEntered, setName }) {
  const [inputName, setInputName] = useState("");
  const [code, setCode] = useState("");

  const handleEnter = () => {
    // Check empty fields
    if (!inputName || !code) {
      alert("Fill everything 👀");
      return;
    }

    // Check code
    if (code !== "1496") {
      alert("Access Denied 🚫 (Wrong last 4 digits)");
      return;
    }

    // If correct
    setName(inputName);
    setEntered(true);
  };

  return (
    <div className="container">
      <h1>🎂 Enter the Birthday Room</h1>

      {/* Name */}
      <input
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />

      {/* Last 4 digits */}
      <input
        placeholder="Enter last 4 digits of your ID 🔐"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleEnter}>Enter 🚪</button>
    </div>
  );
}