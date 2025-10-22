import { useState, useEffect, useRef } from "react";

import { useLayout } from "../../../Utils/Context/LayoutContext";

import "./MagicEightBall.scss";

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

const MagicEightBall = () => {
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("normal");
  const [isShaking, setIsShaking] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  const { setShowLayout } = useLayout();

  const minSwipeDistance = 50;

  useEffect(() => {
    setShowLayout(false);
  }, [setShowLayout]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

      let selectedMode = "normal";

      if (isHorizontalSwipe) {
        if (Math.abs(distanceX) > minSwipeDistance) {
          if (distanceX > 0) {
            selectedMode = "no";
          } else {
            selectedMode = "yes";
          }
        }
      } else {
        if (Math.abs(distanceY) > minSwipeDistance) {
          selectedMode = "normal";
        }
      }

      if (
        Math.abs(distanceX) > minSwipeDistance ||
        Math.abs(distanceY) > minSwipeDistance
      ) {
        setMode(selectedMode);
        setIsShaking(true);
        setResponse("");

        setTimeout(() => {
          let newResponse;
          if (selectedMode === "yes") {
            newResponse = getRandomResponse(yesResponses);
          } else if (selectedMode === "no") {
            newResponse = getRandomResponse(noResponses);
          } else {
            newResponse = getRandomResponse(normalResponses);
          }
          setResponse(newResponse);
          setIsShaking(false);
        }, 1000);
      }
    };

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStart, touchEnd, minSwipeDistance]);

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
    <div ref={containerRef} className="magic8ball-container">
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
