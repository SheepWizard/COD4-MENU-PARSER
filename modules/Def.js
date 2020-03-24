'use strict';

import { canvas } from "./MyCanvas.js";

export default class Def {
    constructor() {

    }

    draw() {

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



