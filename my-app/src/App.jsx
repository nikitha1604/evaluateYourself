import React, { useState } from "react";

export default function QuizApp() {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [level, setLevel] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testFinished, setTestFinished] = useState(false);
  const [showCheckAnswers, setShowCheckAnswers] = useState(false);

  // File change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatusMsg("⚠️ Please upload a file first.");
      return;
    }

    setLoading(true);
    setStatusMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("numQuestions", numQuestions);
      formData.append("level", level);

      const res = await fetch("http://localhost:8000/api/generate-quiz", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.message === "Quiz generated successfully!") {
        setQuiz(data.quiz.questions);
        setQuizGenerated(true);
        setTestStarted(false);
        setAnswers({});
        setCurrentQ(0);
        setTestFinished(false);
        setShowCheckAnswers(false);
        setStatusMsg("✅ Quiz generated successfully!");
      } else {
        setStatusMsg("❌ Failed to generate quiz.");
      }
    } catch (error) {
      setStatusMsg("🚨 Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Save user answer
  const handleAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  // Score calculation
  const totalQuestions = quiz.length;
  const correctAnswers = quiz.filter(
    (q, i) => answers[i] && answers[i] === q.answer
  ).length;

  // Progress circle math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (correctAnswers / totalQuestions) * circumference;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
          Quiz Generator
        </h1>

        {/* Quiz not generated yet */}
        {!quizGenerated && !testStarted && !testFinished && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Upload File (PDF, DOCX, ODF, Image)
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.odf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 text-sm cursor-pointer"
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Number of Questions
              </label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600"
                min="1"
                max="50"
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Difficulty Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition duration-300 font-semibold shadow-lg"
            >
              {loading ? "⏳ Generating..." : "🚀 Generate Quiz"}
            </button>
          </form>
        )}

        {/* Status Message */}
        {statusMsg && (
          <p
            className={`mt-5 text-center font-medium ${
              statusMsg.includes("✅")
                ? "text-green-400"
                : statusMsg.includes("❌")
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {statusMsg}
          </p>
        )}

        {/* Start Test */}
        {quizGenerated && !testStarted && !testFinished && (
          <div className="text-center mt-6">
            <button
              onClick={() => setTestStarted(true)}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Start Test
            </button>
          </div>
        )}

        {/* Test Running */}
        {testStarted && !testFinished && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQ + 1}/{quiz.length}
            </h2>
            <p className="mb-4">{quiz[currentQ].question}</p>
            <div className="space-y-2">
              {quiz[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQ, opt)}
                  className={`w-full text-left px-4 py-2 border rounded-lg ${
                    answers[currentQ] === opt
                      ? "bg-green-100 text-black border-green-500"
                      : "hover:bg-gray-100 text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(currentQ - 1)}
                className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {currentQ < quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQ(currentQ + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    setTestFinished(true);
                    setTestStarted(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Finish Test
                </button>
              )}
            </div>
          </div>
        )}

        {/* Score Page */}
        {testFinished && !showCheckAnswers && (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold mb-6">Your Score</h2>
            <svg width="160" height="160" className="mx-auto mb-4">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#374151"
                fill="transparent"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="green"
                fill="transparent"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <p className="text-lg font-semibold">
              {correctAnswers} / {totalQuestions} Correct
            </p>
            <button
              onClick={() => setShowCheckAnswers(true)}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              Check Answers
            </button>
          </div>
        )}

        {/* Check Answers */}
        {showCheckAnswers && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">
              Review Question {currentQ + 1}/{quiz.length}
            </h2>
            <p className="mb-4">{quiz[currentQ].question}</p>
            <p className="mb-2">
              <span className="font-semibold">Your Answer:</span>{" "}
              {answers[currentQ] || "Not Answered"}
            </p>
            <p className="mb-2 text-green-400">
              <span className="font-semibold">Correct Answer:</span>{" "}
              {quiz[currentQ].answer}
            </p>
            <p className="italic text-gray-300 mb-4">
              💡 {quiz[currentQ].explanation}
            </p>

            <div className="flex justify-between">
              <button
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(currentQ - 1)}
                className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {currentQ < quiz.length - 1 ? (
                <button
                  onClick={() => setCurrentQ(currentQ + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowCheckAnswers(false);
                    setQuizGenerated(false);
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                >
                  Go to Result
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
