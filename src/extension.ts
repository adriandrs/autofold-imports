import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('La extensión para colapsar imports está activa.');

    const config = vscode.workspace.getConfiguration('autofoldImports');

    if (config.get('onStartOrOpen')) {
        // Evento que se dispara cuando se abre un archivo
        vscode.workspace.onDidOpenTextDocument(handleDocument);
    }

    if (config.get('onEditorChange')) {
        // Evento que se dispara cuando se cambia el editor activo
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                handleDocument(editor.document);
            }
        });
    }

    if (config.get('onSave')) {
        // Evento que se dispara cuando se guarda un archivo
        vscode.workspace.onDidSaveTextDocument(handleDocument);
    }

    // Comando para colapsar manualmente los imports
    let disposable = vscode.commands.registerCommand('autofold-imports.collapseImports', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            collapseImports(editor.document);
        }
    });

    context.subscriptions.push(disposable);

    // Colapsar imports en el documento actualmente abierto si onStartOrOpen está activado
    if (config.get('onStartOrOpen')) {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            handleDocument(editor.document);
        }
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

    const importRegex = /^import\s[\s\S]+?from\s.+?;$/gm;
    const text = document.getText();
    let match;

    // Busca todos los imports y colapsa cada uno
    while ((match = importRegex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        // Colapsa el rango de los imports
        vscode.commands.executeCommand('editor.fold', { selection: range });
        console.log(`Import colapsado en el rango: ${range.start.line + 1}-${range.end.line + 1}`);
    }
}

export function deactivate() {}