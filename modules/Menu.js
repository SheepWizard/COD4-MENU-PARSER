'use strict';
import MenuDef from "./MenuDef.js";


export class Menu{
    constructor(){
        this.menuDefList = [];
        this.active = 0;
    }

    addMenuDef(){
        this.active = this.menuDefList.length;
        this.menuDefList.push(new MenuDef());
    }

    setMenuDefProperty(value, property, property2){
        if(property2){
            this.getActiveMenuDef().properties[property][property2] = value;
        }else{
            this.getActiveMenuDef().properties[property] = value;
        }      
    }

    setItemDefProperty(value, property, property2) {
        if (property2) {
            this.getActiveMenuDef().getActiveItemDef().properties[property][property2] = value;
        } else {
            this.getActiveMenuDef().getActiveItemDef().properties[property] = value;
        }
    }


    getActiveMenuDef(){
        return this.menuDefList[this.active];
    }

    draw(){

    }
}

