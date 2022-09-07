import '../styles/selection.css'

//export selection options
export function selection() {
    const selectionDivs = `
    <div id="theme-selection">
        <select id="theme-list" name="names"></select>
    </div>
    <div id="cursor-selection">
        <select id="cursor-list" name="cursors"></select>
    </div>
    `;

    const app = document.querySelector('#app') as HTMLElement;

    app.insertAdjacentHTML('afterbegin', selectionDivs);
}