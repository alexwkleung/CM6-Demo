import '../styles/editor.css'
import '../styles/preview.css'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, keymap, rectangularSelection, drawSelection, highlightActiveLine, lineNumbers } from '@codemirror/view'
import { autocompletion, closeBrackets } from '@codemirror/autocomplete'
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { bracketMatching } from '@codemirror/language'
import themes from '../themes/themes'
import { cursors } from '../themes/cursors'

//editor function
export function editor() {
    const app = document.querySelector('#app') as HTMLElement;

    //editor div
    const editorDiv = `
    <div id="preview"></div>
    <div id="editor"></div>
    `;
    
    app.insertAdjacentHTML('beforeend', editorDiv);

    //create compartments
    const themeConfig = new Compartment();
    const cursorConfig = new Compartment();

    //editor state
    const editorState = EditorState.create({
        extensions: [
            markdown({
                base: markdownLanguage,
                codeLanguages: languages,
            }),
            rectangularSelection(),
            drawSelection(),
            highlightActiveLine(),
            lineNumbers(),
            history(),
            autocompletion(),
            closeBrackets(),
            bracketMatching(),
            keymap.of([
                ...defaultKeymap, 
                ...[indentWithTab], 
                ...historyKeymap
            ]),
            themeConfig.of([themes[0]]),
            cursorConfig.of([cursors[0]]),
        ],
    });

    //editor view 
    const editorView = new EditorView({
        state: editorState,
        doc: '',
        parent: document.querySelector('#editor') as HTMLElement,
    });

    //theme list
    const themeList = document.querySelector('#theme-list') as HTMLElement;
    if(themeList) {
        for(let i = 0; i < themes.length; i++) {
            const selectOption = document.createElement('option') as HTMLOptionElement;
            selectOption.setAttribute('value', i.toString());
            selectOption.textContent = themes[i].name;
            themeList.appendChild(selectOption);
        }

        themeList.addEventListener('change', (e): void => {
            if(e.currentTarget instanceof HTMLSelectElement) {
                const num = Number(e.currentTarget.value);

                editorView.dispatch({
                    effects: themeConfig.reconfigure(themes[num])
                });
            }
        });
    }

    //cursor list
    const cursorList = document.querySelector('#cursor-list') as HTMLElement;
    if(cursorList) {
        for(let j = 0; j < cursors.length; j++) {
            const selectOption = document.createElement('option') as HTMLOptionElement;
            selectOption.setAttribute('value', j.toString());
            selectOption.textContent = cursors[j].cursor;
            cursorList.appendChild(selectOption);
        }

        cursorList.addEventListener('change', (e): void => {
            if(e.currentTarget instanceof HTMLSelectElement) {
                const num = Number(e.currentTarget.value);

                editorView.dispatch({
                    effects: cursorConfig.reconfigure(cursors[num])
                });
            }
        });
    }
};