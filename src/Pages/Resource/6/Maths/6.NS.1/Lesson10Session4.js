import { useState } from "react";
import { Lock, Unlock, CheckCircle, AlertCircle, Eye, Key } from "lucide-react";

const Lesson10Session4 = () => {
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

    // Check if it's simplified and correct
    const answersToCheck = mission.alternateAnswers || [mission.correctAnswer];
    const isCorrectSimplified = answersToCheck.some(
      (ans) => normalizeFraction(ans) === normalized
    );

    // Check if it's unsimplified but correct
    const isUnsimplified = mission.unsimplifiedAnswers?.some(
      (ans) => normalizeFraction(ans) === normalized
    );

    if (isCorrectSimplified) {
      let displayCode = mission.codeWord;

      // Apply penalties based on hint usage
      if (hintsUsed[levelId]) {
        displayCode = removeVowels(mission.codeWord);
      }

      // Check if they previously submitted unsimplified
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

      // Apply penalties: hide first letter for unsimplified, and vowels if hint used
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-1 rounded-lg">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              🕵️ SECRET AGENT: FRACTION DIVISION
            </h1>
            <p className="text-center text-yellow-300">
              Mission Briefing: Solve division problems to unlock classified
              intel
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {missions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    unlockedLevels.includes(idx)
                      ? "bg-green-500"
                      : "bg-slate-700"
                  }`}
                >
                  {unlockedLevels.includes(idx) ? "✓" : <Lock size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Cards */}
      <div
        className={`max-w-4xl mx-auto space-y-4 ${
          showCodePanel ? "pb-96" : "pb-32"
        }`}
      >
        {missions.map((mission) => {
          const isUnlocked = unlockedLevels.includes(mission.id);
          const hasFeedback = feedback[mission.id];
          const canResubmit = hasFeedback?.needsSimplification;

          return (
            <div
              key={mission.id}
              className={`border-2 rounded-lg overflow-hidden transition-all duration-500 ${
                isUnlocked
                  ? "border-yellow-500 bg-slate-800 opacity-100"
                  : "border-slate-700 bg-slate-900 opacity-50"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {isUnlocked ? (
                      <Unlock className="text-yellow-500" />
                    ) : (
                      <Lock className="text-slate-500" />
                    )}
                    {mission.title}
                  </h2>
                  {hasFeedback?.correct && !canResubmit && (
                    <CheckCircle className="text-green-400" size={32} />
                  )}
                </div>

                {isUnlocked ? (
                  <>
                    <div className="bg-slate-900 p-4 rounded-lg mb-4">
                      <p className="text-lg mb-3">{mission.question}</p>

                      <button
                        onClick={() => toggleHint(mission.id)}
                        className="flex items-center gap-2 text-sm text-yellow-300 hover:text-yellow-400 transition"
                      >
                        <Eye size={16} />
                        {showHint[mission.id]
                          ? "Hide Hint"
                          : "Show Hint (vowels removed from code)"}
                      </button>

                      {showHint[mission.id] && (
                        <p className="text-sm text-yellow-300 italic mt-2 pl-6">
                          💡 {mission.hint}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-3">
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
                        className="flex-1 px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg focus:border-yellow-500 focus:outline-none text-lg"
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
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg font-bold hover:from-yellow-400 hover:to-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        SUBMIT
                      </button>
                    </div>

                    {hasFeedback && (
                      <div
                        className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                          hasFeedback.correct
                            ? canResubmit
                              ? "bg-yellow-900/50 border-2 border-yellow-500"
                              : "bg-green-900/50 border-2 border-green-500"
                            : "bg-red-900/50 border-2 border-red-500"
                        }`}
                      >
                        {hasFeedback.correct ? (
                          canResubmit ? (
                            <AlertCircle className="text-yellow-400" />
                          ) : (
                            <CheckCircle className="text-green-400" />
                          )
                        ) : (
                          <AlertCircle className="text-red-400" />
                        )}
                        <p className="font-bold">{hasFeedback.message}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Lock size={48} className="mx-auto mb-2" />
                    <p>Complete previous mission to unlock</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Decoder Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-4 border-yellow-500 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto p-4">
          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className="w-full flex items-center justify-between bg-gradient-to-r from-yellow-600 to-red-600 p-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-red-500 transition"
          >
            <span className="flex items-center gap-2">
              <Key size={24} />
              CODE DECODER
            </span>
            <span>{showCodePanel ? "▼" : "▲"}</span>
          </button>

          {showCodePanel && (
            <div className="mt-4 bg-slate-800 p-6 rounded-lg max-h-80 overflow-y-auto">
              <p className="text-yellow-300 mb-4 text-center">
                Enter all 6 code words separated by spaces to unlock final
                mission
              </p>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="WORD1 WORD2 WORD3 WORD4 WORD5 WORD6"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg focus:border-yellow-500 focus:outline-none text-lg uppercase"
                  disabled={allCodesCorrect}
                />
                <button
                  onClick={checkAllCodes}
                  disabled={allCodesCorrect}
                  className="px-6 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  DECODE
                </button>
              </div>

              {allCodesCorrect && !missionComplete && (
                <div className="bg-green-900/50 border-2 border-green-500 p-6 rounded-lg">
                  <p className="text-green-300 text-center text-xl font-bold mb-4">
                    ✓ All codes verified! Enter agent name(s) to complete the
                    mission:
                  </p>
                  <p className="text-green-200 text-center text-sm mb-4 italic">
                    (Separate multiple names with commas: John, Sarah, Mike)
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter name(s)..."
                      value={agentNames}
                      onChange={(e) => setAgentNames(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700 border-2 border-green-500 rounded-lg focus:border-green-400 focus:outline-none text-lg"
                    />
                    <button
                      onClick={completeMission}
                      disabled={!agentNames.trim()}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-bold text-xl hover:from-green-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
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

      {/* Victory Screen */}
      {missionComplete && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-600 to-red-600 p-8 rounded-2xl max-w-2xl text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-4xl font-bold mb-4">MISSION ACCOMPLISHED!</h2>
            <p className="text-2xl mb-4">
              Outstanding work, {getAgentTitle()} {formatAgentNames()}!
            </p>
            <p className="text-xl mb-4">
              {parseAgentNames().length === 1 ? "You've" : "You've all"}{" "}
              successfully cracked all the codes and mastered fraction division!
            </p>
            <div className="bg-black/30 p-4 rounded-lg mb-4">
              <p className="text-sm mb-2">Classification Code:</p>
              <p className="text-2xl font-bold tracking-wider">
                {missions.map((m) => m.codeWord).join(" - ")}
              </p>
            </div>
            <p className="text-lg">
              Your skills are now classified as: EXPERT 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson10Session4;
