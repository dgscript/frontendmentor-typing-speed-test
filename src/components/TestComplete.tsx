import confetti from "@hiseb/confetti";
import { useEffect } from "react";

export default function TestComplete({
  PB,
  newPB,
  firstGame,
  wpm,
  accuracy,
  accurateChars,
  incorrectChars,
  theme,
  resetTest,
}: {
  PB: number;
  newPB: boolean;
  firstGame: boolean;
  wpm: number;
  accuracy: number;
  accurateChars: number;
  incorrectChars: number;
  theme: string;
  resetTest: () => void;
}) {
  /* confetti trigger */
  useEffect(() => {
    if (newPB) {
      /* top center */
      confetti({
        position: { x: window.innerWidth * 0.5, y: 0 },
        count: 200,
        size: 1,
        velocity: 200,
        fade: false,
      });
    }
  }, [newPB]);

  return (
    <div className="flex flex-col items-center min-h-[80dvh] max-sm:min-h-[90dvh] relative">
      {!newPB && (
        <img
          src="images/pattern-star-1.svg"
          alt="Pattern Star"
          className="absolute right-0 bottom-[30%] max-sm:bottom-[5%] max-sm:w-10"
        />
      )}
      {!newPB && (
        <img
          src="images/pattern-star-2.svg"
          alt="Pattern Star"
          className="absolute left-0 top-[20%] max-sm:top-[5%] max-sm:w-6"
        />
      )}

      <div className="mt-1 mb-6 relative flex justify-center items-center w-30 h-30 animate-pulse">
        {newPB ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
          >
            <path
              stroke="#f4dc73"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M29.579 58.003c2.938 2.744 11.607-1.77 19.365-10.08 7.755-8.309 11.663-17.267 8.725-20.01s-11.611 1.77-19.366 10.08c-7.758 8.309-11.663 17.267-8.724 20.01"
              clip-rule="evenodd"
            />
            <path
              stroke="#f4dc73"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M10.696 22.917h.078m8.927 34.19h.078M58.176 28.568l11.712 36.778c.545 1.719-1.019 3.367-2.767 2.91l-36.444-9.591"
            />
            <path
              stroke="#f4dc73"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M51.21 64.064c2.414-1.739 4.924-3.99 7.337-6.561 2.54-2.738 4.664-5.537 6.273-8.141M21.49 46.937S15.32 46.46 10 52.207"
            />
            <path
              stroke="#f4dc73"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M31.908 19.9a3.952 3.952 0 1 1-7.904.004 3.952 3.952 0 0 1 7.904-.003"
              clip-rule="evenodd"
            />
            <path
              stroke="#f4dc73"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="5"
              d="M42.438 42.269s-10.82-11.163-27.392-6.444M46.17 11.667s-6.266 8.578.674 18.892"
            />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="none"
              viewBox="0 0 64 64"
              className="opacity-20 absolute"
            >
              <g clip-path="url(#a)">
                <path
                  fill="#121212"
                  d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                />
                <path
                  fill="#4dd67b"
                  fill-rule="evenodd"
                  d="M45.45 26.01 29.895 41.567a2.51 2.51 0 0 1-1.785.741c-.65 0-1.294-.245-1.79-.74l-7.777-7.778a2.527 2.527 0 0 1 3.57-3.574l5.997 5.992 13.766-13.77a2.527 2.527 0 1 1 3.574 3.574M32 0C14.356 0 0 14.356 0 32c0 17.647 14.356 32 32 32s32-14.353 32-32C64 14.356 49.644 0 32 0"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                  />
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="none"
              viewBox="0 0 64 64"
              className="opacity-50 absolute"
            >
              <g clip-path="url(#a)">
                <path
                  fill="#121212"
                  d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                />
                <path
                  fill="#4dd67b"
                  fill-rule="evenodd"
                  d="M45.45 26.01 29.895 41.567a2.51 2.51 0 0 1-1.785.741c-.65 0-1.294-.245-1.79-.74l-7.777-7.778a2.527 2.527 0 0 1 3.57-3.574l5.997 5.992 13.766-13.77a2.527 2.527 0 1 1 3.574 3.574M32 0C14.356 0 0 14.356 0 32c0 17.647 14.356 32 32 32s32-14.353 32-32C64 14.356 49.644 0 32 0"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                  />
                </clipPath>
              </defs>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
              className="absolute"
            >
              <g clip-path="url(#a)">
                <path
                  fill="#121212"
                  d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                />
                <path
                  fill="#4dd67b"
                  fill-rule="evenodd"
                  d="M45.45 26.01 29.895 41.567a2.51 2.51 0 0 1-1.785.741c-.65 0-1.294-.245-1.79-.74l-7.777-7.778a2.527 2.527 0 0 1 3.57-3.574l5.997 5.992 13.766-13.77a2.527 2.527 0 1 1 3.574 3.574M32 0C14.356 0 0 14.356 0 32c0 17.647 14.356 32 32 32s32-14.353 32-32C64 14.356 49.644 0 32 0"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                  />
                </clipPath>
              </defs>
            </svg>
          </>
        )}
      </div>

      <h2
        className={`${theme === "dark" ? "text-white" : "text-black"} text-4xl font-semibold mb-3 max-sm:text-2xl`}
      >
        {firstGame
          ? "Baseline Established!"
          : newPB
            ? "High Score Smashed!"
            : "Test Complete!"}
      </h2>
      <p className="text-neutral-500 text-center">
        {firstGame
          ? "You've set the bar. Now the real challenge begins-time to beat it."
          : newPB
            ? "You're getting faster. That was incredible typing."
            : "Solid run. Keep pushing to beat your high score."}
      </p>

      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-sm:w-full gap-4 *:border *:border-neutral-600 *:py-2 *:px-5 *:rounded-md *:*:first:text-neutral-400 my-12">
        <div>
          <p>WPM:</p>
          <span
            className={`${theme === "dark" ? "text-white" : "text-black"} font-bold text-[1.3rem]`}
          >
            {wpm}
          </span>
        </div>

        <div>
          <p>Accuracy:</p>
          <span
            className={`${accuracy > 99 ? "text-green-500" : "text-red-500"} font-bold text-[1.3rem]`}
          >
            {accuracy}%
          </span>
        </div>

        <div>
          <p>Characters:</p>
          <span className="text-neutral-500 font-bold text-[1.3rem]">
            <span className="text-green-500">{accurateChars}</span>/
            <span className="text-red-500">{incorrectChars}</span>
          </span>
        </div>
      </div>

      <button
        className={`${theme === "dark" ? "text-black bg-white" : "text-white bg-neutral-800"} flex gap-2 px-5 py-3 rounded-lg cursor-pointer transition hover:bg-neutral-400 hover:*:-rotate-360`}
        onClick={() => resetTest()}
      >
        {PB < wpm ? "Beat This Score" : "Go Again"}
        <svg
          className="transition duration-600"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fill={`${theme === "light" ? "white" : "black"}`}
            d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
          />
        </svg>
      </button>
    </div>
  );
}
