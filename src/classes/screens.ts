/**
 * The class Screens reposible for the transition betweens screens in the app.
 */
export class Screens{
    //The number of the current screen.
    private screenNum:number;
    //The callback that is responsible for transition betweens screens.
    private moveScreenCallback?:Function;

    constructor(){
        this.screenNum = 1;
    }
    
     /**Get and set functions of Screen class fields */
    setMoveScreenCallback(moveScreenCallback:Function){
        this.moveScreenCallback = moveScreenCallback;
    }
    getScreenNum(){
        return this.screenNum;
    }

   /**
    * The function actiavte the callback hat is responsible for transition betweens screens.
    */
    activateMoveScreenCallback():void{
        if(this.moveScreenCallback) this.moveScreenCallback();
    }
    /**
     * The function removes the app to the next screen (given the number of the next one).
     * @param nextScreenNum The number of the next screen.
     */
    moveToNextScreen(nextScreenNum:number){
        this.screenNum =nextScreenNum;
        this.activateMoveScreenCallback();
    }
}