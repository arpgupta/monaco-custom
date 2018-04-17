//require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' } });
//window.MonacoEnvironment = { getWorkerUrl: () => proxy };
//var editor = "";
//let proxy = URL.createObjectURL(new Blob([`
//    self.MonacoEnvironment = {
//    baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
//    };
//    importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
//    `], { type: 'text/javascript' }));
require.config({ paths: { 'vs': '/Scripts/monaco-editor/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
var editor = "";
let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
    baseUrl: '/Scripts/monaco-editor/min/'
    };`], { type: 'text/javascript' }));
var TokenKeyvalue = [];
var obj;
var getCode;
var monacoeditor = "0";
require(["vs/editor/editor.main"], function () {
    window.monaco.editor.defineTheme('PayRuleStatementTheme', {
        base: 'vs-dark',
        inherit: false,
        rules: [
            { token: 'custom-info', foreground: '808080' },
            { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'custom-notice', foreground: 'FFA500' },
            { token: 'custom-date', foreground: '008800' },
            { token: 'Collateral', foreground: '54D0DC' },
            { token: 'Bond', foreground: 'B62548' },
            { token: 'Assumption', foreground: '64A826' },
            { token: 'common', foreground: 'FD2472' },
            { token: 'comment1', foreground: '9D715F' },
            { foreground: 'ffffff' },
            { token: 'keyword', foreground: 'FC0000' },
            //{ token: 'identifier', foreground: 'F0E839' },
            //{ token: 'brackets', foreground: 'A8F039' },
            //{ token: 'comment', foreground: '66F039' },
            //{ token: 'comment1', foreground: '39F07F' },
            //{ token: 'comment1', foreground: '39F0E0' },
            //{ token: 'comment1', foreground: '39B6F0' },
            //{ token: 'comment1', foreground: '3976F0' },
        ]
    });

    window.monaco.languages.register({ id: 'PayRuleStatement' });



    //monaco.languages.setMonarchTokensProvider('PayRuleStatement', {
    //        tokenizer: {
    //        root: [
    //            [/\[error.*/, "custom-error"],
    //            [/\[notice.*/, "custom-notice"],
    //            [/\[info.*/, "custom-info"],
    //            [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
    //            [/Collateral/, "Collateral"],
    //            [/Bond/, "Bond"],
    //            [/Assumption/, "Assumption"],
    //            [/DealAssumption/, "Assumption"],
    //            [/[$ -/:-?{-~!"^_`\[\]]/, "common"],
    //            [/[0-9]/, "Assumption"],
    //            [/\#.*?\#/, "comment1"],
    //            [/[A-Z]+\(\)/, "custom-notice"],
    //            //[collateralEditor, "common"],
    //            //[bondEditor, "common"],
    //            //[assumptionEditor, "common"],
    //        ]
    //    }
    //});

    monaco.languages.setMonarchTokensProvider('PayRuleStatement', ColorCode());

    function ColorCode() {
        var key = TokenKeyvalue;
        return {
            keywords: key,
            typeKeywords: [
                'boolean', 'double', 'byte', 'int', 'short', 'char', 'void', 'long', 'float'
            ],
            operators: [
                '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
                '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
                '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
                '%=', '<<=', '>>=', '>>>='
            ],
            symbols: /[=><!~?:&|+\-*\/\^%]+/,
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            tokenizer: {
                root: [
                    [/\[error.*/, "custom-error"],
                    [/\[notice.*/, "custom-notice"],
                    [/\[info.*/, "custom-info"],
                    [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
                    [/Collateral/, "Collateral"],
                    [/Bond/, "Bond"],
                    [/Assumption/, "Assumption"],
                    [/DealAssumption/, "Assumption"],
                    [/[$ -/:-?{-~!"^_`\[\]]/, "common"],
                    [/[0-9]/, "Assumption"],
                    [/\#.*?\#/, "comment1"],
                    [/[A-Z]+\(\)/, "custom-notice"],
                    //[collateralEditor, "common"],
                    //[bondEditor, "common"],
                    //[assumptionEditor, "common"],
                    [/[a-z_$][\w$]*/, {
                        cases: {
                            '@typeKeywords': 'keyword',
                            '@keywords': 'keyword',
                            '@default': 'identifier'
                        }
                    }],
                    { include: '@whitespace' },
                    [/[{}()\[\]]/, '@brackets'],
                    [/[<>](?!@symbols)/, '@brackets'],


                ],
                comment: [
                    [/[^\/*]+/, 'comment'],
                    [/\/\*/, 'comment', '@push'],    // nested comment
                    ["\\*/", 'comment', '@pop'],
                    [/[\/*]/, 'comment']
                ],
                whitespace: [
                    [/[ \t\r\n]+/, 'white'],
                    [/\/\*/, 'comment', '@comment'],
                    [/\/\/.*$/, 'comment'],
                ],
            }
        };
    }
    //window.allFunctionEditor = function () {
    //    window.monaco.languages.registerCompletionItemProvider('PayRuleStatement', {
    //        triggerCharacters: ["."],
    //        provideCompletionItems: function (model, position) {
    //            var data = [];
    //            obj = null;
    //            for (i = 0; i < TokenKeyvalue.length; i++) {
    //                if (TokenKeyvalue[i] != "") {
    //                    obj = {
    //                        label: TokenKeyvalue[i],
    //                        kind: window.monaco.languages.CompletionItemKind.Text,
    //                    }
    //                    if (data.length <= TokenKeyvalue.length) {
    //                        data.push(obj);
    //                    }
    //                }
    //            }
    //            return data;
    //        }
    //    });
    //}
    window.getCode = function () {
        return [
            statement
        ].join('\n');
    }
    editor = window.monaco.editor.create(document.getElementById("txtFormulaEditorId"), {
        theme: 'PayRuleStatementTheme',
        value: getCode(),
        language: 'PayRuleStatement',
        automaticLayout: true,
        glyphMargin: true,
        mouseWheelZoom: true,
        minimap: {
            enabled: true
        }
    });
    window.minimapTrue = function () {
        editor.updateOptions({
            minimap: {
                enabled: true
            }
        });
    }
    window.minimapFalse = function () {
        editor.updateOptions({
            minimap: {
                enabled: false
            }
        });
    }
    //var myBinding = editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
    //    window.monaco.languages.registerCompletionItemProvider('PayRuleStatement', {
    //        triggerCharacters: ["."],
    //        provideCompletionItems: function (model, position, isCancellationRequested) {
    //            var data = [];
    //            obj = null;
    //            for (i = 0; i < TokenKeyvalue.length; i++) {
    //                if (TokenKeyvalue[i] != "") {
    //                    obj = {
    //                        label: TokenKeyvalue[i],
    //                        kind: window.monaco.languages.CompletionItemKind.Text,
    //                    }
    //                    if (data.length <= TokenKeyvalue.length) {
    //                        data.push(obj);
    //                    }
    //                }
    //            }
    //            return data;
    //        }
    //    });
    //});
    var myBinding = editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, function () {
        addHints();
        console.log("add hints");
    });
    window.addHints = function () {
        var data = [];
        obj = null;
        for (i = 0; i < TokenKeyvalue.length; i++) {
            if (TokenKeyvalue[i] != "") {
                obj = {
                    label: TokenKeyvalue[i],
                    kind: window.monaco.languages.CompletionItemKind.Enum,
                }
                if (data.length <= TokenKeyvalue.length) {
                    data.push(obj);
                }
            }
        }
        obj = {
            label: 'AVG',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: {
                value: 'AVG(VALUE)'
            }
        },
            data.push(obj);
        obj = {
            label: 'AND',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: {
                value: 'AND()'
            }
        },
            data.push(obj);
        obj = {
            label: 'OR',
            kind: window.monaco.languages.CompletionItemKind.Function,
            insertText: {
                value: 'OR(VALUE1,VALUE2)'
            }
        },
            data.push(obj);
            obj = {
                label: 'MAX',
                kind: window.monaco.languages.CompletionItemKind.Function,
                insertText: {
                    value: 'MAX(VALUE1,VALUE2)'
                }
            },
            data.push(obj);
            obj = {
                label: 'MIN',
                kind: window.monaco.languages.CompletionItemKind.Function,
                insertText: {
                    value: 'MIN(VALUE1,VALUE2)'
                }
            },
            data.push(obj);
            obj = {
                label: 'IF',
                kind: window.monaco.languages.CompletionItemKind.Property,
                insertText: {
                    value: 'IF(CONDITION)'
                }
            },
            data.push(obj);
            obj = {
                label: 'IFELSE',
                kind: window.monaco.languages.CompletionItemKind.Property,
                insertText: {
                    value: [
                        'if (${1:condition}) {',
                        '\t$0',
                        '} else {',
                        '\t',
                        '}'
                    ].join('\n')
                },
                documentation: 'If-Else Statement'
            },
            data.push(obj);
        obj = {
            label: 'Multiplication',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '*'
            }
            },
            data.push(obj);
        obj = {
            label: 'Division',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '/'
            }
            },
            data.push(obj);
    obj = {
        label: 'Equal',
        kind: window.monaco.languages.CompletionItemKind.Interface,
        insertText: {
            value: '='
        }
            },
            data.push(obj);
        obj = {
            label: 'Not Equal',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '!='
            }
            },
            data.push(obj);
        obj = {
            label: 'Greater Than',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '>'
            }
            },
            data.push(obj);
        obj = {
            label: 'Less Than',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '<'
            }
            },
            data.push(obj);
        obj = {
            label: 'Greater Than Equal',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '=>'
            }
            },
            data.push(obj);
        obj = {
            label: 'Less Than Equal',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '=<'
            }
            },
            data.push(obj);
        obj = {
            label: 'ADD',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '+'
            }
            },
            data.push(obj);
        obj = {
            label: 'Subtraction',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            insertText: {
                value: '-'
            }
        }

        data.push(obj);
    return data;
}
  
    
   
        window.monaco.languages.registerCompletionItemProvider('PayRuleStatement', {
            triggerCharacters: ["."],
            provideCompletionItems: function (model, position, isCancellationRequested) {
                return addHints();
            }
        });
  
    window.addDecoration = function () {
        var Error = JSON.parse(ErrorStatement);
        var ErrorArray = JSON.parse(Error);
        console.log(ErrorArray);

        for (var i = 0; i < ErrorArray.length; i++){
            var line = ErrorArray[i].LineNumber;
            var msg = ErrorArray[i].Messages;
        var decorations = editor.deltaDecorations([], [
            {
                range: new monaco.Range(line+1, 1, line+1, 300),
                options: {
                    isWholeLine: true,
                    hoverMessage: msg,
                    linesDecorationsClassName: 'myGlyphMarginClass',
                }
            }
            ]);
        }
    }
    AddTextToEditor();
    monacoeditor = "1";
});
//function textEditer() {
//    collateralEditor = $.merge(collateral1, collateral2); 
//    bondEditor = $.merge(bond1, bond2);
//    assumptionEditor = assumption;
//    var value1 = $.merge(bondEditor, collateralEditor);
//     value = $.merge(value1, assumptionEditor);
//    console.log(collateralEditor);
//    console.log(bondEditor);
//    console.log(assumptionEditor);
//    console.log(value);
//    //window.allFunctionEditor();
//}


