'use strict';

import {convertColour} from "./Utility.js";

class MenuCanvas{
    constructor(){
        this.menu;
        this.menuCanvas;
        this.menuCtx;
        this.screenCanvas;
        this.screenCtx;
        this.mousePosition = {
            x: 0,
            y: 0,
        };
        this.mouseClicked = false;
        this.mouseEnter = false;
        this.zoomScale = 1;
        this.screenSize = {
            x: 640,
            y: 480,
        };
    }

    setMenu(m){
        this.menu = m;
    }
    
    //set canvas for drawing menu
    setCanvas(c){
        this.menuCanvas = c;
        this.menuCtx = this.menuCanvas.getContext("2d");
        this.setFillStyle(1,0,0,1);
        this.menuCanvas.width = 200;
        this.menuCanvas.height = 200;
        //this.menuCanvas.style.b = "0px";
        this.menuCanvas.addEventListener("mousemove", this._mouseMove.bind(this));
        this.menuCanvas.addEventListener("mousedown", this._mouseDown.bind(this));
        this.menuCanvas.addEventListener("mouseup", this._mouseUp.bind(this));
        this.menuCanvas.addEventListener("mouseenter", this._mouseEnter.bind(this));
        this.menuCanvas.addEventListener("mouseleave", this._mouseLeave.bind(this));
        this.menuCanvas.addEventListener("keydown", this._keyDown.bind(this));
        this.menuCanvas.addEventListener("keyup", this._keyUp.bind(this));
    }

    //set canvas for background screen
    setScreen(s){
        this.screenCanvas = s;
        this.screenCtx = this.screenCanvas.getContext("2d");
        this.screenCanvas.width = this.screenSize.x;
        this.screenCanvas.height = this.screenSize.y;
    }

    //blur the screen
    /**
     * Set blur value for screen
     * @param {int} amount Blur value 0-15
     */
    setScreenBlur(amount){
        if(amount < 0){
            amount = 0;
        }
        if(amount > 15){
            amount = 15;
        }
        this.screenCtx.filter = `blur(${amount * 0.5}px)`;
    }

    /**
     * Set screen resolution: 0 = 640x480 4:3, 1 = 720x480 16:10, 2 = 853x370 16:9
     * @param {int} res Screen res type
     */
    setScreenResolution(res){
        this.screenSize.x = res == 0 ? 640 : res == 1 ? 720 : res == 2 ? 852 : 640;
    }

    //add zoom to values
    applyZoom(value){
        return value * this.zoomScale;
    }

    draw(){

        //update screen size
        this.screenCanvas.width = this.applyZoom(this.screenSize.x);
        this.screenCanvas.height = this.applyZoom(this.screenSize.y);

        //update menu size
        this.menuCanvas.width = this.applyZoom(this.screenSize.x);
        this.menuCanvas.height = this.applyZoom(this.screenSize.y);

        //clear canvas to draw again
        this.menuCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.menu.menuDefList[0].draw();
   
        
    }
    //Set fill style for canvas ctx
    setFillStyle(r,g,b,a){
        this.menuCtx.fillStyle = `rgba(${convertColour(r)},${convertColour(g)},${convertColour(b)},${a})`;
    }

    //Set canvas visiable or not
    setVisible(bool){
        if(bool){
            this.menuCanvas.style.display = "block";
        }else{
            this.menuCanvas.style.display = "none";
        }
    }

    getMenuCtx(){
        return this.menuCtx;
    }

    _mouseMove(event){
        this._updateMousePositon(event);
    }
    
    _mouseDown(event){
        this.mouseClicked = true;
    }

    _mouseUp(event){
        this.mouseClicked = false;
    }

    _mouseEnter(event){
        this.mouseEnter = true;
    }

    _mouseLeave(event){
        this.mouseEnter = false;
    }

    _keyDown(event){

    }

    _keyUp(event){

    }

    _updateMousePositon(event){
        this.mousePosition = {
            x: event.clientX - this.menuCanvas.getBoundingClientRect().left,
            y: event.clientY - this.menuCanvas.getBoundingClientRect().top,
        }
    }
}

export let canvas = new MenuCanvas();