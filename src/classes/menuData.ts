/**
 * The class MenuData reposible for keeping data of user 
 * player in it initialize process (before the beginning of a round).
 */
export class MenuData{
    //The current user player index we initialize.
    private playerCurrIndex:number;
    //The current user player coins he choose for bet in array.
    private coinsArr:number[];
    /** The stage of initialization
    1- choose user player name and avatar.
    2- choose user player bet */ 
    private stage:number;
    //The player avatar name
    private avatarName:string;
    // The player name.
    private name:string;
    constructor(){
        this.playerCurrIndex = 0;
        this.coinsArr = [];
        this.stage = 1 ;   
        this.avatarName = "";
        this.name = "";
    }
    /**
     * The function resets all field for the next player initialization,
     *  or for moving to the beginning of the round.
     * @param isMovingToNextPlayer declare if the menu continues to initialize the 
     * next player to reset the fields accordingly.
     */
    reset(isMovingToNextPlayer:boolean){     
        this.playerCurrIndex = isMovingToNextPlayer? this.playerCurrIndex+1  :0;
        this.coinsArr = [];
        this.stage = 1 ;   //1-choose player , 2-chhose bet
        this.avatarName = "";
        this.name = "";
    }

    /**Get functions of Screen class fields */
    getplayerCurrIndex(){
        return this.playerCurrIndex;
    }
    getcoinsArr(){
        return this.coinsArr;
    }
    getStage(){
        return this.stage;
    }
    getavatarName(){
        return this.avatarName;
    }
    getName(){
        return this.name;
    }

    /**Set and set functions of Screen class fields */
    setplayerCurrIndex(index:number){
        this.playerCurrIndex = index;
    }
    setStage(stage:number){
        this.stage = stage;
    }
    setavatarName(avatarName:string){
        this.avatarName=avatarName;
    }
    setName(name:string){
        this.name = name;
    }

    /**
     * The function adds coin bet for the coins bet coins of the use player.
     * @param coin A coin value of bet to add the coins bet array 
     */
    addCoin(coin:number){
        this.coinsArr.push(coin);
    }

    /**
     * The function remove coin the newest bet coin from bet coins of the use player.
     */
    removeCoin(){
        this.coinsArr.pop();
    }
    
}