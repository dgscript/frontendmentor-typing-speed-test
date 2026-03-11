import "./App.css";
import Header from "./components/Header";
import Details from "./components/Details";
import Footer from "./components/Footer";
import TestComplete from "./components/TestComplete";
import { useEffect, useRef, useState } from "react";
import TestContainer from "./components/TestContainer";

interface Data {
  easy: Easy[];
  medium: Medium[];
  hard: Hard[];
}

interface Easy {
  id: string;
  text: string;
}

interface Medium {
  id: string;
  text: string;
}
interface Hard {
  id: string;
  text: string;
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [difficulty, setDifficulty] = useState("");
  const [mode, setMode] = useState("timed");
  const [gameStarted, setGameStarted] = useState(false);
  const [PB, setPB] = useState(0);
  const [newPB, setNewPB] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [firstGame, setFirstGame] = useState(true);

  const [data, setData] = useState<Data | null>();
  const [currentTestIndexes, setCurrentTest] = useState<string[]>([]);
  const [wpm, setWpm] = useState(0);
  const [timer, setTimer] = useState(60);
  const [passageTimer, setPassageTimer] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const timerInterval = useRef<null | number>(null);

  const [accurateChars, setAccurateChars] = useState(0);

  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/data.json");
      const data = await response.json();

      if (data) {
        setData(data);
        setDifficulty("Easy");
      }
    }
    getData();

    const localTheme = localStorage.getItem("theme");
    const localPB = localStorage.getItem("pb");

    if (localTheme) {
      setTheme(localTheme);
    }

    if (localPB) {
      setPB(Number(localPB));
    }

    if (Number(localPB) > 0) {
      setFirstGame(false);
    }
  }, []);

  useEffect(() => {
    const localPB = localStorage.getItem("pb");

    if (Number(localPB) > 0) {
      setFirstGame(false);
    }

    if (testComplete && timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    if (wpm >= Number(localPB)) {
      localStorage.setItem("pb", JSON.stringify(wpm));
      setPB(wpm);
    }

    if (wpm >= Number(localPB) && !firstGame) {
      setNewPB(true);
    }
  }, [testComplete]);

  useEffect(() => {
    const elapsedSeconds = mode === "timed" ? 60 - timer : passageTimer;

    if (elapsedSeconds > 0) {
      setWpm(Math.round(accurateChars / 5 / (elapsedSeconds / 60)));
    }
  }, [wordsTyped, timer]);

  useEffect(() => {
    setTimer(mode === "timed" ? 60 : 0);
  }, [mode]);

  useEffect(() => {
    if (gameStarted) {
      resetTest();
    }
  }, [difficulty, mode]);

  function resetTest() {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    setWordsTyped(0);
    setTimer(mode === "timed" ? 60 : 0);
    setPassageTimer(0);
    setWpm(0);
    setAccuracy(100);
    setGameStarted(false);
    setTestComplete(false);
    setCorrectChars(0);
    setIncorrectChars(0);
    setAccurateChars(0);
    setNewPB(false);

    setResetCount((prev) => prev + 1);
  }

  useEffect(() => {
    if (gameStarted) {
      timerInterval.current = setInterval(() => {
        if (mode === "timed") {
          setTimer((prev) => prev - 1);
        } else {
          setPassageTimer((prev) => prev + 1);
          setTimer((prev) => prev + 1);
        }
      }, 1000);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (mode === "timed" && timer === 0 && timerInterval.current) {
      clearInterval(timerInterval.current);
      setTestComplete(true);
    }
  }, [timer]);

  const fr = useRef(false);
  useEffect(() => {
    if (!fr.current) {
      fr.current = true;
      return;
    }

    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.style.backgroundColor = "hsl(0, 0%, 7%)";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [theme]);

  useEffect(() => {
    if (difficulty === "Easy") {
      if (data) {
        const randomIndex = Math.floor(Math.random() * data.easy.length);
        const currentText = data.easy[randomIndex].text;
        const currentTextArray: string[] = [];
        for (let i = 0; i < currentText.length; i++) {
          let currChar = currentText.charAt(i);
          currentTextArray.push(currChar);
        }
        setCurrentTest(currentTextArray);
      }
    } else if (difficulty === "Medium") {
      if (data) {
        const randomIndex = Math.floor(Math.random() * data.medium.length);
        const currentText = data.medium[randomIndex].text;
        const currentTextArray: string[] = [];
        for (let i = 0; i < currentText.length; i++) {
          let currChar = currentText.charAt(i);
          currentTextArray.push(currChar);
        }
        setCurrentTest(currentTextArray);
      }
    } else if (difficulty === "Hard") {
      if (data) {
        const randomIndex = Math.floor(Math.random() * data.hard.length);
        const currentText = data.hard[randomIndex].text;
        const currentTextArray: string[] = [];
        for (let i = 0; i < currentText.length; i++) {
          let currChar = currentText.charAt(i);

          if (currChar === "—") {
            currentTextArray.push("-");
          } else {
            currentTextArray.push(currChar);
          }
        }
        setCurrentTest(currentTextArray);
      }
    }
  }, [difficulty]);

  return (
    <>
      <div className="max-w-7xl m-auto px-10 max-sm:px-5">
        <Header theme={theme} setTheme={setTheme} PB={PB} />
        {!testComplete ? (
          <>
            <Details
              theme={theme}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              mode={mode}
              setMode={setMode}
              setTimer={setTimer}
              accuracy={accuracy}
              wpm={wpm}
              timer={timer}
              gameStarted={gameStarted}
              resetCount={resetCount}
            />
            <TestContainer
              currentTestIndexes={currentTestIndexes}
              theme={theme}
              setWordsTyped={setWordsTyped}
              setAccuracy={setAccuracy}
              setCorrectChars={setCorrectChars}
              setIncorrectChars={setIncorrectChars}
              correctChars={correctChars}
              incorrectChars={incorrectChars}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              resetCount={resetCount}
              setTestComplete={setTestComplete}
              setAccurateChars={setAccurateChars}
            />
            {gameStarted && <Footer resetTest={resetTest} />}
          </>
        ) : (
          <TestComplete
            PB={PB}
            newPB={newPB}
            firstGame={firstGame}
            theme={theme}
            accuracy={accuracy}
            wpm={wpm}
            incorrectChars={incorrectChars}
            accurateChars={accurateChars}
            resetTest={resetTest}
          />
        )}
      </div>
    </>
  );
}

export default App;
