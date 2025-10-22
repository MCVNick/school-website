import { useState, useEffect } from "react";

import { useLayout } from "../../../Utils/Context/LayoutContext";

import "./MagicEightBall.scss";

const MagicEightBall = () => {
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("normal");
  const [isShaking, setIsShaking] = useState(false);

  const { setShowLayout } = useLayout();

  useEffect(() => {
    setShowLayout(false);
  }, [setShowLayout]);

  const yesResponses = [
    "Yes!",
    "Absolutely!",
    "Of course!",
    "Sure thing!",
    "Yes, definitely!",
    "Without a doubt!",
    "You may count on it!",
    "Most likely!",
  ];

  const noResponses = [
    "No",
    "Not right now",
    "Maybe later",
    "Not today",
    "Don't count on it",
    "My reply is no",
    "Outlook not so good",
    "Very doubtful",
  ];

  const normalResponses = [
    "It is certain",
    "Without a doubt",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
  ];

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const shake8Ball = () => {
    setIsShaking(true);
    setResponse("");

    setTimeout(() => {
      let newResponse;
      if (mode === "yes") {
        newResponse = getRandomResponse(yesResponses);
      } else if (mode === "no") {
        newResponse = getRandomResponse(noResponses);
      } else {
        newResponse = getRandomResponse(normalResponses);
      }
      setResponse(newResponse);
      setIsShaking(false);
    }, 1000);
  };

  const setYesMode = (e) => {
    e.stopPropagation();
    setMode("yes");
  };

  const setNoMode = (e) => {
    e.stopPropagation();
    setMode("no");
  };

  const resetMode = (e) => {
    e.stopPropagation();
    setMode("normal");
  };

  return (
    <div className="magic8ball-container">
      <div onClick={setNoMode} className="invisible-corner top-left" />

      <div onClick={setYesMode} className="invisible-corner top-right" />

      <div onClick={resetMode} className="invisible-corner bottom-left" />

      <div className="content-wrapper">
        <h1 className="title">Magic 8 Ball</h1>

        <div
          onClick={shake8Ball}
          className={`ball-container ${isShaking ? "shaking" : ""}`}
        >
          <div className="ball-outer">
            <div className="ball-inner">
              <div className="answer-window">
                <div className="answer-text">{response || "8"}</div>
              </div>
            </div>
          </div>

          <div className="shine-effect" />
        </div>
      </div>
    </div>
  );
};

export default MagicEightBall;
