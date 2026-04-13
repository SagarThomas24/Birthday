import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function Party({ name }) {
  const [blown, setBlown] = useState(false);
  const [listening, setListening] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // 🔒 Prevent multiple triggers
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!listening) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      mic.connect(analyser);
      analyser.fftSize = 256;

      const data = new Uint8Array(analyser.frequencyBinCount);

      const detectBlow = () => {
        analyser.getByteFrequencyData(data);
        const volume = data.reduce((a, b) => a + b) / data.length;

        // ✅ ONE-TIME trigger
        if (volume > 45 && !hasTriggered.current) {
          hasTriggered.current = true;
          triggerParty();
        }

        requestAnimationFrame(detectBlow);
      };

      detectBlow();
    });
  }, [listening]);

  const triggerParty = () => {
    setBlown(true);

    // 🎵 Music
    const audio = new Audio("/party.mp3");
    audio.play();

    // 🎉 Confetti
    confetti({
      particleCount: 300,
      spread: 120,
    });

    // ⏳ Clean timed alerts (spaced properly)
    setTimeout(() => {
      alert("🎉 HAPPY BIRTHDAY!!!! 🎉");
    },6000);

    setTimeout(() => {
      alert("Dont make fun of me plss :]]]]");
    }, 7000);

    setTimeout(() => {
      alert("Hope you haave a great day");
    }, 8000);

    setTimeout(() => {
      alert("Hope this year brings you everything you dream of ✨\nHappy 22nd Birthday!!");
    }, 9000);

    // 💌 Popup after alerts
    setTimeout(() => {
      setShowMessage(true);
    }, 9000);
  };

  return (
    <div className="container">
      <h1>Happy Birthday {name} 🎉</h1>

      {/* 🎂 Cake */}
      <div className="cake">
        🎂
        {!blown && <div className="flame">🔥</div>}
        <div className="age">22</div>
      </div>

      {!blown ? (
        <>
          <p className="hint">
            (Click the button and blow into your mic 🎤)
          </p>

          <button onClick={() => setListening(true)}>
            Blow the Candle 🎤
          </button>
        </>
      ) : (
        <>
          {/* 🎉 Banner */}
          <h2 className="banner">🎉 HAPPY BIRTHDAY 🎉</h2>

          {/* 🎈 Balloons */}
          <div className="balloons">
            🎈 🎈 🎈 🎈 🎈
          </div>

          {/* 🐻 Dancing Animals */}
          <div className="animals">
            <img src="/dance1.gif" />
            <img src="/dance2.gif" />
            <img src="/dance3.gif" />
            <img src="/dance4.gif" />
            <img src="/dance5.gif" />
          </div>
        </>
      )}

      {/* 💌 POPUP MESSAGE */}
      {showMessage && (
        <div className="popup">
          <div className="popup-content">
            <h2>💖 A Message For You 💖</h2>
            <p>
              You make life brighter, funnier, and so much more special 💖 <br />
              Hope this year brings you everything you dream of ✨ <br />
              Happy 22nd Birthday!!
            </p>

            <button onClick={() => setShowMessage(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}