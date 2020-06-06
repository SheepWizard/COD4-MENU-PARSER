
export let editor;

export function setEditor(e){
    editor = e;

    const itemDef1 = 'itemDef{ \n\t\t\tname \"Item_1\"\n\t\t\trect (10*2) (100/(2.2*2)) 100 100\n\t\t\tvisible 1\n\t\t\tstyle 1\n\t\t\tbackColor 0 1 0 1\n\t\t}'
    const itemDef2 = 'itemDef{ \n\t\t\tname \"Item_2\"\n\t\t\trect 0 0 100 100 2 2\n\t\t\tvisible 1\n\t\t\tstyle 1\n\t\t\tbackColor 1 0.7 0.3 1\n\t\t\tborder 1\n\t\t\tborderSize 4\n\t\t\tborderColor 0.5 0.2 0.1 1\n\t\t}'
    const itemDef3 = 'itemDef{ \n\t\t\tname \"Item_3\"\n\t\t\trect 60 60 200 200 0 0\n\t\t\tvisible 1\n\t\t\tstyle 1\n\t\t\tbackColor 1 0 1 0.5\n\t\t\tborder 5\n\t\t\tborderSize 8\n\t\t\tborderColor (51/255) (204/255) (204/255) 1\n\t\t}'

    editor.setValue(`{\n/*\n\tGenerated using COD4 Menu Parser: https://github.com/SheepWizard/COD4-MENU-PARSER\n*/\n\t//Template menu\n\tmenuDef{\n\t\tname \"Menu_1\"\n\t\trect 0 0 (600+40) 480\n\t\tborder 1\n\t\tborderSize 4\n\t\tvisible 1\n\t\tborderColor 0.25 0 0.5 1\n\t\n\n\t\t${itemDef1}\n\n\t\t${itemDef2}\n\n\t\t${itemDef3}\n\t}\n}`)
}

/*
*/
