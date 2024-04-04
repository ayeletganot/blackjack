import { UserPlayer } from "./classes/player";
import { Screens } from "./classes/screens";
import { Deafults ,App } from "./classes/app";
import { Game } from "./classes/game";

//The container element of the entire screen.
let borderElem:HTMLDivElement;
//The app screens data and actions.  
let screens:Screens;
//The app round.
let round:Game;
//The round players.
let players:UserPlayer[];
//The indecator if it's the first round.
let isFirstRound:boolean;
//An object with data of the current user player at it initialize process.
let playerMenuData = App.playerMenuData;

/**
 * The function returns the sum of its array values.
 */
function sum(arr:number[]):number{
    let sumArr=0;
    for(let i=0;i<arr.length;i++){
        sumArr += arr[i];
    }
    return sumArr;
}

/**
 * The function displays the header view in the menu.
 */
function headerView(){
    let playerCurrIndex = playerMenuData.getplayerCurrIndex();
    let stage = playerMenuData.getStage();

    const playerHeader = document.createElement("h1");
    switch (stage) {
        case 1:
            playerHeader.innerText = "player " + (playerCurrIndex+1) + " enter name and choose your avatar";
            break;
        case 2:
            playerHeader.innerText = players[playerCurrIndex].getName() + " choose your bet";
            break;
        default:
            break;
    }
    
    playerHeader.className = "instructionMsg";
    borderElem.appendChild(playerHeader);
}

/**
 * The function displays the user player bet choice view in the menu.
 */
function betView(){
    const moneyCoins =  Deafults.moneyCoins;
    let coinsArr = playerMenuData.getcoinsArr();
    let playerCurrIndex = playerMenuData.getplayerCurrIndex();
    let remaimingBudget = players[playerCurrIndex].getBudget() - sum(coinsArr);

    let coinsContainer = document.createElement("div");
    coinsContainer.id = "coinsContainer";
    borderElem.appendChild(coinsContainer);

    const budgetElem = document.createElement("span");
    budgetElem.innerHTML = "budget: " +  remaimingBudget + "$"; 
    budgetElem.id = "budgetDetail";
    borderElem.appendChild(budgetElem);

    for(let j=0;j<moneyCoins.length;j++){
        let coin = document.createElement("button");
        coin.className = "coin" + (remaimingBudget < moneyCoins[j] ? " disabledBtn" :"" );
        coin.innerHTML = moneyCoins[j] + "";
        coin.onclick = () =>{
            if(remaimingBudget < moneyCoins[j]) return;
            coinsArr.push(moneyCoins[j]);
            render();
        }
        coinsContainer.appendChild(coin);
    }

}

/**
 * The function displays the user player name and avater choice view in the menu.
 */
function playerView(){

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = 10;
    nameInput.value = playerMenuData.getName();
    nameInput.placeholder = "enter you name";
    nameInput.id = "nameInput";
    nameInput.onchange = (ev:any) =>{
        playerMenuData.setName(ev.target.value);
        render();
    }
    borderElem.appendChild(nameInput);

    const playersCon = document.createElement("div");
    playersCon.className = "playersConMenu";
    borderElem.appendChild(playersCon);
    for(let i=0;i<Deafults.AvatersNames.length;i++){
        let playerAvatar = document.createElement("img");
        playerAvatar.className = "sprite sprite-" + Deafults.AvatersNames[i];

        playerAvatar.onclick = ()=>{
            playerMenuData.setavatarName( Deafults.AvatersNames[i] );
            playerAvatar.className += " selectedAvatar";
            render();

        };       
        playersCon.appendChild(playerAvatar);
    }
    
}

/**
 * The function displays the buttons view in the menu, when the user choose avatar and player name;
 */
function btnsNameAndAvatarView(){
    let avatarName = playerMenuData.getavatarName();
    let name = playerMenuData.getName();
    let playerCurrIndex = playerMenuData.getplayerCurrIndex();

    const isNotvalid =  ( avatarName == "" || name == "");
    const saveBtn = document.createElement("button");
    borderElem.appendChild(saveBtn);
    saveBtn.innerHTML="save";
    saveBtn.className = "menuBtn onlyBtn" + (isNotvalid?" disabledBtn" :"");
    saveBtn.disabled = isNotvalid;
    saveBtn.onclick = ()=>{

        players[playerCurrIndex].setavatarName(avatarName);
        players[playerCurrIndex].setName(name)
        playerMenuData.setStage(2);
        render();
    }

}

/**
 * The function displays the buttons view in the menu, when the user choose his bet.
 */
function btnsBetView(){

    let playerCurrIndex = playerMenuData.getplayerCurrIndex();
    let coinsArr = playerMenuData.getcoinsArr();
    const isNotvalid = coinsArr.length == 0;
    
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML="save";
    saveBtn.className = "menuBtn" + (isNotvalid?" disabledBtn" :"");
    saveBtn.disabled = isNotvalid;
    saveBtn.onclick = ()=>{
     
        if(!coinsArr.length) return;
        players[playerCurrIndex].setRoundBet( sum(coinsArr));
        if(playerCurrIndex < players.length-1){
            playerMenuData.reset(true);
            if(!isFirstRound) playerMenuData.setStage(2);
            render();
        }
        else{
            playerMenuData.reset(false);
            round.dealingCards();
            Deafults.removeElements(borderElem);
            borderElem.className = "";
            screens.moveToNextScreen(screens.getScreenNum()+1);
        }
            
    };

    const undoBtn = document.createElement("button");
    undoBtn.innerHTML="undo";
    undoBtn.className = "menuBtn";
    undoBtn.onclick = ()=>{
        if(coinsArr.length == 0) return;
        coinsArr.pop();
        render();         
    }

    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML="cancel";
    cancelBtn.className = "menuBtn";
    cancelBtn.onclick = ()=>{
        if(coinsArr.length == 0) return;
        coinsArr.length = 0;
        render();
    }  

    borderElem.appendChild(saveBtn);
    borderElem.appendChild(undoBtn);
    borderElem.appendChild(cancelBtn);
}

/**
 * The function renders the screens when changes occures.
 */
function render():void{
    console.log(playerMenuData);
    Deafults.removeElements(borderElem);
    let stage = playerMenuData.getStage();
    headerView();
    //shows name and avatar menu.otherwise, shows bet menu.
    if(stage == 1){
        borderElem.className = "nameAndAvatarMenuCon";
        playerView();
        btnsNameAndAvatarView();
    } 
    else{
        borderElem.className = "betMenuCon";
        betView();
        btnsBetView();
    }  
}

/**
 * The function that executed after removing to screen 2.
 * it resets varibales and then renders the screen. 
 */
export let initializePlayersMenu:Function = ():void =>{
    borderElem =  document.getElementById("screen") as HTMLDivElement;
    screens = App.appScreens;
    round = App.round;
    players = round.getPlayers();
    isFirstRound = round.getRoundCounter() == 1;

    if(!isFirstRound) playerMenuData.setStage(2);
    borderElem.className = playerMenuData.getStage() == 1? "nameAndAvatarMenuCon": "betMenuCon";
    render();      
} 
