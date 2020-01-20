"use strict";

//tolower when checking token
//exp values
//check for end of file/input

const Lexer = function(file){
    
    const inputString = file;
    //const inputString = ""

   
    const tokenList = [];
    const tokens = [];
    makeTokens();
    const ignore = ["\t", " ", "\r"];
    const delimiters = ["\n", "\t", " ", "\r", "{", "}", "(", ")", "\"", ",", ";", "!", "@", "%", "^", "&", "*", "-", "+", "=", "|", "\\", "/", ":", "'", "<", ">", ",", "?"];

    //record line
    function inputStream() {
        let lineCount = 1;
        let inLineComment = false;
        let inBlockComment = false;
        let inString = false;
        let word = "";
        for (let i = 0; i < inputString.length; i++) {

            if(inputString[i] === "\n"){
                lineCount++;
            }

            //special case for block comments
            if(inBlockComment){
                if (inputString[i] === "*"){
                    if(inputString.length-1 >= i+1){
                        if(inputString[i+1] === "/"){
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
            if(inLineComment){
                if(inputString[i] === "\n"){
                    inLineComment = false;
                    word = "";
                    continue;
                }
                continue;
            }
          
            //special case for string
            if(inString){
                if (inputString[i] === "\"") {
                    inString = !inString;
                    addToTokenList("STRING", word, lineCount)
                    word = "";
                    continue;
                }
                else {
                    word += inputString[i];
                    continue;
                }
            }

            let tokenFound = false;
            for(let d = 0; d < delimiters.length; d++){
                //delimiter found
                if(inputString[i] === delimiters[d]){
                    //console.log(i, word, { ...inputString[i] }, { ...delimiters[d] });
                    
                    //check if we should ignore checking for token
                    let ignoreFound = false;
                    for(let ig = 0; ig < ignore.length; ig++){
                        let match = delimiters[d].match(ignore[ig]);
                        if(match){
                            tokenFound = true;
                            ignoreFound = true;
                            break;
                        }
                    }

                    //special case for comments
                    if(delimiters[d] === "/"){
                        if(inputString.length-1 >= i+1){
                            if(inputString[i+1] === "*"){                   
                                inBlockComment = true;
                                ignoreFound = true; 
                            } else if (inputString[i + 1] === "/"){
                                inLineComment = true;
                                ignoreFound = true;
                            }
                        }
                    }

                    //special case for strings
                    if(delimiters[d] === "\""){
                        tokenFound = true;
                        inString = true;
                        break;
                    }

                    //check for tokens for word
                    if(word !== ""){
                        let match;
                        for (let t = 0; t < tokens.length; t++) {
                            match = word.match(tokens[t].value);    
                            if (match) {
                                if(match[0] === word){
                                    addToTokenList(tokens[t].token, word, lineCount);
                                    tokenFound = true;
                                    word = "";
                                    break;
                                }    
                            }
                        }
                    }

                    //check for dilimeter token
                    if(!ignoreFound){
                        for (let t = 0; t < tokens.length; t++) {
                            let match = delimiters[d].match(tokens[t].value);
                            if (match) {
                                addToTokenList(tokens[t].token, inputString[i], lineCount);
                                tokenFound = true;
                                break;
                            }
                        }
                    }
                }         
            }
            if(!tokenFound){
                word += inputString[i];
            }
        }

         return tokenList;
    }

    function addToTokenList(tk, vl, ln){
        tokenList.push({
            token: tk,
            input: vl,
            line: ln,
        });
    }

    function createToken(tokenName, vl) {
        tokens.push({
            token: tokenName,
            value: vl,
        });
    }
    
    function makeTokens(){
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
        createToken("FADEAMOUNT", /fadeAmount/);//menudef
        createToken("FADECLAMP", /fadeClamp/);//menudef
        createToken("FACECYCLE", /faceCycle/);//menudef
        createToken("FADEINAMOUNT", /fadeInAmount/);//menudef
        createToken("FEEDER", /feeder/);//itemdef
        createToken("FOCUSCOLOR", /focuscolor/);//meudef
        createToken("FOCUSSOUND", /focusSound/);//itemdef
        createToken("FORECOLOR", /forecolor/);//itemdef menudef
        createToken("FULLSCREEN", /fullscreen/);//menudef
        createToken("GROUP", /group/);//itemdef
        //createToken("HIDEDVAR", /hideDvar/);
        createToken("MAXCHARS", /maxChars/);//itemdef
        createToken("MAXCHARSGOTONEXT", /maxCharsGotoNext/);//itemdef
        createToken("MAXPAINTCHARS", /maxPaintChars/);//itemdef
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
        createToken("LEGACYSPLITSCREENSCALE", /legacySplitScreenScale/);//menudef
        createToken("OUTOFBOUNDSCLICK", /outOfBoundsClick/);//menudef
        createToken("POPUP", /popup/);//menudef

        //Reserved words
        createToken("ITEMDEF", /itemDef/);
        createToken("MENUDEF", /menuDef/);
        createToken("DEFINE", /#define/);
        createToken("INCLUDE", /#include/);

        //Commands / script actions
        createToken("CLOSE", /close/);
        createToken("CLOSEFORGAMETYPE", /closeforgametype/);
        createToken("EXEC", /exec/);
        createToken("EXECNOW", /execnow/);
        createToken("EXECNOWONDVARFLOATVALUE", /execNowOnDvarFloatValue/);
        createToken("EXECNOWONDVARINTVALUE", /execNowOnDvarIntValue/);
        createToken("EXECNOWONDVARSTRINGVALUE", /execNowOnDvarStringValue/);
        createToken("EXECONDVARFLOATVALUE", /execOnDvarFloatValue/);
        createToken("EXECONDVARINTVALUE", /execOnDvarIntValue/);
        createToken("EXECONDVARSTRINGVALUE", /execOnDvarStringValue/);
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
        createToken("SCRIPTMENURESPONDONDVARFLOATVALUE", /scriptMenuRespondOnDvarFloatValue/);
        createToken("SCRIPTMENURESPONDONDVARINTVALUE", /scriptMenuRespondOnDvarIntValue/);
        createToken("SCRIPTMENURESPONDONDVARSTRINGVALUE", /scriptMenuRespondOnDvarStringValue/);
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
        createToken("EXECKEY", /execKey/);//itemdef menudef execkey 1 {}
        createToken("EXECKEYINT", /execKeyInt/);//itemdef menudef execkey 1 {}
        createToken("FOCUSDVAR", /focusDvar/);//itemdef
        createToken("LEAVEFOCUS", /leaveFocus/);//itemdef
        createToken("MOUSEENTER", /mouseEnter/);//itemdef
        createToken("MOUSEENTERTEXT", /mouseEnterText/);//itemdef
        createToken("MOUSEEXIT", /mouseExit/);//itemdef
        createToken("MOUSEEXITTEXT", /mouseExitText/);//itemdef
        createToken("ONCLOSE", /onClose/);//menudef
        createToken("ONESC", /onEsc/);//menudef
        createToken("ONFOCUS", /onFocus/);//itemdef
        createToken("ONOPEN", /onOpen/);//menudef
        
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
    

    function getTokens() {  
        return inputStream();
    } 

    return {
        getTokens: getTokens
    };
}

