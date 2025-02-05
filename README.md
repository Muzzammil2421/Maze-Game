# Maze Solver with Blockly and Two.js

This project is designed to introduce kids to coding concepts through a fun and interactive maze game.  It combines the visual programming power of Blockly with the 2D rendering capabilities of Two.js.  Kids can create programs by dragging and dropping Blockly blocks, which then control a player character within a maze rendered using Two.js.

## Purpose

The primary goal of this project is to provide an engaging learning experience where kids can learn fundamental programming logic. By using Blockly's drag-and-drop interface, they can create sequences of instructions without needing to write traditional code.  This makes programming more accessible and intuitive, especially for younger learners.  The visual feedback from the Two.js game helps them immediately see the results of their code, reinforcing the connection between instructions and actions. The game focuses on movement commands (right, left, up, down) and a `repeat_until_obstacle` block to introduce the concept of loops and conditional execution.

## Setup and Running

To run this project, simply download the repository and open the `index.html` file in any modern web browser. No additional setup or installations are required.

## Blockly and Two.js Interaction

*   **Blockly:**  Provides the visual programming interface. Kids drag and drop blocks representing actions (move right, move left, etc.) and control flow (repeat until obstacle) to create a program.  Blockly generates JavaScript code based on the arrangement of these blocks.

*   **Two.js:** Renders the game environment.  It draws the maze walls, the player character, and updates the player's position on the screen.

*   **Connection:** The JavaScript code generated by Blockly is sent to the Two.js environment within an iframe. This code then controls the player's movement within the maze. The `repeat_until_obstacle` block intelligently detects the direction based on the first movement block placed inside of it. The player moves in the specified direction until it hits a wall.  This creates a direct link between the visual program created in Blockly and the actions that take place in the Two.js game, allowing kids to immediately see the results of their programming.
