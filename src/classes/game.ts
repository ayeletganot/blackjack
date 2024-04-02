import { Card} from "./card";
import { Player ,UserPlayer } from "./player";
import { Deafults } from "./app";


/**
 * The class Game creates a round game with user players, deck and dealer. 
 */
export class Game{
    // The number count of the current round. 
    private roundCounter:number;
    // The deck of the round in array. 
    private deck:Card[];
    //The user players of the round in array.
    private players:UserPlayer[];
    // The dealer of the round.
    private dealer:Player;
    /** The indecator of whose turn.
        undefined round hasen't started yet.
        >=1 it's user player turn.
        -1 - it's dealer turn. 
    */
    private playerTurnNum?:number;
    //The indecator if round ended.
    private isRoundEnded:boolean;

    constructor(){
        this.deck = [];
        this.players = [];
        this.dealer = new Player();
        this.playerTurnNum = undefined;
        this.isRoundEnded = false;
        this.roundCounter = 1;
    }


    /**
     * The function resets the game object for the next round/new round.
     * @param isGoingToNextRound - declare if reset for next round, otherwise is false. 
     */
    resetGame(isGoingToNextRound:boolean){
        this.deck.length = 0;
        for(let i=0;i<this.players.length;i++){
            this.players[i].cleanPlayerCards();
        }
        this.dealer.cleanPlayerCards();

        if(isGoingToNextRound){
            this.updateEndRoundPlayerResults();
            this.roundCounter += 1;
        }   
        else{
            this.players.length = 0;
            this.roundCounter= 1;
        }
        this.isRoundEnded = false;
    }
    /**
     * The function dealing the cards for deck, players and dealer before the round begins.
     */
    dealingCards(){
        this.initializeDeck();
        this.mixCards();
        this.dealer.initializePlayerCards(this.deck);
        this.initializeCardsOfUserPlayers();
        this.playerTurnNum = 1;
    }

    /**
     * The function initialize all the user players of the round. 
     * @param playeresNum declare the number of players in the round.
     */
    initializePlayers(playeresNum:number):void{
        for(let i=0;i<playeresNum;i++){ 
            let player =  new UserPlayer();
            this.players.push(player);
        }
    }
    
    /**
     * The function initialize the deck of the round. 
     */
    private initializeDeck(){
        const  cardsKinds:readonly string[] =  Deafults.cardsKinds;
        const cards_types_to_values:Map<string, number> = Deafults.cards_types_to_values;
        for(let [type , value] of cards_types_to_values){
            for(let j=0;j<cardsKinds.length;j++){
              let gameCard = new Card(cardsKinds[j],type);
              this.deck.push(gameCard);
            }
        }
    }
    
    /**
     * The function initialize the cards of each user player at the beginning of the row.  
     */
    private initializeCardsOfUserPlayers():void{
        for(let i=0;i<this.players.length;i++){ 
            this.players[i].initializePlayerCards(this.deck);
        }
    }

    /**
     * The function mixes take the deck of the round sorted and mix it's cards randomly. 
     */
    private mixCards():void{
        const scoreOfCardsIndex = new Map(); 
        const tempDeckArr:Card[] = [];
        const scoresArr = [];

        for(let i=0;i<this.deck.length;i++){
            scoreOfCardsIndex.set(Math.random(), i);
        }
        for(let [score,cardIndex] of scoreOfCardsIndex){
            scoresArr.push(score);
        }
        scoresArr.sort();
        for(let i=0;i<scoresArr.length;i++){
            let randomCardIndex = scoreOfCardsIndex.get(scoresArr[i]);
            tempDeckArr.push(this.deck[randomCardIndex]);
        }
        this.deck.length = 0;
        while(tempDeckArr.length){
            this.deck.push(tempDeckArr.pop() as Card);   
        }
    }

    /**get and set function of Game class fields */
    getDeck():Card[]{
        return this.deck;
    }
    getPlayers():UserPlayer[]{
        return this.players;
    }
    getDealer():Player{
        return this.dealer;
    }
    getPlayerTurn():number| undefined{
        return this.playerTurnNum;
    }

    getIsRoundEnded():boolean{
        return  this.isRoundEnded;
    }

    getRoundCounter():number{
        return this.roundCounter;
    }

    setIsRoundEnded(isRoundEnded:boolean){
        this.isRoundEnded = isRoundEnded;
    }

    /**
     * The function updates whose turn next after the end off the current turn.
     * if all user players played, then it's the dealer turn and playerTurnNum will be -1.
     */
    moveTurnToNextPlayer(){
        if(!this.playerTurnNum) return;
        if(this.players.length > this.playerTurnNum)
            this.playerTurnNum++; 
        else
            this.playerTurnNum = -1;   
    }

    /**
     * The function takes card from deck to current player.
     * @param isdealerPlay declares if dealer takes card from the deck.
     * @returns if its possible to take another card. 
     */
    takeCardFromDeck(isdealerPlay:boolean = false):boolean{
        if(this.deck.length){
            const  player = isdealerPlay ? this.dealer : this.players[(this.playerTurnNum as number)-1];
            if(player.getPlayerScore() <21){
                player.addCardFromDeck(this.deck.pop() as Card);
                return player.getPlayerScore() <21;
            }     
        }
        return false;
           
    }

    /**
     * The function takes cards from deck to dealer as long as it's valid.
     * Then it's declare the end of the round and the winners/losers.
     * In blackjack rules, if the dealer score supress 17, he can't take cards anymore.
     */
    dealerTakesCardsFromDeck(){
        let dealerScore = this.dealer.getPlayerScore();        
        while( dealerScore < 17){
            this.takeCardFromDeck(true);
            dealerScore = this.dealer.getPlayerScore();
        }
        this.checkPlayersEndStatus();
        this.isRoundEnded = true;
        this.playerTurnNum = undefined;
    }

    /**
     * The function check the status of each user player in the end of the round.
     * -1:the player lost.
     * 0: A tie.
     * 1: winning
     * 2: blackjack win
     */
    private checkPlayersEndStatus(){
        const dealerScore:number = this.dealer.getPlayerScore();
        const isDealerHasBlackJack = (dealerScore == 21 && this.dealer.numberOfCardsPlayerHas() == 2 );
        for(let i=0;i<this.players.length;i++){
            let playerScore = this.players[i].getPlayerScore();
            

            if(playerScore >21){
                if(dealerScore>21) this.players[i].setEndRoundStatus(0);
                else this.players[i].setEndRoundStatus(-1);
            }
            else if(playerScore == 21 && this.players[i].numberOfCardsPlayerHas() == 2){   //got blackjack
                if(isDealerHasBlackJack) this.players[i].setEndRoundStatus(0);
                else this.players[i].setEndRoundStatus(2);
            }
            else if(playerScore == 21){  //got 21 without blackjack.
                if(isDealerHasBlackJack) this.players[i].setEndRoundStatus(-1);
                else if(dealerScore==21) this.players[i].setEndRoundStatus(0);
                else this.players[i].setEndRoundStatus(1);
            }
            else{
                if(dealerScore>21) this.players[i].setEndRoundStatus(1);
                else if(dealerScore > playerScore) this.players[i].setEndRoundStatus(-1);
                else if(dealerScore == playerScore) this.players[i].setEndRoundStatus(0);
                else this.players[i].setEndRoundStatus(1);
            }
        }
    }

    /**
     * The function checks after the round ends if all the user players get out from the game 
     * (because they used all their budget).if it's true the function return that it's not possible to continue to next round.
     * otherwise true.
     * @returns if it's possible to continue to next round.
     */
    isNextRoundPossible(){
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].getEndRoundUpdatedBuget() != 0)
                return true;
        }
        return false;
    }

    /**
     * The function updates the user players details for the next round (according to their end game status). 
     * if user player got out from the game, it removes him.
     */
    private updateEndRoundPlayerResults(){
        for(let i=0;i<this.players.length;i++){
            let isPlayerRemoved = this.players[i].updateToEndRoundResult() 
            if(isPlayerRemoved){
                this.players.splice(i,1);
                i--;
            }
        }
    }
    
 
}