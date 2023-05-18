import React, { useEffect } from "react";
import { useParams } from "../context/Context";
import "./Maze.css";

const Maze = () => {
  const { grid, setgrid } = useParams();

  const generateMaze = () => {
    // Clone the existing grid
    const newGrid = grid.map((row) => [...row]);

    // Set all cells as walls
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        newGrid[i][j].isWall = true;
      }
    }

    // Recursive Backtracking algorithm to generate the maze
    const stack = [];
    const startRow = Math.floor(Math.random() * newGrid.length);
    const startCol = Math.floor(Math.random() * newGrid[0].length);
    stack.push({ row: startRow, col: startCol });

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const { row, col } = current;

      // Mark the current cell as visited
      newGrid[row][col].isWall = false;

      // Get unvisited neighbors
      const neighbors = getUnvisitedNeighbors(row, col, newGrid);

      if (neighbors.length > 0) {
        // Choose a random unvisited neighbor
        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];

        // Remove the wall between the current cell and the chosen neighbor
        removeWall(current, randomNeighbor, newGrid);

        // Push the chosen neighbor to the stack
        stack.push(randomNeighbor);
      } else {
        // Backtrack if there are no unvisited neighbors
        stack.pop();
      }
    }

    // Update the grid state with the generated maze
    setgrid(newGrid);
  };

  const getUnvisitedNeighbors = (row, col, grid) => {
    const neighbors = [];

    // Check the top neighbor
    if (row > 1 && grid[row - 2][col].isWall) {
      neighbors.push({ row: row - 2, col });
    }

    // Check the right neighbor
    if (col < grid[0].length - 2 && grid[row][col + 2].isWall) {
      neighbors.push({ row, col: col + 2 });
    }

    // Check the bottom neighbor
    if (row < grid.length - 2 && grid[row + 2][col].isWall) {
      neighbors.push({ row: row + 2, col });
    }

    // Check the left neighbor
    if (col > 1 && grid[row][col - 2].isWall) {
      neighbors.push({ row, col: col - 2 });
    }

    return neighbors;
  };

  const removeWall = (cell1, cell2, grid) => {
    const row = (cell1.row + cell2.row) / 2;
    const col = (cell1.col + cell2.col) / 2;
    grid[row][col].isWall = false;
  };

  // useEffect to generate the maze when the component mounts
  useEffect(() => {
    generateMaze();
  }, []);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell.isWall ? "wall" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
