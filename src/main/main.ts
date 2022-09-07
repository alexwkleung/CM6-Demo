import '../styles/main.css'
import { selection } from '../selection/selection'
import { editor } from '../editor/editor'

function main(): void {
    //call selection function for inserting dropdown selections to the DOM  
    selection();

    //call editor
    editor();
}
main();