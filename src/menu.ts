import { Deafults, App } from "./classes/app";

let playersNumInput:HTMLInputElement;
let borderElem:HTMLDivElement;
const MAX_PLAYERS = Deafults.MAX_PLAYERS;
const MIN_PLAYERS = Deafults.MIN_PLAYERS;

export let startMenu:Function =():void =>{

     borderElem = document.getElementById("screen") as HTMLDivElement;
     borderElem.className = "startMenuCon";

    let playersNum = 1;
    const header = document.createElement("h1");
    header.innerHTML = "choose number of players";
    header.className = "instructionMsg";
    borderElem.appendChild(header);

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

function render(playersNum:number){
  playersNumInput.value = playersNum + "";
}