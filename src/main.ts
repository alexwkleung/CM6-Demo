import '../styles/main.css'
import { selection } from './selection'
import { editor } from './editor'

function main(): void {
    //call selection function for inserting dropdown selections to the DOM  
    selection();

    //call editor
    editor();
}
main();