import './styles/editor.css'
import './styles/preview.css'
import './styles/selection.css'
import './styles/highlightjs/gigavolt.min.css'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, keymap, rectangularSelection, drawSelection, highlightActiveLine, lineNumbers } from '@codemirror/view'
import { closeBrackets } from '@codemirror/autocomplete'
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { bracketMatching } from '@codemirror/language'
import themes from './themes/themes'
import { cursors } from './themes/cursors'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'

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

    //preview delay
    let previewDelay: number; 

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
            closeBrackets(),
            bracketMatching(),
            keymap.of([
                ...defaultKeymap, 
                ...[indentWithTab], 
                ...historyKeymap
            ]),
            themeConfig.of([themes[0]]),
            cursorConfig.of([cursors[0]]),
            //listener for preview update 
            EditorView.updateListener.of((event) => {
                setTimeout(updatePreview, 0);
                previewDelay = window.setTimeout(updatePreview, 0);
            })
        ],
    });

    //editor view 
    const editorView = new EditorView({
        state: editorState,
        doc: '',
        parent: document.querySelector('#editor') as HTMLElement,
    });

    //update preview window
    async function updatePreview() {
        const markdownParser = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(remarkGfm)
        .use(remarkEmoji, { emoticon: true })
        .use(rehypeSanitize, {
            ...defaultSchema,
            attributes: {
                ...defaultSchema.attributes,
                code: [
                    ...(defaultSchema.attributes!.code || []),
                    [
                        'className', 
                        'language-cpp', 
                        'language-js', 
                        'language-ts',
                        'language-jsx', 
                        'language-tsx', 
                        'language-bash', 
                        'language-md', 
                        'language-markdown', 
                        'language-shell', 
                        'language-make', 
                        'language-text', 
                        'language-txt', 
                        'language-html', 
                        'language-css',
                        'hljs language-cpp', 
                        'hljs language-js', 
                        'hljs language-ts',
                        'hljs language-jsx', 
                        'hljs language-tsx', 
                        'hljs language-bash', 
                        'hljs language-md', 
                        'hljs language-markdown', 
                        'hljs language-shell', 
                        'hljs language-make', 
                        'hljs language-text', 
                        'hljs language-txt', 
                        'hljs language-html', 
                        'hljs language-css'
                    ]
                ]
            }
        })
        .use(rehypeHighlight, { subset: false })
        .use(rehypeStringify)
        .process(editorView.state.doc.toString());

        (document.querySelector('#preview') as HTMLElement).innerHTML = String(markdownParser);
    }

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