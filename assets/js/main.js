document.addEventListener("DOMContentLoaded", function () {
  var blocklyDiv = document.getElementById("blocklyDiv");
  var blocklyArea = document.getElementById("blocklyArea");
  var gameIframe = document.getElementById("gameIframe");
  var gameWindow =
    gameIframe.contentWindow || gameIframe.contentDocument.defaultView;

  // Define blocks and generators *before* injecting Blockly

  // Move Right
  Blockly.Blocks["move_right"] = {
    init: function () {
      this.appendDummyInput().appendField("Move Right");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javascript.javascriptGenerator.forBlock["move_right"] = function (
    block,
    generator
  ) {
    return "moveRight();\n";
  };

  // Repeat Until Obstacle
  Blockly.Blocks["repeat_until_obstacle"] = {
    init: function () {
      this.appendDummyInput().appendField("Repeat Until Obstacle");
      this.appendStatementInput("DO").setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120); // Different color
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };

  javascript.javascriptGenerator.forBlock["repeat_until_obstacle"] = function (
    block,
    generator
  ) {
    var doCode = generator.statementToCode(block, "DO");
    // The direction will be determined by the *first* movement block inside the loop.
    var firstMoveBlock = block.getInputTargetBlock("DO");

    if (firstMoveBlock) {
      var direction = null;

      if (firstMoveBlock.type === "move_right") {
        direction = "right";
      } else if (firstMoveBlock.type === "move_left") {
        direction = "left";
      } else if (firstMoveBlock.type === "move_up") {
        direction = "up";
      } else if (firstMoveBlock.type === "move_down") {
        direction = "down";
      }

      if (direction) {
        return `
            while (!obstacleDetected('${direction}')) {
                ${doCode}
            }
            `;
      } else {
        return "// No valid movement block found inside the loop.\n"; // Or handle it differently
      }
    } else {
      return "// No code inside the loop.\n"; // Or handle it differently
    }
  };

  // Move Left
  Blockly.Blocks["move_left"] = {
    init: function () {
      this.appendDummyInput().appendField("Move Left");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javascript.javascriptGenerator.forBlock["move_left"] = function (
    block,
    generator
  ) {
    return "moveLeft();\n";
  };

  // Move Up
  Blockly.Blocks["move_up"] = {
    init: function () {
      this.appendDummyInput().appendField("Move Up");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javascript.javascriptGenerator.forBlock["move_up"] = function (
    block,
    generator
  ) {
    return "moveUp();\n";
  };

  // Move Down
  Blockly.Blocks["move_down"] = {
    init: function () {
      this.appendDummyInput().appendField("Move Down");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    },
  };
  javascript.javascriptGenerator.forBlock["move_down"] = function (
    block,
    generator
  ) {
    return "moveDown();\n";
  };

  var workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("toolbox"),
    trashcan: true,
  });

  var runButton = document.getElementById("runButton");

  var resetButton = document.getElementById("resetButton");

  resetButton.addEventListener("click", function () {
    gameIframe.contentWindow.postMessage("resetGame", "*"); // Send reset message FIRST
  });

  runButton.addEventListener("click", function () {
    executeCode(); // Call the function to execute the code
  });

  function executeCode() {
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    if (gameWindow) {
      gameIframe.contentWindow.postMessage(code, "*"); // Use postMessage
    } else {
      console.warn(
        "gameWindow is not available yet. Iframe might not be loaded."
      );
    }
  }

  function onResize() {
    var element = blocklyDiv;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    blocklyArea.style.left = x + "px";
    blocklyArea.style.top = y + "px";
    blocklyArea.style.width = blocklyDiv.offsetWidth + "px";
    blocklyArea.style.height = blocklyDiv.offsetHeight + "px";
    Blockly.svgResize(workspace);
  }

  window.addEventListener("resize", onResize);
  onResize();
});
