import { Deafults } from "./app";

/**
 * The class Card creates a game card. 
 */
export class Card{
    //The shape of the card - clubs, diamonds, hearts or spades.
    private shape:string;
    //The type of the card: 1-10, prince, queen, king or ace.
    private type:string;

    constructor(shape:string, type:string){
        this.shape = shape;
        this.type = type;
    }

     /**Get functions of Card class fields */
    getType():string{
        return this.type;
    }
    getShape():string{
        return this.shape;
    }
    /**
     * The function returns the value score of the current card.
     * @returns The value score of the cards type.
     */
    getTypeValue():number{
        if(Deafults.cards_types_to_values.has(this.type))
            return Deafults.cards_types_to_values.get(this.type) as number;
        return 0;
    }
    
}
