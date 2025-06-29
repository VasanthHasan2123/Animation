import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cardImg from "./assets/card.png";
import mobileImg from "./assets/mobile.png";
import "./App.css"; 

const styles = `
  body {
    margin: 0;
    background: black;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .App {
    color: white;
    min-height: 100vh;
    background: radial-gradient(circle at top, #013f3f, #000000);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .App::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 179, 179, 0.2), rgba(0, 255, 255, 0.1));
    animation: pulseGlow 3s ease-in-out infinite;
    z-index: -1;
  }
  .particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.7;
    pointer-events: none;
    animation: floatParticle 25s linear infinite;
  }
  @keyframes floatParticle {
    0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    100% { transform: translate(var(--x), var(--y)) scale(1.2); opacity: 0; }
  }
  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 15px rgba(0,179,179,.8), 0 0 25px rgba(0,179,179,.6); }
    50% { text-shadow: 0 0 25px rgba(0,179,179,1), 0 0 35px rgba(0,179,179,.8); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
  @keyframes rotate360 {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }
  @keyframes rotate360reverse {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(-360deg); }
  }

  .first-headline {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-shadow: 0 0 10px rgba(0, 179, 179, 0.5);
    font-size: clamp(24px, 6vw, 52px);
    line-height: 1.2;
    margin: 0;
  }
  .highlight {
    color: #00b3b3;
    animation: glowPulse 2s ease-in-out infinite;
  }
  .subtext {
    font-family: 'Urbanist', sans-serif;
    font-weight: 400;
    color: #ccc;
    max-width: 800px;
    margin-top: 1rem;
    padding: 0 1rem;
    font-size: clamp(14px, 3vw, 22px);
    line-height: 1.5;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    position: relative;
  }
  .card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    position: relative;
  }
  .card-img {
    width: 100%;
    max-width: 220px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0,179,179,0.5), 0 0 25px rgba(0,179,179,0.3);
    transition: transform 0.3s ease;
  }
  .card-img:hover {
    box-shadow: 0 0 25px rgba(0,179,179,0.8), 0 0 35px rgba(0,179,179,0.5);
  }
  .rotate-continuous {
    animation: rotate360 14s linear infinite;
  }
  .rotate-continuous-reverse {
    animation: rotate360reverse 16s linear infinite;
  }
  .line {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, #00b3b3, #00ffff);
    transform-origin: left;
  }
  .label {
    font-family: 'Urbanist', sans-serif;
    font-size: clamp(10px, 2vw, 14px);
    color: #ccc;
    text-shadow: 0 0 10px rgba(0,179,179,0.5);
    line-height: 1.4;
    position: absolute;
  }
  .upi-line { top: 20%; left: 100%; width: 100px; }
  .fingerprint-line { bottom: 20%; left: 100%; width: 100px; }
  .snap-line { top: 50%; right: 100%; width: 100px; }
  .upi-label { top: 18%; left: calc(100% + 110px); }
  .fingerprint-label { bottom: 18%; left: calc(100% + 110px); }
  .snap-label { top: 46%; right: calc(100% + 110px); text-align: right; }


  @media (max-width: 768px) {
    .cards-container {
      flex-direction: column;
      gap: 1.5rem;
    }
    .card-img {
      max-width: 160px;
      animation: rotate360 10s linear infinite;
    }
    .rotate-continuous-reverse {
      animation: rotate360reverse 10s linear infinite;
    }
    .upi-label, .fingerprint-label {
      left: calc(100% + 60px);
    }
    .snap-label {
      right: calc(100% + 60px);
    }
    .line {
      width: 50px !important;
    }
  }

  @media (min-width: 1024px) {
    .card-img {
      max-width: 300px;
      animation: rotate360 18s linear infinite;
    }
    .rotate-continuous-reverse {
      animation: rotate360reverse 20s linear infinite;
    }
    .upi-line, .fingerprint-line, .snap-line {
      width: 400px;
    }
    .upi-label, .fingerprint-label {
      left: calc(100% + 410px);
    }
    .snap-label {
      right: calc(100% + 410px);
    }
  }
`;

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderParticles = () => {
    const particles = Array.from({ length: 100 }, (_, i) => {
      const size = Math.random() * 3 + 1;
      const x = `${Math.random() * 2000 - 1000}px`;
      const y = `${Math.random() * 2000 - 1000}px`;
      const duration = Math.random() * 20 + 10;
      return (
        <div
          key={i}
          className="particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${duration}s`,
            "--x": x,
            "--y": y,
          }}
        />
      );
    });
    return particles;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="App">
        {renderParticles()}

        <AnimatePresence>
          {showIntro ? (
            <motion.h1
              className="first-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <span style={{ fontWeight: 700 }}>Experience Effortless Banking</span>{" "}
              <span style={{ fontWeight: 400 }}>at Your Fingertips</span>
            </motion.h1>
          ) : (
            <>
              <motion.h1
                className="first-headline"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4 }}
              >
                Step into the future with{" "}
                <motion.span
                  className="highlight"
                  animate={{
                    textShadow: [
                      "0 0 15px #00b3b3",
                      "0 0 30px #00b3b3",
                      "0 0 15px #00b3b3",
                    ],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  ZRIKA
                </motion.span>
              </motion.h1>

              <motion.p
                className="subtext"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                We bridge the gap between your financial goals and innovative tools,
                delivering smart solutions for a seamless banking experience.
              </motion.p>

              <div className="cards-container">
                <motion.div
                  className="card-wrapper"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  <motion.img
                    src={cardImg}
                    alt="Card"
                    className="card-img rotate-continuous"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div
                    className="line upi-line"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                  <motion.div
                    className="label upi-label"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.7 }}
                  >
                    just toggle<br />
                    <strong>UPI Switch</strong>
                  </motion.div>
                  <motion.div
                    className="line fingerprint-line"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2 }}
                  />
                  <motion.div
                    className="label fingerprint-label"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 2.2 }}
                  >
                    access with<br />
                    <strong>Fingerprint</strong>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="card-wrapper"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                >
                  <motion.img
                    src={mobileImg}
                    alt="Mobile"
                    className="card-img rotate-continuous-reverse"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div
                    className="line snap-line"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 2.5 }}
                  />
                  <motion.div
                    className="label snap-label"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 2.7 }}
                  >
                    NO MORE CABLES.<br />
                    <strong>JUST SNAP, CHARGE & GO.</strong>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
