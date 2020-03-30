'use strict';
import Def from "./Def.js";
import ItemDef from "./ItemDef.js";
import { canvas } from "./MyCanvas.js";

export default class MenuDef extends Def {
    constructor() {
        super();
        this.itemDefList = [];
        this.activeItemDef = 0;
        this.offset = {
            x: 0,
            y: 0,
        };
        this.properties = {
            NAME: "",
            FULLSCREEN: 0,//not supported
            RECT: {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                hAlign: 0,
                vAlign: 0,
            },
            BACKGROUND: "",
            BLURWORLD: 0,
            VISIBLE: 1,
            STYLE: 0,//doesnt effect menudef
            BORDER: 0,
            BORDERSIZE: 0,
            BORDERCOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            BACKCOLOR: {//does not effect menudef
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            FORECOLOR: {//does not effect menudef
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            DISABLECOLOR: {//doesnt effect menudef
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            FADEAMOUNT: 0,//does not effect menudef
            FADECLAMP: 0,//does not effect menudef
            FADECYCLE: 0,//does not effect menudef
            FADEINAMOUNT: 0,//does not effect menudef
            FOCUSCOLOR: {//does not effect menudef
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            OWNERDRAW: 0,//does not effect menudef
            SOUNDLOOP: "",
            OUTOFBOUNDSCLICK: 0,
            POPUP: 0,//cant be shown in browser
            LEGACYSPLITSCREENSCALE: 0,
        };
    }

    addItemDef() {
        this.activeItemDef = this.itemDefList.length;
        const itemDef = new ItemDef();
        itemDef.parent = this;
        this.itemDefList.push(itemDef);
    }

    getActiveItemDef() {
        return this.itemDefList[this.activeItemDef];
    }

    draw() {

        //check if visible
        if (this.properties.VISIBLE === 0) {
            canvas.setVisible(false);
            return;
        } else {
            canvas.setVisible(true);
        }

        //check blur
        canvas.setScreenBlur(this.properties.BLURWORLD);

        if(this.properties.RECT.w < 0){
            console.log("Menu will not display properly with negative width");
        }
        if (this.properties.RECT.h < 0) {
            console.log("Menu will not display properly with negative height");
        }

        this.offset = this.calculateOffset(this.properties.RECT);

        //play sound
        
        //canvas.getMenuCtx().fillRect(canvas.applyZoom(this.offset.x + this.properties.RECT.x), canvas.applyZoom(this.offset.y + this.properties.RECT.y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));
        this.drawBorders(canvas.applyZoom(this.offset.x + this.properties.RECT.x), canvas.applyZoom(this.offset.y + this.properties.RECT.y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));


        for(let i = 0; i<this.itemDefList.length; i++){
            this.itemDefList[i].draw();
        }

    }

    getPosition(){
        return{
            x: this.properties.RECT.x,
            y: this.properties.RECT.y,
        };
    }

    getOffset(){
        return {
            x: this.offset.x,
            y: this.offset.y,
        };
    }

    onOpen() {

    }

    onClose() {

    }

    onESC() {

    }

    onExecKey() {

    }

    onExecKeyInt() {

    }
}