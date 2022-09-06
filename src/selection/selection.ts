import '../styles/selection.css'

//export selection options
export function selection() {
    const selectionDivs = `
    <div id="theme-selection">
        <label for="theme">Theme:</label>
        <select id="theme-list" name="names"></select>
    </div>
    <div id="cursor-selection">
        <label for="cursor">Cursors:</label>
        <select id="cursor-list" name="cursors"></select>
    </div>
    `;

    const app = document.querySelector('#app') as HTMLElement;

    app.insertAdjacentHTML('afterbegin', selectionDivs);
}