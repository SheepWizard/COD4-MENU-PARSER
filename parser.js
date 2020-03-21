"use strict";


export default class Parser{
    constructor(){
        this.tokens = [];
        this.tok;
        this.index = 0;
        this.errors = [];
    }

    setTokens(tk){
        this.tokens = tk;
    }

    parse(){
        this.errors = [];
        this.index = 0;
        this.tok = this.tokens[this.index].token;
        while (this.tok != undefined) {
            this.Menu();
        }
        return this.errors;
    }


    Menu() {
        if (this.tok === "OPENBRACKET") {
            this.eat();
            while (this.tok === "NEWLINE") {
                this.newLine();
            }
            while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                this.MenuDef();
            }
            if (this.tok === "CLOSEBRACKET") {
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
        if (this.tok === "MENUDEF") {
            this.eat();
            while (this.tok === "NEWLINE") {
                this.newLine();
            }
            if (this.tok === "OPENBRACKET") {
                this.eat();
                this.newLine();

                while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {

                    if (this.tok === "ITEMDEF") {
                        this.eat();
                        while (this.tok === "NEWLINE") {
                            this.newLine();
                        }
                        if (this.tok === "OPENBRACKET") {
                            this.eat();
                            this.newLine();

                            while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {

                                if (this.tok === "ACTION" || this.tok === "DOUBLECLICK" || this.tok === "FOCUSDVAR" || this.tok === "LEAVEFOCUS" || this.tok === "MOUSEENTER" || this.tok === "MOUSEENTERTEXT" || this.tok === "MOUSEEXIT" || this.tok === "MOUSEEXITTEXT" || this.tok === "ONFOCUS") {
                                    this.eat();
                                    while (this.tok === "NEWLINE") {
                                        this.newLine();
                                    }
                                    if (this.tok === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok === "CLOSEBRACKET") {
                                            this.eat();
                                            this.newLine();
                                        } else {
                                            this.error("Expected close bracket \"}\".");
                                        }
                                    } else {
                                        this.error("Expected open bracket \"{\".");
                                    }
                                }
                                else if (this.tok === "EXECKEY") {
                                    this.eat();
                                    while (this.tok === "NEWLINE") {
                                        this.newLine();
                                    }
                                    this.IsString();
                                    if (this.tok === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok === "CLOSEBRACKET") {
                                            this.eat();
                                            this.newLine();
                                        } else {
                                            this.error("Expected close bracket \"}\".");
                                        }
                                    } else {
                                        this.error("Expected open bracket \"{\".");
                                    }

                                }
                                else if (this.tok === "EXECKEYINT") {
                                    this.eat();
                                    while (this.tok === "NEWLINE") {
                                        this.newLine();
                                    }
                                    this.PrimaryExp();
                                    if (this.tok === "OPENBRACKET") {
                                        this.eat();
                                        this.newLine();
                                        while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                            this.scriptActions();
                                        }
                                        if (this.tok === "CLOSEBRACKET") {
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
                            if (this.tok === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }

                        } else {
                            this.error("Expected open bracket \"{\".");
                        }
                    }
                    else if (this.tok === "ONCLOSE" || this.tok === "ONESC" || this.tok === "ONOPEN") {
                        this.eat();
                        while (this.tok === "NEWLINE") {
                            this.newLine();
                        }
                        if (this.tok === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }
                        } else {
                            this.error("Expected open bracket \"{\".");
                        }
                    }
                    else if (this.tok === "EXECKEY") {
                        this.eat();
                        while (this.tok === "NEWLINE") {
                            this.newLine();
                        }
                        this.IsString();
                        if (this.tok === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok === "CLOSEBRACKET") {
                                this.eat();
                                this.newLine();
                            } else {
                                this.error("Expected close bracket \"}\".");
                            }
                        } else {
                            this.error("Expected open bracket \"{\".");
                        }

                    }
                    else if (this.tok === "EXECKEYINT") {
                        this.eat();
                        while (this.tok === "NEWLINE") {
                            this.newLine();
                        }
                        this.PrimaryExp();
                        if (this.tok === "OPENBRACKET") {
                            this.eat();
                            this.newLine();
                            while (this.tok !== "CLOSEBRACKET" && this.tok !== undefined) {
                                this.scriptActions();
                            }
                            if (this.tok === "CLOSEBRACKET") {
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

                while (this.tok === "NEWLINE") {
                    this.newLine();
                }

                if (this.tok === "CLOSEBRACKET") {
                    this.eat();
                    this.newLine();
                } else {
                    this.error("Expected close bracket \"}\".");
                }
            } else {
                this.error("Expected open bracket \"{\".");
            }

            while (this.tok === "NEWLINE") {
                this.newLine();
            }

        } else {
            this.error("Expected \"menuDef\".");
        }
    }

    scriptActions() {
        if (this.tok === "CLOSE") {
            this.eat();
            this.IsString();
        }
        else if (this.tok === "CLOSEFORGAMETYPE") {
            this.eat();
            this.IsString();
        }
        else if (this.tok === "EXEC") {
            this.eat();
            this.IsString();
        }

        else if (this.tok === "NEWLINE") {
            this.eat();
        }
        else {
            this.error("Unknown item keyword.");
        }
    }

    ItemStatement() {
        //itemdef options

        switch (this.tok) {
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
                this.PrimaryExp();
                this.PrimaryExp();
                this.newLine();
                this.PrimaryExp(true);
                if (this.tok !== "NEWLINE") {
                    this.PrimaryExp(true);
                    if (this.tok !== "NEWLINE") {
                        this.PrimaryExp();
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
                break;
            case "BACKCOLOR":
            case "BORDERCOLOR":
            case "FORECOLOR":
            case "OUTLINECOLOR":
                this.eat();
                this.PrimaryExp();
                this.PrimaryExp();
                this.PrimaryExp();
                this.PrimaryExp();
                break;
            case "MAXCHARSGOTONEXT":
                this.eat();
                newLine()
                break;
            case "ORIGIN":
                this.eat();
                this.PrimaryExp();
                this.PrimaryExp();
                break;
            case "AUTOWRAPPED":
            case "DECORATION":
            case "HORIZONTALSCROLL":
            case "LEGACYSPLITSCREENSCALE":
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
        switch (this.tok) {
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
                break;
            case "RECT":
                this.eat();
                this.PrimaryExp();
                this.PrimaryExp();
                this.PrimaryExp();
                this.newLine();
                this.PrimaryExp(true);
                if (this.tok !== "NEWLINE") {
                    this.PrimaryExp(true);
                    if (this.tok !== "NEWLINE") {
                        this.PrimaryExp();
                    }
                }
                break;
            case "BORDERCOLOR":
            case "BACKCOLOR":
            case "DISABLECOLOR":
            case "FORECOLOR":
                this.eat();
                this.PrimaryExp();
                this.PrimaryExp();
                this.PrimaryExp();
                this.PrimaryExp();
                break;
            case "OUTOFBOUNDSCLICK":
            case "POPUP":
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
        while (this.tok === "NEWLINE") {
            this.newLine();
        }
        if (this.tok === "STRING") {
            this.eat();
        }
        else if (this.tok === "FLOAT") {
            this.eat();
        }
        else if (this.tok === "VAR") {
            this.eat();
        }
        while (this.tok === "NEWLINE") {
            this.newLine();
        }
    }

    PrimaryExp(ignore) {
        if (!ignore) {
            while (this.tok === "NEWLINE") {
                this.newLine();
            }
        }
        if (this.tok === "FLOAT") {
            this.eat();
        }
        else if (this.tok === "OPENSMOOTHBRACKET") {
            this.eat();
            while (this.tok !== "CLOSEDSMOOTHBRACKET" && this.tok !== undefined) {
                this.Exp();
            }
            if (this.tok === "CLOSEDSMOOTHBRACKET") {
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
        while (this.tok === "NEWLINE") {
            this.newLine();
        }
        this.PrimaryExp();
        while (this.tok === "NEWLINE") {
            this.newLine();
        }
        if (this.tok === "OPERATOR") {
            this.eat();
            this.Exp();
        }
    }

    newLine() {
        if (this.tok === "NEWLINE") {
            this.eat();
        }
    }

    eat() {
        this.index++;
        if (this.index > this.tokens.length - 1) {
            this.tok = undefined;
        } else {
            this.tok = this.tokens[this.index].token;
        }
    }

    error(err) {
        this.errors.push({
            token: this.tokens[this.index],
            error: err,
        });
        this.eat();
    }
}

