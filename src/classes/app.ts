import { MenuData } from "./menuData";
import { Screens } from "./screens";
import { Game } from "./game";

/**
 * The class Deafults save globally constant variables that used in mulipule places in the code.
 */
export class Deafults{
    //The maximum amount of player in blackjack
    static MAX_PLAYERS  = 6;
    //The minimum amount of player in blackjack
    static MIN_PLAYERS = 1;
    //The coins value types for bet.
    static moneyCoins:readonly number[]=[1,10,100,500,5000];
    //The kinds of cards shapes.
    static cardsKinds:readonly string[] = ["clubs","diamonds","hearts","spades"];
    /**The kinds of cards types and their score values 
       (here ace consider with value 1, but later will change to 11 if necessary ). */ 
    static cards_types_to_values:Map<string, number> = new Map<string, number>([
        ["2", 2],
        ["3", 3],
        ["4", 4],
        ["5", 5],
        ["6", 6],
        ["7", 7],
        ["8", 8],
        ["9", 9],
        ["10", 10],
        ["ace", 1],
        ["prince", 10],
        ["queen", 10],
        ["king", 10]
    ]);

    //The avatars names.
    static AvatersNames = ["whitePuppy" , "humster" ,"monkey" , "cat" , "brownPuppy" , "bird"];

    /**
     * The function gets an element and removes all of its chilrens. 
     * @param fatherElem The father element that caonrains all the children which needs to be removed.
     */
    static removeElements(fatherElem:HTMLDivElement):void{
        while(fatherElem && fatherElem.firstElementChild)
          fatherElem.removeChild(fatherElem.firstElementChild);
    }

}

/**
 * The class App save globally data that used in mulipule places in the code.
 */
export class App{
    //The data of user player in it initialize process (before the beginning of a round).
    static playerMenuData = new MenuData();
    //The data and actions for the app screens and switching between them.  
    static appScreens = new Screens();
    //The data and actions of the current round game;
    static round = new Game();
}