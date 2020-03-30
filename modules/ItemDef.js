'use strict';
import Def from "./Def.js";
import {canvas} from "./MyCanvas.js";

export default class ItemDef extends Def {
    constructor() {
        super();
        this.parent;
        this.offset = {
            x: 0,
            y: 0,
        };
        this.properties = {
            NAME: "",
            RECT: {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                hAlign: 0,
                vAlign: 0,
            },
            ALIGN: 0,//NOT USED,
            BACKCOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            BACKGROUND: 0,
            BORDER: 0,
            BORDERSIZE: 0,
            BORDERCOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            ELEMENTHEIGHT: 0,
            ELEMENTWIDTH: 0,
            ELEMENTTYPE: 0,
            FEEDER: "",
            FORECOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            FOCUSSOUND: "",
            GROUP: "",
            MAXCHARS: 10000,
            MAXPAINTCHARS: 10000,
            NOTSELECTABLE: 0,
            ORIGIN: {
                x: 0,
                y: 0,
            },
            OUTLINECOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            SPECIAL: 0,
            STYLE: 0,
            TEXT: "",
            TEXTALIGN: 0,
            TEXTALIGNX: 0,
            TEXTALIGNY: 0,
            TEXTFILE: 0,
            TEXTFONT: 0,
            TEXTSAVEGAME: 0,
            TEXTSCALE: 1,
            TEXTSTYLE: 0,
            TYPE: 0,
            VISIBLE: 0,
            AUTOWRAPPED: 0,
            DECORATION: 0,
            HORIZONTALSCROLL: 0,
            MAXCHARSGOTONEXT: 0,
        }
    }

    draw() {

        if(this.properties.VISIBLE === 0){
            return;
        }

        if(this.properties.RECT.w < 0){
            console.log(`Itemdef width can not be less then 0 (${this.properties.NAME})`);
            return;
        }
        if (this.properties.RECT.h < 0) {
            console.log(`Itemdef height can not be less then 0 (${this.properties.NAME})`);
            return;
        }

        this.offset = this.calculateOffset(this.properties.RECT);
        this.menuPositon = this.parent.getPosition();
        this.menuOffset = this.parent.getOffset();

        let x = 0;
        //if halign = 0 then we use the offset for menudef
        if(this.properties.RECT.hAlign === 0){
            x = this.menuPositon.x + this.menuOffset.x + this.properties.RECT.x + this.parent.properties.BORDERSIZE;
        }else{
            x = this.menuPositon.x + this.offset.x + this.properties.RECT.x + this.parent.properties.BORDERSIZE;
        }
        let y = 0;
        if(this.properties.RECT.vAlign === 0){
            y = this.menuPositon.y + this.menuOffset.y + this.properties.RECT.y + this.parent.properties.BORDERSIZE;
        }else{
            y = this.menuPositon.y + this.offset.y + this.properties.RECT.y + this.parent.properties.BORDERSIZE;
        }

        const ctx = canvas.getMenuCtx();

        if (this.properties.STYLE === 1) {// filled with background color
            canvas.setFillStyle(255, 0, 0, 1);
           // ctx.fillRect(0,0,100,100);
            ctx.fillRect(canvas.applyZoom(x), canvas.applyZoom(y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));
            //ctx.fillRect(x,y,this.properties.RECT.w,this.properties.RECT.h)
        }


    }
}