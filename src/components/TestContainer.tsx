import { useEffect, useRef, useState } from "react";

export default function TestContainer({
  currentTestIndexes,
  theme,
  resetCount,
  setAccuracy,
  setCorrectChars,
  setIncorrectChars,
  setWordsTyped,
  setTestComplete,
  setGameStarted,
  setAccurateChars,
  gameStarted,
  correctChars,
  incorrectChars,
}: {
  currentTestIndexes: string[];
  theme: string;
  resetCount: number;
  correctChars: number;
  incorrectChars: number;
  gameStarted: boolean;
  setAccurateChars: React.Dispatch<React.SetStateAction<number>>;
  setTestComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setWordsTyped: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy: React.Dispatch<React.SetStateAction<number>>;
  setCorrectChars: React.Dispatch<React.SetStateAction<number>>;
  setIncorrectChars: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [currIndex, setCurrIndex] = useState(0);

  const typingContainer = useRef<null | HTMLElement>(null);
  const charContainer = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (resetCount !== 0) {
      setCurrIndex(0);
      Array.from(charContainer.current!.children).forEach((char) => {
        char.className = "";
      });
    }
  }, [resetCount]);

  function checkChar(char: string) {
    const currElement = document.getElementById(`char${currIndex}`);
    setCorrectChars(currentTestIndexes.length - incorrectChars);

    if (char === "Backspace" && currIndex > 0) {
      currElement!.className = "";
      const prevElement = document.getElementById(`char${currIndex - 1}`);
      prevElement!.className = "";
      setCurrIndex((prev) => prev - 1);

      if (currIndex === 1) {
        prevElement!.className = "";
        prevElement!.classList.add("currentChar");
      }

      return;
    }

    if (
      char !== "Shift" &&
      char !== "Backspace" &&
      char === currentTestIndexes[currIndex]
    ) {
      currElement!.classList.add("correctChar");
      setCurrIndex((prev) => prev + 1);
      setAccurateChars((prev) => prev + 1);
    } else if (
      char !== "Shift" &&
      char !== "Backspace" &&
      char !== currentTestIndexes[currIndex]
    ) {
      currElement!.classList.add("incorrectChar");
      setCurrIndex((prev) => prev + 1);
      setIncorrectChars((prev) => prev + 1);
    }

    if (currentTestIndexes[currIndex] === " ") {
      setWordsTyped((prev) => prev + 1);
    }
  }

  function nextChar() {
    if (currIndex === 0) {
      const firstElement = document.getElementById(`char0`);
      firstElement?.classList.add("currentChar");
    } else {
      const prevElement = document.getElementById(`char${currIndex - 1}`);
      prevElement?.classList.remove("currentChar");
      const currElement = document.getElementById(`char${currIndex}`);
      currElement?.classList.add("currentChar");
    }
  }

  function calculatePer() {
    let acc = Math.floor((correctChars / currentTestIndexes.length) * 100);
    setAccuracy(acc);
  }

  useEffect(() => {
    if (currIndex !== 0) {
      nextChar();
      calculatePer();

      if (currIndex === currentTestIndexes.length) {
        setTestComplete(true);
      }
    }
  }, [currIndex]);

  useEffect(() => {
    if (gameStarted) {
      nextChar();
      setCorrectChars(currentTestIndexes.length);
    }
  }, [gameStarted]);

  return (
    <main
      className="text-neutral-400 text-[2.2rem] pt-8 pb-8 relative focus:outline-none"
      ref={typingContainer}
      onKeyDown={(e) => {
        if (!gameStarted) {
          setGameStarted(true);
          nextChar();
        }
        checkChar(e.key);

        if (e.key === " ") {
          e.preventDefault();
        }
      }}
      tabIndex={0}
    >
      <input type="text" className="absolute w-full h-full opacity-0" />
      <div
        className={`${!gameStarted ? "blur-[5px]" : ""} *:transition`}
        ref={charContainer}
      >
        {currentTestIndexes.map((char, key) => (
          <span key={key} id={`char${key}`}>
            {char}
          </span>
        ))}
      </div>

      <div
        className={`w-full h-full pt-50 absolute top-0 flex flex-col items-center gap-4 z-10 ${gameStarted && "hidden"}`}
      >
        <button
          className="bg-blue-600 rounded-lg py-4 px-5 text-[1rem] text-white hover:bg-blue-400 hover:cursor-pointer transition focus:outline-2 outline-blue-400"
          onClick={() => {
            setGameStarted(true);
            typingContainer.current!.focus();
          }}
        >
          Start Typing Test
        </button>
        <p
          className={`${theme === "light" ? "text-black" : "text-white"} text-[1rem] font-semibold select-none`}
        >
          Or click the text and start typing
        </p>
      </div>
    </main>
  );
}
