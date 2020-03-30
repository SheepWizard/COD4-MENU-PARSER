'use strict';

import { canvas } from "./MyCanvas.js";

export default class Def {
    constructor() {

    }

    draw() {

    }

    calculateOffset(rect){
        const offset = {
            x: 0,
            y: 0,
        };
        switch (rect.hAlign) {
            case 0://HORIZONTAL_ALIGN_SUBLEFT left edge of a 4:3 screen (safe area not included)
                offset.x = (canvas.screenSize.x - 640) / 2;
                break;
            case 1://HORIZONTAL_ALIGN_LEFT left viewable (safe area) edge
                offset.x = 0;
                break;
            case 2://HORIZONTAL_ALIGN_CENTER center of the screen (reticle)
                offset.x = canvas.screenSize.x / 2;
                break;
            case 3://HORIZONTAL_ALIGN_RIGHT right viewable (safe area) edge
                offset.x = canvas.screenSize.x;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                offset.x = 0;
                console.log("Alignments 4-7 are not supported");
                break;
            default:
                console.log("Alignment not recognised");
        }

        switch (rect.vAlign) {
            case 0://VERTICAL_ALIGN_SUBTOP top edge of the 4:3 screen (safe area not included)
                offset.y = (canvas.screenSize.y - 480) / 2;
                break;
            case 1://VERTICAL_ALIGN_TOP top viewable (safe area) edge
                offset.y = 0;
                break;
            case 2://VERTICAL_ALIGN_CENTER center of the screen (reticle)
                offset.y = canvas.screenSize.y / 2;
                break;
            case 3://HORIZONTAL_ALIGN_RIGHT right viewable (safe area) edge
                offset.y = canvas.screenSize.y;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                offset.y = 0;
                console.log("Alignments 4-7 are not supported");
                break;
            default:
                console.log("Alignment not recognised");
        }
        return offset;
    }

    drawBorders(x, y, width, height) {
        switch (this.properties.BORDER) {
            //full
            case 1:
                canvas.setFillStyle(this.properties.BORDERCOLOR.r,(this.properties.BORDERCOLOR.g), this.properties.BORDERCOLOR.b, this.properties.BORDERCOLOR.a);
                this._drawBorderBottom(x, y, width, height, true);
                this._drawBordertop(x, y, width, height, true);
                this._drawBorderRight(x, y, width, height, true);
                this._drawBorderLeft(x, y, width, height, true);
                break;
            //horizontal
            case 2:
                canvas.setFillStyle(this.properties.BORDERCOLOR.r, this.properties.BORDERCOLOR.g, this.properties.BORDERCOLOR.b, this.properties.BORDERCOLOR.a);
                this._drawBorderBottom(x, y, width, height, false);
                this._drawBordertop(x, y, width, height, false);
                break;
            //vertical
            case 3:
                canvas.setFillStyle(this.properties.BORDERCOLOR.r, this.properties.BORDERCOLOR.g, this.properties.BORDERCOLOR.b, this.properties.BORDERCOLOR.a);
                this._drawBorderRight(x, y, width, height, false);
                this._drawBorderLeft(x, y, width, height, false);
                break;
            case 4:
                console.log("Not supported in cod4");
                break;
            //raised
            case 5:
                canvas.setFillStyle(this.properties.BORDERCOLOR.r, this.properties.BORDERCOLOR.g,this.properties.BORDERCOLOR.b, this.properties.BORDERCOLOR.a);
                this._drawBordertop(x, y, width, height, true);
                this._drawBorderLeft(x, y, width, height, true);
                canvas.setFillStyle(this.properties.BORDERCOLOR.r / 3, this.properties.BORDERCOLOR.g / 3, this.properties.BORDERCOLOR.b / 3, this.properties.BORDERCOLOR.a);
                this._drawBorderRight(x, y, width, height, true);
                this._drawBorderBottom(x, y, width, height, true);
                break;
            case 6:
                canvas.setFillStyle(this.properties.BORDERCOLOR.r, this.properties.BORDERCOLOR.g, this.properties.BORDERCOLOR.b, this.properties.BORDERCOLOR.a);
                this._drawBorderRight(x, y, width, height, true);
                this._drawBorderBottom(x, y, width, height, true);
                canvas.setFillStyle(this.properties.BORDERCOLOR.r / 3, this.properties.BORDERCOLOR.g / 3, this.properties.BORDERCOLOR.b/ 3, this.properties.BORDERCOLOR.a);
                this._drawBordertop(x, y, width, height, true);
                this._drawBorderLeft(x, y, width, height, true);
                break;
            default:
                break;
        }
    }

    _drawBorderBottom(x, y, width, height, angle) {
        const ctx = canvas.getMenuCtx();
        ctx.beginPath();
        ctx.moveTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        if (angle) {
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, (y + height) - this.properties.BORDERSIZE);
            ctx.lineTo(x + this.properties.BORDERSIZE, (y + height) - this.properties.BORDERSIZE);
        }
        else {
            ctx.lineTo(x + width, (y + height) - this.properties.BORDERSIZE);
            ctx.lineTo(x, (y + height) - this.properties.BORDERSIZE);
        }
        ctx.fill();
    }

    _drawBorderLeft(x, y, width, height, angle) {
        const ctx = canvas.getMenuCtx();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height);
        //angle corners if border is aligned with another border
        if (angle) {
            ctx.lineTo(x + this.properties.BORDERSIZE, (y + height) - this.properties.BORDERSIZE);
            ctx.lineTo(x + this.properties.BORDERSIZE, y + this.properties.BORDERSIZE);
        }
        else {
            ctx.lineTo(x + this.properties.BORDERSIZE, y + height);
            ctx.lineTo(x + this.properties.BORDERSIZE, y);
        }
        ctx.fill();
    }

    _drawBordertop(x, y, width, height, angle) {
        const ctx = canvas.getMenuCtx();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        if (angle) {
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, y + this.properties.BORDERSIZE);
            ctx.lineTo(x + this.properties.BORDERSIZE, y + this.properties.BORDERSIZE);
        }
        else {
            ctx.lineTo(x + width, y + this.properties.BORDERSIZE);
            ctx.lineTo(x, y + this.properties.BORDERSIZE);
        }
        ctx.fill();
    }

    _drawBorderRight(x, y, width, height, angle) {
        const ctx = canvas.getMenuCtx();
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        if (angle) {
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, (y + height) - this.properties.BORDERSIZE);
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, y + this.properties.BORDERSIZE);
        }
        else {
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, y + height);
            ctx.lineTo((x + width) - this.properties.BORDERSIZE, y);
        }
        ctx.fill();
    }

}



