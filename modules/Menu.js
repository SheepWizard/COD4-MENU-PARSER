import {canvas} from "./MyCanvas.js";
import { convertColour } from "./Utility.js"

export class Menu{
    constructor(){
        this.menuDefList = [];
    }

    draw(){

    }
}

export class Def{
    constructor(){
        
    }

    draw(){

    }

    drawBorders(){
        // const ctx = canvas.getCtx();

        // switch(this.properties.border){
        //     case 1:
        //         ctx.fillStyle = "rgba(" + convertColour(this.properties.borderColor.r) + "," + convertColour(this.properties.borderColor.g) + "," + convertColour(this.properties.borderColor.b) + "," + this.properties.borderColor.a + ")";
        //         this.drawBorderBottom(true);
        //         break;
        // }
    }

    drawBorderBottom(angle){

    }

}

export class MenuDef extends Def{
    constructor(){
        super();
        this.itemDefList = [];
        this.properties = {
            name: "",
            fullscreen: false,
            rect: {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                hAlign: 0,
                vAlign: 0,
            },
            blurworld: 0,
            visible: 1,
            style: 0,
            border: 1,
            borderSize: 0,
            borderColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            backColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            foreColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            disableColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            fadeAmount: 0,
            fadeClamp: 0,
            fadeCycle: 0,
            fadeInAmount: 0,
            focuscolor: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            ownerdraw: 0,
            soundloop: "",
            outOfBoundsClick: false,
            popup: false,
            legacySplitScreenScale: false,
        }
    }

    draw(){
        if(!this.properties.visible){
            canvas.setVisible(false);
            return;
        }else{
            canvas.setVisible(true);
        }

    }

    onOpen(){

    }

    onClose(){

    }

    onESC(){

    }

    onExecKey(){

    }

    onExecKeyInt(){
        
    }
}

export class ItemDef extends Def{
    constructor(){
        super();
        this.properties = {

        }
    }

    draw(){

    }
}