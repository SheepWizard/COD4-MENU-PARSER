"use strict";

//exp values
//check for end of file/input


const tokens = [];
makeTokens();
const ignore = ["\t", " ", "\r"];
const delimiters = ["\n", "\t", " ", "\r", "{", "}", "(", ")", "\"", ",", ";", "!", "@", "%", "^", "&", "*", "-", "+", "=", "|", "\\", "/", ":", "'", "<", ">", ",", "?"];
export default class Lexer{
    constructor(){
        this.file = "";
        this.tokenList = [];
    }

    setFile(f){
        this.file = f;
    }

    inputStream() {
        this.tokenList = [];
        let lineCount = 1;
        let inLineComment = false;
        let inBlockComment = false;
        let inString = false;
        let word = "";
        const inputString = this.file;
        for (let i = 0; i < inputString.length; i++) {

            if (inputString[i] === "\n") {
                lineCount++;
            }

            //special case for block comments
            if (inBlockComment) {
                if (inputString[i] === "*") {
                    if (inputString.length - 1 >= i + 1) {
                        if (inputString[i + 1] === "/") {
                            inBlockComment = false;
                            word = "";
                            i++
                            continue;
                        }
                    }
                }
                continue;
            }

            //special case for line comments
            if (inLineComment) {
                if (inputString[i] === "\n") {
                    inLineComment = false;
                    word = "";
                    continue;
                }
                continue;
            }

            //special case for string
            if (inString) {
                if (inputString[i] === "\"") {
                    inString = !inString;
                    this.addToTokenList("STRING", word, lineCount)
                    word = "";
                    continue;
                }
                else {
                    word += inputString[i];
                    continue;
                }
            }

            let tokenFound = false;
            for (let d = 0; d < delimiters.length; d++) {
                //delimiter found
                if (inputString[i] === delimiters[d]) {
                    //check if we should ignore checking for token
                    let ignoreFound = false;
                    for (let ig = 0; ig < ignore.length; ig++) {
                        let match = delimiters[d].match(ignore[ig]);
                        if (match) {
                            tokenFound = true;
                            ignoreFound = true;
                            break;
                        }
                    }

                    //special case for comments
                    if (delimiters[d] === "/") {
                        if (inputString.length - 1 >= i + 1) {
                            if (inputString[i + 1] === "*") {
                                inBlockComment = true;
                                ignoreFound = true;
                            } else if (inputString[i + 1] === "/") {
                                inLineComment = true;
                                ignoreFound = true;
                            }
                        }
                    }

                    //special case for strings
                    if (delimiters[d] === "\"") {
                        tokenFound = true;
                        inString = true;
                        break;
                    }

                    //check for tokens for word
                    if (word !== "") {
                        let match;
                        for (let t = 0; t < tokens.length; t++) {
                            match = word.toLowerCase().match(tokens[t].value);
                            if (match) {
                                if (match[0] === word.toLowerCase()) {
                                    this.addToTokenList(tokens[t].token, word, lineCount);
                                    tokenFound = true;
                                    word = "";
                                    break;
                                }
                            }
                        }
                    }

                    //check for dilimeter token
                    if (!ignoreFound) {
                        for (let t = 0; t < tokens.length; t++) {
                            let match = delimiters[d].match(tokens[t].value);
                            if (match) {
                                this.addToTokenList(tokens[t].token, inputString[i], lineCount);
                                tokenFound = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (!tokenFound) {
                word += inputString[i];
            }
        }
    }

    addToTokenList(tk, vl, ln) {
        this.tokenList.push({
            token: tk,
            input: vl,
            line: ln,
        });
    }

    getTokens(){
        this.tokenList = [];
        this.inputStream();
        return this.tokenList;
    }
}


function createToken(tokenName, vl) {
    tokens.push({
        token: tokenName,
        value: vl,
    });
}


function makeTokens() {
    //Keywords
    createToken("ACCEPT", /accept/);
    createToken("ALIGN", /align/); //itemdef
    createToken("BACKCOLOR", /backcolor/); //menudef itemdef
    createToken("BACKGROUND", /background/);//menudef itemdef
    createToken("BLURWORLD", /blurworld/); //menudef
    createToken("BORDER", /border/);//menudef itemdef
    createToken("BORDERCOLOR", /bordercolor/);//menudef itemdef
    createToken("BORDERSIZE", /bordersize/);//menudef itemdef
    createToken("COLUMNS", /columns/);//itemdef
    createToken("DISABLECOLOR", /disablecolor/);//menudef
    //createToken("DISABLEDVAR", /disableDvar/);
    //createToken("DVAR", /dvar/);
    //createToken("DVARENUMLIST", /dvarEnumList/);
    //createToken("DVARFLOAT", /dvarFloat/);
    //createToken("DVARFLOATLIST", /dvarFloatList/);
    //createToken("DVARSTRLIST", /dvarStrList/);
    //createToken("DVARTEST", /dvarTest/);
    createToken("ELEMENTHEIGHT", /elementheight/);//itemdef
    createToken("ELEMENTTYPE", /elementtype/);//itemdef
    createToken("ELEMENTWIDTH", /elementwidth/);//itdemdef
    //createToken("ENABLEDVAR", /enableDvar/);
    createToken("FADEAMOUNT", /fadeamount/);//menudef
    createToken("FADECLAMP", /fadeclamp/);//menudef
    createToken("FADECYCLE", /fadecycle/);//menudef
    createToken("FADEINAMOUNT", /fadeinamount/);//menudef
    createToken("FEEDER", /feeder/);//itemdef
    createToken("FOCUSCOLOR", /focuscolor/);//meudef
    createToken("FOCUSSOUND", /focussound/);//itemdef
    createToken("FORECOLOR", /forecolor/);//itemdef menudef
    createToken("FULLSCREEN", /fullscreen/);//menudef
    createToken("GROUP", /group/);//itemdef
    //createToken("HIDEDVAR", /hideDvar/);
    createToken("MAXCHARS", /maxchars/);//itemdef
    createToken("MAXCHARSGOTONEXT", /maxcharsgotonext/);//itemdef
    createToken("MAXPAINTCHARS", /maxpaintchars/);//itemdef
    createToken("NAME", /name/);//itemdef menudef
    //createToken("NOSCROLLBARS", /noscrollbars/);
    createToken("NOTSELECTABLE", /notselectable/);//itemdef
    createToken("ORIGIN", /origin/);//itemdef
    createToken("OUTLINECOLOR", /outlinecolor/);//itemdef
    createToken("OWNERDRAW", /ownerdraw/);//menudef
    createToken("OWNERDRAWFLAG", /ownerdrawFlag/);
    createToken("RECT", /rect/);//itemdef menudef
    //createToken("SHOWDVAR", /showDvar/);
    createToken("SOUNDLOOP", /soundloop/);//menudef
    createToken("SPECIAL", /special/);//itemdef
    createToken("STYLE", /style/);//itemdef menudef
    createToken("TEXT", /text/);//itemdef
    createToken("TEXTALIGN", /textalign/);//itemdef
    createToken("TEXTALIGNX", /textalignx/);//itemdef
    createToken("TEXTALIGNY", /textaligny/);//itemdef
    createToken("TEXTFILE", /textfile/);//itemdef
    createToken("TEXTFONT", /textfont/);//itemdef
    createToken("TEXTSAVEGAME", /textsavegame/);//itemdef
    createToken("TEXTSCALE", /textscale/);//itemdef
    createToken("TEXTSTYLE", /textstyle/);//itemdef
    createToken("TYPE", /type/);//itemdef
    createToken("VISIBLE", /visible/);//itemdef menudef
    createToken("EXP", /exp/);//itemdef

    //Flags
    createToken("AUTOWRAPPED", /autowrapped/);//itemdef
    createToken("DECORATION", /decoration/);//itemdef
    createToken("HORIZONTALSCROLL", /horizontalscroll/);//itemdef
    createToken("LEGACYSPLITSCREENSCALE", /legacysplitscreenscale/);//menudef
    createToken("OUTOFBOUNDSCLICK", /outofboundsclick/);//menudef
    createToken("POPUP", /popup/);//menudef

    //Reserved words
    createToken("ITEMDEF", /itemdef/);
    createToken("MENUDEF", /menudef/);
    createToken("DEFINE", /#define/);
    createToken("INCLUDE", /#include/);

    //Commands / script actions
    createToken("CLOSE", /close/);
    createToken("CLOSEFORGAMETYPE", /closeforgametype/);
    createToken("EXEC", /exec/);
    createToken("EXECNOW", /execnow/);
    createToken("EXECNOWONDVARFLOATVALUE", /execnowondvarfloatvalue/);
    createToken("EXECNOWONDVARINTVALUE", /execnowondvarintvalue/);
    createToken("EXECNOWONDVARSTRINGVALUE", /execnowondvarstringvalue/);
    createToken("EXECONDVARFLOATVALUE", /execondvarlloatvalue/);
    createToken("EXECONDVARINTVALUE", /execondvarintvalue/);
    createToken("EXECONDVARSTRINGVALUE", /execondvarstringvalue/);
    createToken("FADEIN", /fadein/);
    createToken("FADEOUT", /fadeout/);
    createToken("GETAUTOUPDATE", /getautoupdate/);
    createToken("HIDE", /hide/);
    createToken("INGAMECLOSE", /ingameclose/);
    createToken("INGAMEOPEN", /ingameopen/);
    createToken("NEXTLEVEL", /nextlevel/);
    createToken("NOSAVEHIDE", /nosavehide/);
    createToken("OPEN", /open/);
    createToken("OPENFORGAMETYPE", /openforgametype/);
    createToken("PLAY", /play/);
    createToken("PLAYLOOPED", /playLooped/)
    createToken("PROFILEHIDE", /profilehide/);
    createToken("PROFILESHOW", /profileshow/);
    //createToken("SAVEAVAILABLEHIDE", /saveAvailableHide/);
    //createToken("SAVEDELAY", /saveDelay/);
    //createToken("SAVEGAMEHIDE", /savegamehide/);
    //createToken("SAVEGAMESHOW", /savegameshow/);
    createToken("SCRIPTMENURESPONDONDVARFLOATVALUE", /scriptmenurespondondvarfloatvalue/);
    createToken("SCRIPTMENURESPONDONDVARINTVALUE", /scriptmenurespondondvarintvalue/);
    createToken("SCRIPTMENURESPONDONDVARSTRINGVALUE", /scriptmenurespondondvarstringvalue/);
    createToken("SCRIPTMENURESPONSE", /scriptmenuresponse/);
    createToken("SETBACKGROUND", /setbackground/);
    createToken("SETCOLOR", /setcolor/);
    createToken("SETDVAR", /setdvar/);
    createToken("SETCVAR", /setcvar/);
    createToken("SETFOCUS", /setfocus/);
    createToken("SETFOCUSBYDVAR", /setfocusbydvar/);
    createToken("SETITEMCOLOR", /setitemcolor/);
    //createToken("SETSAVEEXECONSUCCESS", /setSaveExecOnSuccess/);
    createToken("SHOW", /show/);
    createToken("SHOWGAMERCARD", /showGamerCard/);
    createToken("SHOWHIDENEWGAMERESUME", /showhidenewgameresume/);
    createToken("UISCRIPT", /uiScript/);
    createToken("WRITESAVE", /writeSave/);

    //Functions
    createToken("ACTION", /action/);//itemdef
    createToken("DOUBLECLICK", /doubleclick/);//itemdef only works with item typr 6 (listbox)
    createToken("EXECKEY", /execkey/);//itemdef menudef execkey 1 {}
    createToken("EXECKEYINT", /execkeyint/);//itemdef menudef execkey 1 {}
    createToken("FOCUSDVAR", /focusdvar/);//itemdef
    createToken("LEAVEFOCUS", /leavefocus/);//itemdef
    createToken("MOUSEENTER", /mouseenter/);//itemdef
    createToken("MOUSEENTERTEXT", /mouseentertext/);//itemdef
    createToken("MOUSEEXIT", /mouseexit/);//itemdef
    createToken("MOUSEEXITTEXT", /mouseexittext/);//itemdef
    createToken("ONCLOSE", /onclose/);//menudef
    createToken("ONESC", /onesc/);//menudef
    createToken("ONFOCUS", /onfocus/);//itemdef
    createToken("ONOPEN", /onopen/);//menudef

    //delimiters
    createToken("OPENBRACKET", /{/);
    createToken("CLOSEBRACKET", /}/);
    createToken("OPENSMOOTHBRACKET", /\(/);
    createToken("CLOSEDSMOOTHBRACKET", /\)/);
    createToken("COMA", /,/);
    createToken("SEMICOLON", /;/);
    createToken("OPERATOR", /\+/);
    createToken("OPERATOR", /-/);
    createToken("OPERATOR", /\//);
    createToken("OPERATOR", /\*/);
    createToken("OPERATOR", /%/);
    createToken("EQUALS", /=/);
    createToken("NEWLINE", /\n/);

    //Expressions
    createToken("OPERATOR", /(\+|\*|\/|\*|\-|%)/);
    createToken("FLOAT", /[0-9]+/);
    createToken("FLOAT", /([0-9]*\.[0-9]+)|([0-9]+\.[0-9]*)/);
    createToken("VAR", /[A-Za-z_][A-Za-z0-9-_]*/);
    //createToken("STRING", /.*/);
}

