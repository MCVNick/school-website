import { useState, useEffect } from "react";
import { Lock, Unlock, CheckCircle, AlertCircle, Eye, Key } from "lucide-react";

import { useLayout } from "../../../../../Utils/Context/LayoutContext";

import "./Lesson10Session4.scss";

const Lesson10Session4 = () => {
  const { setShowLayout } = useLayout();
  const [unlockedLevels, setUnlockedLevels] = useState([0]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hintsUsed, setHintsUsed] = useState({});
  const [showHint, setShowHint] = useState({});
  const [simplificationStatus, setSimplificationStatus] = useState({});
  const [codeWords, setCodeWords] = useState({});
  const [codeInput, setCodeInput] = useState("");
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [allCodesCorrect, setAllCodesCorrect] = useState(false);
  const [agentNames, setAgentNames] = useState("");
  const [missionComplete, setMissionComplete] = useState(false);

  useEffect(() => {
    setShowLayout(false);
    return () => setShowLayout(true);
  }, [setShowLayout]);

  const missions = [
    {
      id: 0,
      title: "Mission 1: Paint Investigation",
      question:
        "Agent, Hiroaki bought 3 1/2 gallons of paint and used 1 1/2 gallons. What fraction of the total paint did he use?",
      hint: "Divide the amount used by the total amount: 1 1/2 ÷ 3 1/2",
      correctAnswer: "3/7",
      unsimplifiedAnswers: ["6/14", "9/21", "12/28"],
      codeWord: "RATIO",
    },
    {
      id: 1,
      title: "Mission 2: Laundry Operation",
      question:
        "Tiana uses 1 3/5 oz of detergent per load. How many full loads can she do with 100 oz? (Answer as a mixed number or improper fraction)",
      hint: "Convert 1 3/5 to improper fraction (8/5), then divide 100 by 8/5",
      correctAnswer: "62 1/2",
      alternateAnswers: ["62 1/2", "125/2"],
      unsimplifiedAnswers: ["250/4", "375/6"],
      codeWord: "CLEAN",
    },
    {
      id: 2,
      title: "Mission 3: Pasta Portions",
      question: "How many 3/4-cup servings are in 1/2 cup of pasta salad?",
      hint: "Divide 1/2 by 3/4, which means multiply 1/2 by 4/3",
      correctAnswer: "2/3",
      unsimplifiedAnswers: ["4/6", "6/9", "8/12"],
      codeWord: "SERVE",
    },
    {
      id: 3,
      title: "Mission 4: Trail Division",
      question:
        "A trail is 8/10 mile long and divided into 4 equal sections. How long is each section?",
      hint: "Divide 8/10 by 4 (remember 4 = 4/1)",
      correctAnswer: "1/5",
      alternateAnswers: ["1/5", "2/10"],
      unsimplifiedAnswers: ["2/10", "3/15", "4/20"],
      codeWord: "TRAIL",
    },
    {
      id: 4,
      title: "Mission 5: Garden Calculation",
      question:
        "Estela has 10 ft³ of soil. She uses 3 1/2 ft³ for flowers. She needs 3/4 ft³ per tomato plant. How many tomato plants can she grow with the remaining soil? (Whole number or mixed number)",
      hint: "Step 1: Subtract 10 - 3 1/2 = 6 1/2. Step 2: Divide 6 1/2 by 3/4",
      correctAnswer: "8 2/3",
      alternateAnswers: ["8 2/3", "26/3"],
      unsimplifiedAnswers: ["8 4/6", "8 6/9", "52/6"],
      codeWord: "PLANT",
    },
    {
      id: 5,
      title: "Mission 6: Lawn Coverage",
      question:
        "Sierra needs 5/6 lb of grass seed for her whole lawn. She has 1/3 lb. What fraction of her lawn can she cover?",
      hint: "Divide 1/3 by 5/6, which means multiply 1/3 by 6/5",
      correctAnswer: "2/5",
      unsimplifiedAnswers: ["4/10", "6/15", "8/20"],
      codeWord: "GRASS",
    },
  ];

  const removeVowels = (word) => {
    return word.replace(/[AEIOU]/g, "_");
  };

  const hideFirstLetter = (word) => {
    return "_" + word.slice(1);
  };

  const normalizeFraction = (str) => {
    return str.trim().replace(/\s+/g, " ");
  };

  const checkAnswer = (levelId, userAnswer) => {
    const mission = missions[levelId];
    const normalized = normalizeFraction(userAnswer);

    const answersToCheck = mission.alternateAnswers || [mission.correctAnswer];
    const isCorrectSimplified = answersToCheck.some(
      (ans) => normalizeFraction(ans) === normalized
    );

    const isUnsimplified = mission.unsimplifiedAnswers?.some(
      (ans) => normalizeFraction(ans) === normalized
    );

    if (isCorrectSimplified) {
      let displayCode = mission.codeWord;

      if (hintsUsed[levelId]) {
        displayCode = removeVowels(mission.codeWord);
      }

      const wasUnsimplified = simplificationStatus[levelId] === "unsimplified";

      setSimplificationStatus({
        ...simplificationStatus,
        [levelId]: "simplified",
      });

      setFeedback({
        ...feedback,
        [levelId]: {
          correct: true,
          message: wasUnsimplified
            ? `✓ Perfect! Simplified correctly! Full code word: ${displayCode}`
            : `✓ Excellent work, Agent! Code word: ${displayCode}`,
        },
      });

      setCodeWords({
        ...codeWords,
        [levelId]: mission.codeWord,
      });

      if (
        !unlockedLevels.includes(levelId + 1) &&
        levelId < missions.length - 1
      ) {
        setTimeout(() => {
          setUnlockedLevels([...unlockedLevels, levelId + 1]);
        }, 1000);
      }
    } else if (isUnsimplified) {
      let displayCode = mission.codeWord;

      if (hintsUsed[levelId]) {
        displayCode = hideFirstLetter(removeVowels(mission.codeWord));
      } else {
        displayCode = hideFirstLetter(mission.codeWord);
      }

      setSimplificationStatus({
        ...simplificationStatus,
        [levelId]: "unsimplified",
      });

      setFeedback({
        ...feedback,
        [levelId]: {
          correct: true,
          needsSimplification: true,
          message: `✓ Correct! But please simplify your answer for the full code word: ${displayCode}`,
        },
      });

      setCodeWords({
        ...codeWords,
        [levelId]: mission.codeWord,
      });

      if (
        !unlockedLevels.includes(levelId + 1) &&
        levelId < missions.length - 1
      ) {
        setTimeout(() => {
          setUnlockedLevels([...unlockedLevels, levelId + 1]);
        }, 1000);
      }
    } else {
      setFeedback({
        ...feedback,
        [levelId]: {
          correct: false,
          message:
            "✗ Not quite. Make sure your answer is in fraction form (like 3/7 or 2 1/4)",
        },
      });
    }
  };

  const toggleHint = (levelId) => {
    setShowHint({ ...showHint, [levelId]: !showHint[levelId] });
    if (!showHint[levelId]) {
      setHintsUsed({ ...hintsUsed, [levelId]: true });
    }
  };

  const checkAllCodes = () => {
    const inputCodes = codeInput
      .toUpperCase()
      .split(" ")
      .filter((c) => c);
    const correctCodes = missions.map((m) => m.codeWord);

    if (
      inputCodes.length === 6 &&
      inputCodes.every((code, idx) => code === correctCodes[idx])
    ) {
      setAllCodesCorrect(true);
    }
  };

  const completeMission = () => {
    if (agentNames.trim()) {
      setMissionComplete(true);
    }
  };

  const parseAgentNames = () => {
    const names = agentNames
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name);
    return names;
  };

  const getAgentTitle = () => {
    const names = parseAgentNames();
    return names.length === 1 ? "Agent" : "Agents";
  };

  const formatAgentNames = () => {
    const names = parseAgentNames();
    if (names.length === 0) return "";
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;

    const lastIndex = names.length - 1;
    return names.slice(0, lastIndex).join(", ") + ", and " + names[lastIndex];
  };

  return (
    <div className="lesson-10-session-4-app-container">
      <div className="header-wrapper">
        <div className="header-border">
          <div className="header-content">
            <h1 className="header-title">🕵️ SECRET AGENT: FRACTION DIVISION</h1>
            <p className="header-subtitle">
              Mission Briefing: Solve division problems to unlock classified
              intel
            </p>
            <div className="progress-dots">
              {missions.map((_, idx) => (
                <div
                  key={idx}
                  className={`progress-dot ${
                    unlockedLevels.includes(idx) ? "unlocked" : "locked"
                  }`}
                >
                  {unlockedLevels.includes(idx) ? "✓" : <Lock size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`missions-container ${
          showCodePanel ? "panel-open" : "panel-closed"
        }`}
      >
        {missions.map((mission) => {
          const isUnlocked = unlockedLevels.includes(mission.id);
          const hasFeedback = feedback[mission.id];
          const canResubmit = hasFeedback?.needsSimplification;

          return (
            <div
              key={mission.id}
              className={`mission-card ${isUnlocked ? "unlocked" : "locked"}`}
            >
              <div className="mission-content">
                <div className="mission-header">
                  <h2 className="mission-title">
                    {isUnlocked ? (
                      <Unlock className="icon-unlocked" />
                    ) : (
                      <Lock className="icon-locked" />
                    )}
                    {mission.title}
                  </h2>
                  {hasFeedback?.correct && !canResubmit && (
                    <CheckCircle className="mission-check" size={32} />
                  )}
                </div>

                {isUnlocked ? (
                  <>
                    <div className="question-box">
                      <p className="question-text">{mission.question}</p>

                      <button
                        onClick={() => toggleHint(mission.id)}
                        className="hint-button"
                      >
                        <Eye size={16} />
                        {showHint[mission.id]
                          ? "Hide Hint"
                          : "Show Hint (vowels removed from code)"}
                      </button>

                      {showHint[mission.id] && (
                        <p className="hint-text">💡 {mission.hint}</p>
                      )}
                    </div>

                    <div className="answer-form">
                      <input
                        type="text"
                        placeholder="Enter fraction (e.g., 3/7 or 2 1/4)"
                        value={answers[mission.id] || ""}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [mission.id]: e.target.value,
                          })
                        }
                        className="answer-input"
                        disabled={hasFeedback?.correct && !canResubmit}
                      />
                      <button
                        onClick={() =>
                          checkAnswer(mission.id, answers[mission.id])
                        }
                        disabled={
                          !answers[mission.id] ||
                          (hasFeedback?.correct && !canResubmit)
                        }
                        className="submit-button"
                      >
                        SUBMIT
                      </button>
                    </div>

                    {hasFeedback && (
                      <div
                        className={`feedback-box ${
                          hasFeedback.correct
                            ? canResubmit
                              ? "warning"
                              : "success"
                            : "error"
                        }`}
                      >
                        {hasFeedback.correct ? (
                          canResubmit ? (
                            <AlertCircle color="#eab308" />
                          ) : (
                            <CheckCircle color="#4ade80" />
                          )
                        ) : (
                          <AlertCircle color="#ef4444" />
                        )}
                        <p className="feedback-message">
                          {hasFeedback.message}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="locked-message">
                    <Lock size={48} className="locked-icon" />
                    <p>Complete previous mission to unlock</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="code-panel">
        <div className="code-panel-inner">
          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className="code-toggle"
          >
            <span className="code-toggle-text">
              <Key size={24} />
              CODE DECODER
            </span>
            <span>{showCodePanel ? "▼" : "▲"}</span>
          </button>

          {showCodePanel && (
            <div className="code-panel-content">
              <p className="code-instructions">
                Enter all 6 code words separated by spaces to unlock final
                mission
              </p>
              <div className="code-form">
                <input
                  type="text"
                  placeholder="WORD1 WORD2 WORD3 WORD4 WORD5 WORD6"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  className="code-input"
                  disabled={allCodesCorrect}
                />
                <button
                  onClick={checkAllCodes}
                  disabled={allCodesCorrect}
                  className="decode-button"
                >
                  DECODE
                </button>
              </div>

              {allCodesCorrect && !missionComplete && (
                <div className="name-entry-box">
                  <p className="name-entry-title">
                    ✓ All codes verified! Enter agent name(s) to complete the
                    mission:
                  </p>
                  <p className="name-entry-hint">
                    (Separate multiple names with commas: John, Sarah, Mike)
                  </p>
                  <div className="name-entry-form">
                    <input
                      type="text"
                      placeholder="Enter name(s)..."
                      value={agentNames}
                      onChange={(e) => setAgentNames(e.target.value)}
                      className="name-input"
                    />
                    <button
                      onClick={completeMission}
                      disabled={!agentNames.trim()}
                      className="complete-button"
                    >
                      COMPLETE MISSION
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {missionComplete && (
        <div className="victory-overlay">
          <div className="victory-card">
            <div className="victory-trophy">🏆</div>
            <h2 className="victory-title">MISSION ACCOMPLISHED!</h2>
            <p className="victory-agent-line">
              Outstanding work, {getAgentTitle()} {formatAgentNames()}!
            </p>
            <p className="victory-message">
              {parseAgentNames().length === 1 ? "You've" : "You've all"}{" "}
              successfully cracked all the codes and mastered fraction division!
            </p>
            <div className="victory-code-box">
              <p className="victory-code-label">Classification Code:</p>
              <p className="victory-code-text">
                {missions.map((m) => m.codeWord).join(" - ")}
              </p>
            </div>
            <p className="victory-final">
              Your skills are now classified as: EXPERT 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson10Session4;
