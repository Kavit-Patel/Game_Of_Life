const Rules = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex flex-col gap-3 px-3 text-xs">
        <h2 className="text-xl">Game of Life Explanation</h2>
        <p>All cells are in died state initially</p>
        <p>By Clicking on cells, You can make them alive</p>
        <p>RULES:</p>
        <p>
          1. Every cell observes its surrounding neighbours to check whether its
          living area is underpopulated, overpopulated or suitable to live in.{" "}
        </p>
        <p>
          2. Each cell has 8 neighbours (except for the ones at the edge of the
          grid).{" "}
        </p>
        <p>
          3. A dead cell will come alive if exactly 3 neighbours are living.{" "}
        </p>
        <p>
          4. A living cell will stay alive if 2 or 3 neighbours are living.{" "}
        </p>
        <p>
          5. Cells with less than 2 neighbours will die of underpopulation.{" "}
        </p>
        <p>6. cells with 4 or more neighbours will die of overpopulation.</p>
      </div>
    </div>
  );
};

export default Rules;
