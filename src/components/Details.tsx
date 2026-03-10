import { useEffect, useState } from "react";

export default function Details({
  theme,
  setDifficulty,
  difficulty,
  setMode,
  mode,
  setTimer,
  timer,
  gameStarted,
  wpm,
  accuracy,
  resetCount,
}: {
  theme: string;
  difficulty: string;
  gameStarted: boolean;
  resetCount: number;
  wpm: number;
  mode: string;
  timer: number;
  accuracy: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [difficultyDropdown, setDifficultyDropdown] = useState(false);
  const [modeDropdown, setModeDropdown] = useState(false);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (gameStarted && timer > 59) {
      setMinutes((prev) => prev + 1);
      setTimer(0);
    }
  }, [timer]);

  useEffect(() => {
    if (resetCount > 0) {
      setMinutes(0);
    }
  }, [resetCount]);

  return (
    <div className="border-b border-neutral-700 py-3 flex justify-between max-md:flex-col select-none">
      {/* details */}
      <div className="flex max-md:**:flex-col max-md:**:gap-1 max-md:**:w-full **:text-center">
        <p className="text-neutral-400 flex gap-2 items-center">
          WPM:{" "}
          <span
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold text-[1.4rem]`}
          >
            {wpm}
          </span>
        </p>
        <div className="border-l border-r border-neutral-700 px-4 mx-4 flex  ">
          <p className="text-neutral-400 flex gap-2 items-center">
            Accuracy:{" "}
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"} ${accuracy < 100 ? "text-red-500!" : ""} font-bold text-[1.4rem] transition`}
            >
              {accuracy}%
            </span>
          </p>
        </div>
        <p className="text-neutral-400 flex gap-2 items-center">
          Time:{" "}
          <span
            className={`${theme === "dark" ? "text-white" : "text-black"} ${gameStarted ? "text-yellow-400!" : ""} font-bold text-[1.4rem] transition`}
          >
            {minutes}:{timer < 10 && "0"}
            {timer}
          </span>
        </p>
      </div>

      {/* options */}
      <div className="flex">
        {/* desktop */}
        <div className="flex max-md:hidden max-[1000px]:flex-col max-[1000px]:gap-1 select-none">
          <div className="flex items-center gap-3 border-r border-neutral-600 pr-4 max-[1000px]:border-none max-[1000px]:pr-0">
            <p className="text-neutral-400">Difficulty: </p>
            <div
              className={`flex gap-1 ${theme === "dark" ? "*:text-white" : "*:text-black"} *:border *:border-neutral-600 *:rounded-md *:px-2 *:py-0.5 *:hover:text-blue-400 *:hover:border-blue-400 *:hover:cursor-pointer *:transition *:focus:outline-3 *:outline-blue-400 *:focus:border-white`}
            >
              <button
                className={`${difficulty === "Easy" && "text-blue-400! border-blue-400!"}`}
                onClick={() => setDifficulty("Easy")}
              >
                Easy
              </button>
              <button
                className={`${difficulty === "Medium" && "text-blue-400! border-blue-400!"}`}
                onClick={() => setDifficulty("Medium")}
              >
                Medium
              </button>
              <button
                className={`${difficulty === "Hard" && "text-blue-400! border-blue-400!"}`}
                onClick={() => setDifficulty("Hard")}
              >
                Hard
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-3 max-[1000px]:pl-0">
            <p className="text-neutral-400">Mode: </p>
            <div
              className={`flex gap-1 ${theme === "dark" ? "*:text-white" : "*:text-black"} *:border *:border-neutral-600 *:rounded-md *:px-2 *:py-0.5 *:hover:text-blue-400 *:hover:border-blue-400 *:hover:cursor-pointer *:transition *:focus:outline-3 *:outline-blue-400 *:focus:border-white`}
            >
              <button
                className={`${mode === "timed" && "text-blue-400! border-blue-400!"}`}
                onClick={() => {
                  setMode("timed");
                }}
              >
                Timed (60s)
              </button>
              <button
                className={`${mode === "passage" && "text-blue-400! border-blue-400!"}`}
                onClick={() => {
                  setMode("passage");
                }}
              >
                Passage
              </button>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="grid grid-cols-2 gap-3 w-full relative md:hidden mt-3 select-none z-20">
          {/* difficulty */}
          <div className="relative w-full">
            <button
              className={`${theme === "dark" ? "text-white" : "text-black"} border border-neutral-600 rounded-md py-1 w-full flex items-center gap-2 justify-center transition `}
              onClick={() => {
                setDifficultyDropdown(!difficultyDropdown);
              }}
            >
              {difficulty}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                fill="none"
                viewBox="0 0 11 6"
                className={`${difficultyDropdown && "rotate-180"} transition`}
              >
                <path
                  fill={`${theme === "dark" ? "white" : "black"}`}
                  d="M4.742 5.836.117 1.242c-.156-.125-.156-.375 0-.531L.742.117a.36.36 0 0 1 .531 0l3.75 3.688L8.743.117c.155-.156.405-.156.53 0l.625.594c.157.156.157.406 0 .531L5.273 5.836a.36.36 0 0 1-.53 0"
                />
              </svg>
            </button>

            <div
              className={`**:text-white bg-neutral-800 rounded-md **:p-2 absolute top-full w-full mt-2 ${difficultyDropdown ? "block" : "hidden"}`}
              onBlur={() => {
                setDifficultyDropdown(false);
              }}
            >
              <div>
                <input
                  type="radio"
                  name="difficulty"
                  id="rdEasy"
                  value="Easy"
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                />
                <label htmlFor="rdEasy">Easy</label>
              </div>
              <div className="border-b border-t border-neutral-600">
                <input
                  type="radio"
                  name="difficulty"
                  id="rdMedium"
                  value="Medium"
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                />
                <label htmlFor="rdMedium">Medium</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="difficulty"
                  id="rdHard"
                  value="Hard"
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                />
                <label htmlFor="rdHard">Hard</label>
              </div>
            </div>
          </div>

          {/* mode */}
          <div className="relative w-full">
            <button
              className={`${theme === "dark" ? "text-white" : "text-black"} border border-neutral-600 rounded-md py-1 w-full flex items-center gap-2 justify-center transition`}
              onClick={() => {
                setModeDropdown(!modeDropdown);
              }}
            >
              {mode === "timed" ? "Timed (60s)" : "Passage"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                fill="none"
                viewBox="0 0 11 6"
                className={`${modeDropdown && "rotate-180"} transition`}
              >
                <path
                  fill={`${theme === "dark" ? "white" : "black"}`}
                  d="M4.742 5.836.117 1.242c-.156-.125-.156-.375 0-.531L.742.117a.36.36 0 0 1 .531 0l3.75 3.688L8.743.117c.155-.156.405-.156.53 0l.625.594c.157.156.157.406 0 .531L5.273 5.836a.36.36 0 0 1-.53 0"
                />
              </svg>
            </button>

            <div
              className={`**:text-white bg-neutral-800 rounded-md **:p-2 absolute top-full w-full mt-2 ${modeDropdown ? "block" : "hidden"}`}
              onBlur={() => {
                setModeDropdown(false);
              }}
            >
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="rdTimed"
                  value="timed"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
                <label htmlFor="rdTimed">Timed (60s)</label>
              </div>

              <div className="border-t border-neutral-600">
                <input
                  type="radio"
                  name="mode"
                  id="rdPassage"
                  value="passage"
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                />
                <label htmlFor="rdPassage">Passage</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
