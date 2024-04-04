import { Deafults, App } from "./classes/app";

//The number of players for the round that the user selected.
let playersNumInput:HTMLInputElement;
//The container element of the entire screen.
let borderElem:HTMLDivElement;
//The minimum and maximum players number that can play blackjack.
const MAX_PLAYERS = Deafults.MAX_PLAYERS;
const MIN_PLAYERS = Deafults.MIN_PLAYERS;

/**
 * The function that executed after removing to screen 1.
 * it shows menu screen that asks the user how many players to set for the round.   
 */
export let startMenu:Function =():void =>{

     borderElem = document.getElementById("screen") as HTMLDivElement;
     borderElem.className = "startMenuCon";

    let playersNum = 1;
    
    //header display.
    const header = document.createElement("h1");
    header.innerHTML = "choose number of players";
    header.className = "instructionMsg";
    borderElem.appendChild(header);

    //input display of number of playes.
    playersNumInput = document.createElement("input");
    playersNumInput.id = "playersNumInput";
    playersNumInput.type = "number";
    playersNumInput.max = MAX_PLAYERS + "";
    playersNumInput.min = MIN_PLAYERS + "";
    playersNumInput.value = MIN_PLAYERS + "";

    playersNumInput.oninput = (ev:any) =>{
      if( (!ev.target.value) ) {
        playersNum = MIN_PLAYERS;
      }
      else {
        playersNum = parseInt( ev.target.value ); 
        if(playersNum> Deafults.MAX_PLAYERS ) playersNum = MAX_PLAYERS;
        else if(playersNum< Deafults.MIN_PLAYERS) playersNum = MIN_PLAYERS;
    }
    render(playersNum);
   
  }
    
    //button display.
    const startBtn = document.createElement("button");
    startBtn.innerHTML = "start";
    startBtn.className = "menuBtn onlyBtn";
   
    startBtn.onclick = () =>{
      App.round.initializePlayers(playersNum);
      Deafults.removeElements(borderElem);
      if(App.appScreens){
        borderElem.className = "";
        App.appScreens.moveToNextScreen(App.appScreens.getScreenNum()+1);
      } 
    }
  
    borderElem.appendChild(playersNumInput);
    borderElem.appendChild(startBtn);
}

/**
 * The function renders the screens when the number user changes the number of players.
 */
function render(playersNum:number){
  playersNumInput.value = playersNum + "";
}