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
            BACKCOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            FORECOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            DISABLECOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            FADEAMOUNT: 0,
            FADECLAMP: 0,
            FADECYCLE: 0,
            FADEINAMOUNT: 0,
            FOCUSCOLOR: {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
            },
            OWNERDRAW: 0,
            SOUNDLOOP: "",
            OUTOFBOUNDSCLICK: 0,
            POPUP: 0,
            LEGACYSPLITSCREENSCALE: 0,
        };
    }

    addItemDef() {
        this.activeItemDef = this.itemDefList.length;
        this.itemDefList.push(new ItemDef());
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



        canvas.setFillStyle(255, 0, 0, 1);

        //HORIZONTAL_ALIGN_SUBLEFT left edge of a 4:3 screen (safe area not included)
        if (this.properties.RECT.hAlign === 0) {
            this.offset.x = ((canvas.screenSize.x - 640) / 2);
        }
        //HORIZONTAL_ALIGN_LEFT left viewable (safe area) edge
        else if (this.properties.RECT.hAlign === 1) {
            this.offset.x = 0;
        }
        //HORIZONTAL_ALIGN_CENTER center of the screen (reticle)
        else if (this.properties.RECT.hAlign === 2) {
            this.offset.x = (canvas.screenSize.x / 2);
        }
        //HORIZONTAL_ALIGN_RIGHT right viewable (safe area) edge
        else if (this.properties.RECT.hAlign === 3) {
            this.offset.x = canvas.screenSize.x;
        }




        //canvas.getMenuCtx().fillRect(canvas.applyZoom(this.offset.x + this.properties.RECT.x), canvas.applyZoom(this.offset.y + this.properties.RECT.y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));
        this.drawBorders(canvas.applyZoom(this.offset.x + this.properties.RECT.x), canvas.applyZoom(this.offset.y + this.properties.RECT.y), canvas.applyZoom(this.properties.RECT.w), canvas.applyZoom(this.properties.RECT.h));


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