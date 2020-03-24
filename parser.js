import {Menu} from "./modules/Menu.js";

"use strict";


export default class Parser{
    constructor(){
        this.tokens = [];
        this.tok;
        this.index = 0;
        this.errors = [];
        this.newMenu;
        this.property = "";
        this.property2 = "";
        this.inItemDef = false;
    }

    setTokens(tk){
        this.tokens = tk;
    }

    parse(){
        this.newMenu = new Menu();
        this.errors = [];
        this.index = 0;
        this.property = "";
        this.property2 = "";
        this.tok = this.tokens[this.index];
        this.sum = "";
        while (this.tok.token != undefined) {
            this.Menu();
        }
        //console.log(this.newMenu.menuDefList);
        return this.newMenu;
    }


    Menu() {
        if (this.tok.token === "OPENBRACKET") {
            this.eat();
            while (this.tok.token === "NEWLINE") {
                this.newLine();
            }
            while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                this.MenuDef();
            }
            if (this.tok.token === "CLOSEBRACKET") {
                this.eat();
                this.newLine();
            } else {
                this.error("Expected close bracket \"}\".");
            }
        }
        else {
            this.error("Expected open bracket \"{\".");
        }
    }

    MenuDef() {
        this.sum = "";
        this.newMenu.addMenuDef();
        if (this.tok.token === "MENUDEF") {
            this.eat();
            while (this.tok.token === "NEWLINE") {
                this.newLine();
            }
            if (this.tok.token === "OPENBRACKET") {
                this.eat();
                this.newLine();

                while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {

                    if (this.tok.token === "ITEMDEF") {
                        this.newMenu.getActiveMenuDef().addItemDef();
                        this.sum = "";
                        this.inItemDef = true;
                        this.eat();
                        while (this.tok.token === "NEWLINE") {
                            this.newLine();
                        }
                        if (this.tok.token === "OPENBRACKET") {
                            this.eat();
                            this.newLine();

                            while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {

                                if (this.tok.token === "ACTION" || this.tok.token === "DOUBLECLICK" || this.tok.token === "FOCUSDVAR" || this.tok.token === "LEAVEFOCUS" || this.tok.token === "MOUSEENTER" || this.tok.token === "MOUSEENTERTEXT" || this.tok.token === "MOUSEEXIT" || this.tok.token === "MOUSEEXITTEXT" || this.tok.token === "ONFOCUS") {
                                    this.eat();
                                    while (this.tok.token === "NEWLINE") {
                                        this.newLine();
                                    }
                                    if (this.tok.token === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok.token === "CLOSEBRACKET") {
                                            this.eat();
                                            this.newLine();
                                        } else {
                                            this.error("Expected close bracket \"}\".");
                                        }
                                    } else {
                                        this.error("Expected open bracket \"{\".");
                                    }
                                }
                                else if (this.tok.token === "EXECKEY") {
                                    this.eat();
                                    while (this.tok.token === "NEWLINE") {
                                        this.newLine();
                                    }
                                    this.IsString();
                                    if (this.tok.token === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok.token === "CLOSEBRACKET") {
                                            this.eat();
                                            this.newLine();
                                        } else {
                                            this.error("Expected close bracket \"}\".");
                                        }
                                    } else {
                                        this.error("Expected open bracket \"{\".");
                                    }

                                }
                                else if (this.tok.token === "EXECKEYINT") {
                                    this.eat();
                                    while (this.tok.token === "NEWLINE") {
                                        this.newLine();
                                    }
                                    this.PrimaryExp();
                                    if (this.tok.token === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok.token === "CLOSEBRACKET") {
                                            this.eat();
                                            this.newLine();
                                        } else {
                                            this.error("Expected close bracket \"}\".");
                                        }
                                    } else {
                                        this.error("Expected open bracket \"{\".");
                                    }

                                } else {
                                    this.ItemStatement();
                                }



                            }
                            if (this.tok.token === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }

                        } else {
                            this.error("Expected open bracket \"{\".");
                        }
                        this.inItemDef = false;
                    }
                    else if (this.tok.token === "ONCLOSE" || this.tok.token === "ONESC" || this.tok.token === "ONOPEN") {
                        this.eat();
                        while (this.tok.token === "NEWLINE") {
                            this.newLine();
                        }
                        if (this.tok.token === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok.token === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }
                        } else {
                            this.error("Expected open bracket \"{\".");
                        }
                    }
                    else if (this.tok.token === "EXECKEY") {
                        this.eat();
                        while (this.tok.token === "NEWLINE") {
                            this.newLine();
                        }
                        this.IsString();
                        if (this.tok.token === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok.token === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }
                        } else {
                            this.error("Expected open bracket \"{\".");
                        }

                    }
                    else if (this.tok.token === "EXECKEYINT") {
                        this.eat();
                        while (this.tok.token === "NEWLINE") {
                            this.newLine();
                        }
                        this.PrimaryExp();
                        if (this.tok.token === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok.token !== "CLOSEBRACKET" && this.tok.token !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok.token === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }
                        } else {
                            this.error("Expected open bracket \"{\".");
                        }
                    }
                    else {
                        this.MenuStatement();
                    }

                }

                while (this.tok.token === "NEWLINE") {
                    this.newLine();
                }

                if (this.tok.token === "CLOSEBRACKET") {
                    this.eat();
                    this.newLine();
                } else {
                    this.error("Expected close bracket \"}\".");
                }
            } else {
                this.error("Expected open bracket \"{\".");
            }

            while (this.tok.token === "NEWLINE") {
                this.newLine();
            }

        } else {
            this.error("Expected \"menuDef\".");
        }
    }
    //NOT DONE
    scriptActions() {
        if (this.tok.token === "CLOSE") {
            this.eat();
            this.IsString();
        }
        else if (this.tok.token === "CLOSEFORGAMETYPE") {
            this.eat();
            this.IsString();
        }
        else if (this.tok.token === "EXEC") {
            this.eat();
            this.IsString();
        }

        else if (this.tok.token === "NEWLINE") {
            this.eat();
        }
        else {
            this.error("Unknown item keyword.");
        }
    }

    ItemStatement() {
        //itemdef options
        this.property = this.tok.token;
        switch (this.tok.token) {
            case "NAME":
            case "BACKGROUND":
            case "FOCUSSOUND":
            case "GROUP":
            case "TEXT":
                this.eat();
                this.IsString();
                break;
            case "RECT":
                this.eat();
                this.PrimaryExp();
                this.property2 = "x";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "y";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "w";
                this.addSum(true);
                this.newLine();
                this.PrimaryExp(true);
                this.property2 = "h";
                this.addSum(true);
                if (this.tok.token !== "NEWLINE") {
                    this.PrimaryExp(true);
                    this.property2 = "hAlign";
                    this.addSum(true);
                    if (this.tok.token !== "NEWLINE") {
                        this.PrimaryExp();
                        this.property2 = "vAlign";
                        this.addSum(true);
                    }
                }
                break;
            case "ALIGN":
            case "BORDER":
            case "BORDERSIZE":
            case "ELEMENTHEIGHT":
            case "ELEMENTTYPE":
            case "ELEMENTWIDTH":
            case "FEEDER":
            case "MAXCHARS":
            case "MAXPAINTCHARS":
            case "NOTSELECTABLE":
            case "SPECIAL":
            case "STYLE":
            case "TEXTALIGN":
            case "TEXTALIGNX":
            case "TEXTALIGNY":
            case "TEXTFILE":
            case "TEXTFONT":
            case "TEXTSAVEGAME":
            case "TEXTSCALE":
            case "TEXTSTYLE":
            case "TYPE":
            case "VISIBLE":
                this.eat();
                this.PrimaryExp();
                this.addSum();
                break;
            case "BACKCOLOR":
            case "BORDERCOLOR":
            case "FORECOLOR":
            case "OUTLINECOLOR":
                this.eat();
                this.PrimaryExp();
                this.property2 = "r";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "g";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "b";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "a";
                this.addSum(true);
                break;
            case "ORIGIN":
                this.eat();
                this.PrimaryExp();
                this.property2 = "x";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "y";
                this.addSum(true);
                break;
            case "AUTOWRAPPED":
            case "DECORATION":
            case "HORIZONTALSCROLL":
            case "LEGACYSPLITSCREENSCALE":
            case "MAXCHARSGOTONEXT":
                this.newMenu.setItemDefProperty(1, this.property);
                this.eat();
                this.newLine();
                break;
            case "NEWLINE":
                this.eat();
                break;
            default:
                this.error("Unknown item keyword.");
                break;
        }
    }

    MenuStatement() {
        //menu def options
        this.property = this.tok.token;
        switch (this.tok.token) {        
            case "NAME":  
            case "BACKGROUND":
            case "SOUNDLOOP":
                this.eat();
                this.IsString();
                break;
            case "FULLSCREEN":
            case "BLURWORLD":
            case "VISIBLE":
            case "STYLE":
            case "BORDER":
            case "BORDERSIZE":
            case "FADEAMOUNT":
            case "FADECLAMP":
            case "FADECYCLE":
            case "FADEINAMOUNT":
            case "FOCUSCOLOR":
            case "OWNERDRAW":
                this.eat();
                this.PrimaryExp();
                this.addSum();
                break;
            case "RECT":
                this.eat();
                this.PrimaryExp();
                this.property2 = "x";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "y";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "w";
                this.addSum(true);
                this.newLine();
                this.PrimaryExp(true);
                this.property2 = "h";
                this.addSum(true);
                if (this.tok.token !== "NEWLINE") {
                    this.PrimaryExp(true);
                    this.property2 = "hAlign";
                    this.addSum(true);
                    if (this.tok.token !== "NEWLINE") {
                        this.PrimaryExp();
                        this.property2 = "vAlign";
                        this.addSum(true);
                    }
                }
                break;
            case "BORDERCOLOR":
            case "BACKCOLOR":
            case "DISABLECOLOR":
            case "FORECOLOR":
                this.eat();
                this.PrimaryExp();
                this.property2 = "r";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "g";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "b";
                this.addSum(true);
                this.PrimaryExp();
                this.property2 = "a";
                this.addSum(true);
                break;
            case "OUTOFBOUNDSCLICK":
            case "POPUP":
                this.newMenu.setMenuDefProperty(1, this.property);
                this.eat();
                this.newLine();
                break;
            case "NEWLINE":
                this.eat();
                break;
            default:
                this.error("Unknown menu keyword.");
                break;
        }
    }

    IsString() {
        while (this.tok.token === "NEWLINE") {
            this.newLine();
        }
        if (this.tok.token === "STRING") {
            if (this.inItemDef){
                this.newMenu.setItemDefProperty(this.tok.input, this.property);
            }else{
                this.newMenu.setMenuDefProperty(this.tok.input, this.property);
            }  
            this.eat();
        }
        else if (this.tok.token === "FLOAT") {
            if (this.inItemDef) {
                this.newMenu.setItemDefProperty(this.tok.input, this.property);
            } else {
                this.newMenu.setMenuDefProperty(this.tok.input, this.property);
            }
            this.eat();
        }
        else if (this.tok.token === "VAR") {
            if (this.inItemDef) {
                this.newMenu.setItemDefProperty(this.tok.input, this.property);
            } else {
                this.newMenu.setMenuDefProperty(this.tok.input, this.property);
            }
            this.eat();
        }
        while (this.tok.token === "NEWLINE") {
            this.newLine();
        }
    }

    PrimaryExp(ignore) {
        if (!ignore) {
            while (this.tok.token === "NEWLINE") {
                this.newLine();
            }
        }
        if (this.tok.token === "FLOAT") {
            this.sum += this.tok.input;
            this.eat();
        }
        else if (this.tok.token === "OPENSMOOTHBRACKET") {
            this.sum += this.tok.input;
            this.eat();
            while (this.tok.token !== "CLOSEDSMOOTHBRACKET" && this.tok.token !== undefined) {
                this.Exp();
            }
            if (this.tok.token === "CLOSEDSMOOTHBRACKET") {
                this.sum += this.tok.input;
                this.eat();
            }
            else {
                this.error("Expected closed smooth bracket \")\".");
            }
        } else {
            this.error("Expected Float");
        }
    }

    Exp() {
        while (this.tok.token === "NEWLINE") {
            this.newLine();
        }
        this.PrimaryExp();
        while (this.tok.token === "NEWLINE") {
            this.newLine();
        }
        if (this.tok.token === "OPERATOR") {
            this.sum += this.tok.input;
            this.eat();
            this.Exp();
        }
    }

    newLine() {
        if (this.tok.token === "NEWLINE") {
            this.eat();
        }
    }

    eat() {
        this.index++;
        if (this.index > this.tokens.length - 1) {
            this.tok.token = undefined;
        } else {
            this.tok = this.tokens[this.index];
        }
    }

    error(err) {
        this.errors.push({
            token: this.tokens[this.index],
            error: err,
        });
        this.eat();
    }

    addSum(two){

        let sum = 0;
        try{
            sum = this.evil(this.sum);
        }catch (e){
            this.error(e);
        }
        if(this.inItemDef){
            if (two) {
                this.newMenu.setItemDefProperty(sum, this.property, this.property2);
            } else {
                this.newMenu.setItemDefProperty(sum, this.property);
            }
        }else{
            if (two) {
                this.newMenu.setMenuDefProperty(sum, this.property, this.property2);
            } else {
                this.newMenu.setMenuDefProperty(sum, this.property);
            }
        }
        
        this.sum = "";
    }

    //https://stackoverflow.com/questions/6479236/calculate-string-value-in-javascript-not-using-eval
    evil(fn) {
        return new Function('return ' + fn)();
    }

    getErrors(){
        return this.errors;
    }
}

