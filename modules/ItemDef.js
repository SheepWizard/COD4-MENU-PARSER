'use strict';
import Def from "./Def.js";
import {canvas} from "./MyCanvas.js";

export default class ItemDef extends Def {
    constructor() {
        super();
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

    }
}