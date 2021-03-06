'use strict';
import Def from "./Def.js";
import {canvas} from "./MyCanvas.js";
import Terminal from "./Terminal.js";

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
            ALLOWBINDING: "",
            SELECTICON: "",
            DVAR: "",
            DVARTEST: "",
            MAXCHARS: 10000,
            MAXPAINTCHARS: 10000,
            NOTSELECTABLE: 0,
            SELECTBORDER:{
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
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
            USEPAGING: 0,
        }
    }

    draw() {

        if(this.properties.VISIBLE === 0){
            return;
        }

        if(this.properties.RECT.w < 0){
            Terminal.printText(`Itemdef width can not be less then 0 (${this.properties.NAME})`, { r: 255, g: 0, b: 255 });
            return;
        }
        if (this.properties.RECT.h < 0) {
            Terminal.printText(`Itemdef height can not be less then 0 (${this.properties.NAME})`, { r: 255, g: 0, b: 255 });
            return;
        }

        this.offset = this.calculateOffset(this.properties.RECT);
        this.menuPositon = this.parent.getPosition();
        this.menuOffset = this.parent.getOffset();

        let x = 0;
        //if halign = 0 then we use the offset for menudef
        if(this.properties.RECT.hAlign === 0){
            //if we have a border, apply border size of both menudef and itemdef to origin
            if(this.parent.properties.BORDER !== 0){
                x = this.menuPositon.x + this.menuOffset.x + this.properties.RECT.x + this.parent.properties.BORDERSIZE + this.properties.BORDERSIZE;
            }else{
                x = this.menuPositon.x + this.menuOffset.x + this.properties.RECT.x;
            }
            
        }else{
            if (this.parent.properties.BORDER !== 0) {
                x = this.menuPositon.x + this.offset.x + this.properties.RECT.x + this.parent.properties.BORDERSIZE + this.properties.BORDERSIZE;
            }else{
                x = this.menuPositon.x + this.offset.x + this.properties.RECT.x;
            }
        }
        x += this.properties.ORIGIN.x;
        let y = 0;
        if(this.properties.RECT.vAlign === 0){
            if (this.parent.properties.BORDER !== 0) {
                y = this.menuPositon.y + this.menuOffset.y + this.properties.RECT.y + this.parent.properties.BORDERSIZE + this.properties.BORDERSIZE;
            }else{
                y = this.menuPositon.y + this.menuOffset.y + this.properties.RECT.y;
            }
        }else{
            if (this.parent.properties.BORDER !== 0) {
                y = this.menuPositon.y + this.offset.y + this.properties.RECT.y + this.parent.properties.BORDERSIZE + this.properties.BORDERSIZE;
            }else{
                y = this.menuPositon.y + this.offset.y + this.properties.RECT.y;
            }
        }
        y += this.properties.ORIGIN.y;

        const ctx = canvas.getMenuCtx();

        //draw rect
        if (this.properties.STYLE === 1) {// filled with background color
            canvas.setFillStyle(this.properties.BACKCOLOR.r, this.properties.BACKCOLOR.g, this.properties.BACKCOLOR.b, this.properties.BACKCOLOR.a);

            //if we have background, draw background image with backcolour filter as overlay
            //if background but no backcolor, draw black

            //if we have a border make size smaller
            if(this.properties.BORDER !== 0){
                ctx.fillRect(canvas.applyZoom(x), canvas.applyZoom(y), canvas.applyZoom(this.properties.RECT.w - this.properties.BORDERSIZE), canvas.applyZoom(this.properties.RECT.h - this.properties.BORDERSIZE));
            }else{
                ctx.fillRect(canvas.applyZoom(x), canvas.applyZoom(y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));
            }
        }else if(this.properties.STYLE === 2){
            Terminal.printText("Style 2 (gradiant) does not work on Cod4", { r: 255, g: 0, b: 255 })
        }else if(this.properties.STYLE === 3){
            //draw background
            //if no background draw missing texture
            //overlay forecolor filter
        }
        //draw border
        if(this.properties.BORDER !== 0){
            this.drawBorders(canvas.applyZoom(x), canvas.applyZoom(y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));
        }

        //draw text
        if(this.properties.TEXT !== ""){
            
        }


    }
}