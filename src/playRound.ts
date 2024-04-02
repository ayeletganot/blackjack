import { UserPlayer } from "./classes/player";
import { Card } from "./classes/card";
import { Screens } from "./classes/screens";
import { Game } from "./classes/game";
import { Deafults } from "./classes/app";
import { App } from "./classes/app";

const borderElem = document.getElementById("screen") as HTMLDivElement;
let screens:Screens;
let round:Game;

function initializeRoundCounter(){
    const roundCountElem = document.createElement("span");
    roundCountElem.innerHTML = "round " + round.getRoundCounter(); 
    roundCountElem.id = "roundCountDetail";
    borderElem.appendChild(roundCountElem);
}


function initialDealerView(){
    const dealerCards = round.getDealer().getPlayersCards();
    const playerDisplayCon = document.createElement("div");
    let isRoundEnded = round.getIsRoundEnded();
    playerDisplayCon.className = "dealer";
    
    const scoreTitle = document.createElement("span");
    scoreTitle.className = "scoreTitle";
    scoreTitle.innerHTML = round.getDealer().getPlayerScore(!isRoundEnded) + "";
    playerDisplayCon.appendChild(scoreTitle);

    let j = 0;
    if(!isRoundEnded){
      const cardElem = document.createElement("img");
      cardElem.className = "sprite sprite-" + "back_card";
      playerDisplayCon.appendChild(cardElem);
      j++;
    }
    for(j;j<dealerCards.length;j++){
      const cardElem = document.createElement("img");
      cardElem.className = "sprite sprite-" + dealerCards[j].getShape() + "-" +dealerCards[j].getType();
      cardElem.className += " card_" + (j+1);
      playerDisplayCon.appendChild(cardElem);
    }
    borderElem.appendChild(playerDisplayCon);
}

function initialplayerView(){
  const players:UserPlayer[] = round.getPlayers();
  let playerTurn:number = round.getPlayerTurn() as number;
  const playersCon = document.createElement("div");
  playersCon.className = "playersCon";
  borderElem.appendChild(playersCon);

  for(let i=0;i<players.length;i++){
    let playerCards:Card[] = players[i].getPlayersCards();
    const playerDisplayCon = document.createElement("div"); 
    playerDisplayCon.className = "playerDisplayCon";
    playerDisplayCon.className += ( (!playerTurn) || (playerTurn != i+1) ) ? " notPlayerTurn" : "";
    playerDisplayCon.style.maxWidth =  (80/players.length) + "%";

    const scoreElem = document.createElement("div");
    scoreElem.className = "scoreTitle";
    scoreElem.innerHTML = players[i].getPlayerScore() + "";
    playerDisplayCon.appendChild(scoreElem);

    const playerCardsCon = document.createElement("div");
    playerCardsCon.className = "playerCardsCon";
    playerDisplayCon.appendChild(playerCardsCon);
    for(let j=0;j<playerCards.length;j++){
      const cardElem = document.createElement("img");
      cardElem.className = "sprite sprite-" + playerCards[j].getShape() + "-" + playerCards[j].getType();
      cardElem.style.position = "absolute";
      cardElem.style.left = (20*j) + "px";
      playerCardsCon.appendChild(cardElem);
    }

    const avatarElem = document.createElement("img");
    avatarElem.className = "sprite sprite-" + players[i].getavatarName() + "_s avatar";
    playerDisplayCon.appendChild(avatarElem);
    
    playersCon.appendChild(playerDisplayCon);
  }
}

function initialGameBtns(){
  const players:UserPlayer[] = round.getPlayers();

  const btnsCon = document.createElement("div");
  btnsCon.className = "btnsCon";
  borderElem.appendChild(btnsCon);
  

  const hitBtn = (document.createElement("button") as HTMLElement);
  hitBtn.innerHTML = "hit";
  hitBtn.className = "gamBtn";
  hitBtn.onclick = () =>{
    let playerTurn = round.getPlayerTurn();
    if( (!playerTurn) || playerTurn == -1) return;
    let canTakeFromDeck:boolean = round.takeCardFromDeck();
   
    if(!canTakeFromDeck){
        round.moveTurnToNextPlayer();
        render();
        if(round.getPlayerTurn() == -1){ //dealer turn.
          round.dealerTakesCardsFromDeck();
          setTimeout( render , 1000);
       }
    } 
    else render();
  }


  const doubleBtn = (document.createElement("button") as HTMLElement) ;
  doubleBtn.innerHTML = "double"; 
  doubleBtn.className = "gamBtn";
  doubleBtn.onclick = ()=>{
    let  playerTurn =  round.getPlayerTurn();
    if( (!playerTurn) || playerTurn == -1) return;
    const currPlayer:UserPlayer = players[playerTurn-1];
    currPlayer.setRoundBet(2*currPlayer.getRoundBet());
    round.takeCardFromDeck();
    round.moveTurnToNextPlayer();
    render();
    if(round.getPlayerTurn() == -1){ //dealer turn.
        round.dealerTakesCardsFromDeck();
        setTimeout( render , 1000);
    }
  }



  const standBtn = (document.createElement("button") as HTMLElement);
  standBtn.innerHTML = "stand";
  standBtn.className = "gamBtn";
  standBtn.onclick = ()=>{
    let playerTurn = round.getPlayerTurn();
    if((!playerTurn) || playerTurn == -1) return;
    round.moveTurnToNextPlayer();
    render();
    if(round.getPlayerTurn() == -1){ //dealer turn.
      round.dealerTakesCardsFromDeck();
      setTimeout( render , 1000);
    }
    

  }
 
    btnsCon.appendChild(hitBtn);
    btnsCon.appendChild(standBtn);
    btnsCon.appendChild(doubleBtn);
  
}



function endRoundDisplay(){
  const players = round.getPlayers();

  const EndRoundMenuCon = document.createElement("div");
  EndRoundMenuCon.id = "EndRoundMenuCon";
  borderElem.appendChild(EndRoundMenuCon);
  
  for(let i=0;i<players.length;i++){
    if(players[i].getEndRoundStatus() != undefined ){
      let endRoundStatus = players[i].getEndRoundStatus() as number;
      let endRoundBet = players[i].getRoundBet();
      let endRoundBudget = players[i].getEndRoundUpdatedBuget();

      const playerResultCon = document.createElement("div");
      playerResultCon.className = "playerResultCon";
      EndRoundMenuCon.appendChild(playerResultCon);

      const avatarElem = document.createElement("img");
      avatarElem.className = "sprite sprite-" + players[i].getavatarName() + "_s avatar";

      const playerStatusDisplay = document.createElement("span");
      playerStatusDisplay.innerHTML = players[i].getName() + " ";
      playerStatusDisplay.className = "playerStatusDisplay";
      switch (endRoundStatus) {
        case -1:
          playerStatusDisplay.innerHTML += "-" + endRoundBet + "$ LOSE "; 
          if(endRoundBudget == 0){
            playerStatusDisplay.innerHTML += "<br>out from the game!";
          }
          break;
        case 0:
          playerStatusDisplay.innerHTML +=   "0$ PUSH ";
          break;
        case 1:
          playerStatusDisplay.innerHTML += "+" + endRoundBet + "$ WIN "; 
          break;
        case 2:
            playerStatusDisplay.innerHTML += "+" + (1.5 * endRoundBet ) + "$ BLACKJACK WIN ";
            break;
        default:
          break;
      }
      playerStatusDisplay.innerHTML += ".................................................$" + endRoundBudget;
      playerResultCon.appendChild(avatarElem);
      playerResultCon.appendChild(playerStatusDisplay);

    }
   

  }

  const startNewGameBtn = document.createElement("button");
  startNewGameBtn.innerHTML = "start new game";
  startNewGameBtn.className = "menuBtn endgameBtn";
  startNewGameBtn.onclick = () =>{
    Deafults.removeElements(borderElem);
    borderElem.className = "";
    round.resetGame(false);
    screens.moveToNextScreen(1);
  }; 
  EndRoundMenuCon.appendChild(startNewGameBtn);

  if(!round.isNextRoundPossible() ) return;

  const continueBtn = document.createElement("button");
  continueBtn.innerHTML = "continue to next round";
  continueBtn.className = "menuBtn endgameBtn";
  continueBtn.onclick = () =>{
    Deafults.removeElements(borderElem);
    borderElem.className = "";
    round.resetGame(true);
    screens.moveToNextScreen(2);
  };
  EndRoundMenuCon.appendChild(continueBtn);

  
}



function render():void{

  Deafults.removeElements(borderElem);
  initializeRoundCounter();
  initialDealerView();
  initialplayerView();
  initialGameBtns();
  if(round.getIsRoundEnded()){
    setTimeout(() =>{endRoundDisplay()} , 3000);
  }
}

export function startGame():void{
  borderElem.className += "border";
  screens = App.appScreens;
  round = App.round;
  render();
}