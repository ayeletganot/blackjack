import { Card } from "./card";

/**
 * The class Player creates a game player. 
 */
export class Player{
    // The cards of the player in array.
    private playerCards:Card[];

    constructor(playerCards:Card[]=[]){
        this.playerCards = playerCards;
    }
    getPlayersCards():Card[]{
        return this.playerCards;
    }
    /**The function removes the cards of the player */
    cleanPlayerCards():void{
        this.playerCards.length = 0;
    }

    /**The function enter 2 cards from deck to the player for the beggining of the round. */
    initializePlayerCards(deck:Card[]):void{
        while(deck.length && this.playerCards.length <2){
            this.playerCards.push(deck.pop() as Card)
        }
    }

    /**The function returns the number of cards the player has */
    numberOfCardsPlayerHas():number{
        return this.playerCards.length;
    }

    /**The function returns the cards' score of the player.
        if it's dealer and round didnt over, it wont consider the first card */
    getPlayerScore(skipFirstCard:boolean = false):number{
        let sum:number = 0;
        let acesCount:number = 0;
        for(let i=skipFirstCard? 1:0 ;i<this.playerCards.length;i++){
            let val:number = this.playerCards[i].getTypeValue();
            if(val == 1) acesCount++;
            else sum += val;
            
        }

        sum += acesCount*1;
        while(sum<21 && acesCount>0){
            if(sum+10 <= 21){
                sum += 10;
                acesCount --;
            } else{
                break;
            }          
        }
         return sum;
    }
    
    /**
     * The function gets card from deck and adding it to the player array cards.
     * @param deckCard card from deck to give to player.
     */
    addCardFromDeck(deckCard:Card){
        this.playerCards.push(deckCard);
    }
}



/**
 * The class Player creates a user game player.
 * in addition to regular player it has more features - budget, bet, name etc. 
 */
export class UserPlayer extends Player{
    //The budget of the user player.
    private budget:number;
    //the bet the user player declared.
    private roundBet:number;
    /** The result status of user player in the end of the row.
        undefined - the row hasn't over yet.
        -1:the player lost.
        0: A tie.
        1: winning
        2: blackjack win */ 
    private endRoundStatus?:number;
    //The name Of the Player.
    private name:string;
    //the name of the the player avater.
    private avatarName:string;
    constructor(){
        super();
        this.budget = 2000;
        this.roundBet = 0;
        this.endRoundStatus = undefined;
        this.name = "";
        this.avatarName = "";
    }

    /**Get functions of UserPlayer class fields */
    getBudget(){
        return this.budget;
    }
    getName():string{
        return this.name;
    }
    getavatarName(){
        return this.avatarName;
    }
    getEndRoundStatus(){
        return this.endRoundStatus;
    }     
    getRoundBet():number{
        return this.roundBet;
    }

    /**Set functions of UserPlayer class fields */
    setBudget(updatedBudget:number):void{
            this.budget = updatedBudget;
    }
    setName(name:string){
        this.name = name;
    }
    setavatarName(id:string){
        this.avatarName = id;
    }
    setEndRoundStatus(endRoundStatus?:number){
        this.endRoundStatus = endRoundStatus;
    }
    setRoundBet(roundBet:number):void{
        this.roundBet = roundBet;
    }

    /**
     * The function calculate the updated budget of user player after the rounds ends.  
     * @returns updated budget of user player after the rounds ends.
     */
    getEndRoundUpdatedBuget(){
        let updatedBudget = this.budget;
        switch (this.endRoundStatus) {
            case -1:
                updatedBudget -= this.roundBet;
                break;
            case 0:
                break;
            case 1:
                updatedBudget += this.roundBet;
                break;
            case 2:
                updatedBudget += 1.5* this.roundBet;
                break;
            default:
                break;
        } 
        return updatedBudget;
    }

    /**
     * The function updates thhe user player budget, bet and round status after the round ends.
     * Than returns if the user player 
     * @returns A boolean that declares if the user player ran out of budget and thus will get out the game.
     */
    updateToEndRoundResult(){
        this.setBudget(this.getEndRoundUpdatedBuget());
        this.setRoundBet(0);
        this.setEndRoundStatus(undefined);
        return this.budget == 0;
    }

   

}