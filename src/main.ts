import { startMenu } from "./menu";
import { initializePlayersMenu } from "./initializePlayersMenu";
import { startGame } from "./playRound";
import { App  } from "./classes/app";


/**
 * The function renders the current screen by the screen number 
 * (it is activated when switching to a new screen).
 * 1- first menu ,asks the user for the number of players for the round.
 * 2- second menu,asks the user to choose avatar and player name for each player.
 * 3- game screen, the whole round display. 
 */
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