import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('La extensión para colapsar imports está activa.');

    // Evento que se dispara cuando se abre un archivo o se cambia el editor activo
    vscode.workspace.onDidOpenTextDocument(handleDocument);
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            handleDocument(editor.document);
        }
    });

    // Evento que se dispara cuando se guarda un archivo
    vscode.workspace.onDidSaveTextDocument(handleDocument);

    // Comando para colapsar manualmente los imports
    let disposable = vscode.commands.registerCommand('autofold-imports.collapseImports', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            collapseImports(editor.document);
        }
    });

    context.subscriptions.push(disposable);

    // Colapsar imports en el documento actualmente abierto
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        handleDocument(editor.document);
    }
}

function handleDocument(document: vscode.TextDocument) {
    if (document.languageId === 'javascriptreact' || document.languageId === 'typescriptreact') {
        collapseImports(document);
    }
}

function collapseImports(document: vscode.TextDocument) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const importRegex = /^import\s.*?from\s['"].*?['"];?$/gm;
    const text = document.getText();
    let match;

    // Guarda la selección actual del editor para restaurarla después de colapsar
    const originalSelections = editor.selections;

    editor.edit((editBuilder) => {
        const foldRanges = [];
        while ((match = importRegex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);
            foldRanges.push(range);
        }

        for (const range of foldRanges) {
            editor.selection = new vscode.Selection(range.start, range.end);
            vscode.commands.executeCommand('editor.fold');
            console.log(`Import colapsado en el rango: ${range.start.line + 1}-${range.end.line + 1}`);
        }
    }).then(() => {
        // Restaura las selecciones originales después de colapsar
        editor.selections = originalSelections;
    });
}

export function deactivate() {}