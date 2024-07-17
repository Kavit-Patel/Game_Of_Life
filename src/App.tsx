import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import Rules from "./components/Rules";
import { BiReset } from "react-icons/bi";

const emptyGrid = () =>
  Array(30)
    .fill(0)
    .map(() => Array(30).fill(false));

const compareGrids = (grid1: boolean[][], grid2: boolean[][]) => {
  for (let i = 0; i < grid1.length; i++) {
    for (let j = 0; j < grid2.length; j++) {
      if (grid1[i][j] !== grid2[i][j]) {
        return false;
      }
    }
  }
  return true;
};
const App = () => {
  const [grid, setGrid] = useState<boolean[][]>(emptyGrid());
  const [play, setPlay] = useState<boolean>(false);

  const activeCell = (i: number, j: number) => {
    const activeGrid = grid.map((row, rowIndex) =>
      row.map((col, colIndex) =>
        rowIndex === i && colIndex === j ? !col : col
      )
    );
    setGrid(activeGrid);
  };

  const nextGrid = (oldGrid: boolean[][]) => {
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const newGrid = oldGrid.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        const liveNeighbors = neighbors.reduce((count, [x, y]) => {
          if (
            rowIndex + x >= 0 &&
            rowIndex + x < 30 &&
            colIndex + y >= 0 &&
            colIndex + y < 30
          ) {
            return count + (oldGrid[rowIndex + x][colIndex + y] ? 1 : 0);
          }
          return count;
        }, 0);
        if (col) {
          return (col = liveNeighbors === 2 || liveNeighbors === 3);
        } else {
          return (col = liveNeighbors === 3);
        }
      })
    );
    return newGrid;
  };

  const random = () => {
    const randomGrid = grid.map((row) =>
      row.map(() => {
        return Math.random() > 0.9 ? true : false;
      })
    );
    setGrid(randomGrid);
  };

  useEffect(() => {
    let intervalId: number;
    if (play) {
      intervalId = setInterval(
        () =>
          setGrid((prev) => {
            const response = nextGrid(prev);

            if (compareGrids(response, prev)) {
              clearInterval(intervalId);
              setPlay(false);
            }
            return response;
          }),
        500
      );
    }
    return () => clearInterval(intervalId);
  }, [play]);
  return (
    <main className="w-full min-h-screen bg-blue-400 flex flex-col items-center">
      <div className=" w-full flex justify-center items-center text-sm md:text-2xl lg:text-4xl font-extrabold text-blue-300 py-2">
        Conway's Game of Life
      </div>
      <section className="w-full flex flex-col md:flex-row bg-slate-600 pt-1.5 gap-3">
        <div className="flex-1 justify-center items-center hidden lg:flex text-gray-200">
          <Rules />
        </div>
        <div className="w-full flex flex-1 lg: flex-col items-center ">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((col, colIdx) => (
                <div
                  key={colIdx}
                  onClick={() => activeCell(rowIdx, colIdx)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-[18px] md:h-[18px]  border   ${
                    col
                      ? "bg-yellow-400 border-gray-400"
                      : " bg-neutral-400 border-gray-300  bg-opacity-90 border-opacity-70"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 hidden lg:flex"></div>
      </section>
      <div className="bg-slate-600 w-full flex justify-center items-center gap-2 md:gap-8 h-20 lg:flex-grow">
        <button className="bg-sky-500 px-3 md:px-4 py-2 rounded-3xl flex justify-center items-center gap-2 md:gap-4 text-white text-sm md:text-xl border-sky-900 transition-all active:scale-95 ">
          <span className="">
            <TbArrowsRandom />
          </span>
          <span onClick={() => random()} className="font-semibold">
            Random
          </span>
        </button>
        <button className="bg-blue-600 px-4 md:px-8 py-2 rounded-3xl flex justify-center items-center gap-2 md:gap-4 text-white text-sm md:text-xl border-blue-900 transition-all active:scale-95 ">
          <span className="">
            <FaPlay />
          </span>
          <span
            onClick={() => setPlay((prev) => !prev)}
            className="font-semibold"
          >
            {play ? "Pause" : "Start"}
          </span>
        </button>
        <button className="bg-gray-500 px-3 md:px-6 py-2 rounded-3xl flex justify-center items-center gap-2 md:gap-4 text-white text-sm md:text-xl border-gray-900 transition-all active:scale-95 ">
          <span className="">
            <BiReset />
          </span>
          <span
            onClick={() => {
              setPlay(false);
              setGrid(emptyGrid());
            }}
            className="font-semibold"
          >
            Reset
          </span>
        </button>
      </div>
      <div className="text-gray-950 m-4 overflow-y-auto lg:hidden w-[60%]">
        <Rules />
      </div>
    </main>
  );
};

export default App;
