import { startMenu } from "./menu";
import { initializePlayersMenu } from "./initializePlayersMenu";
import { startGame } from "./playRound";
import { App  } from "./classes/app";



function render(){
  switch (App.appScreens.getScreenNum()) {
    case 1:
      startMenu && startMenu();
      break;
    case 2:
      initializePlayersMenu && initializePlayersMenu();
      break;
    case 3:
        startGame && startGame();
      break;
      
    default:
      break;
  }
}

App.appScreens.setMoveScreenCallback(render);
render();