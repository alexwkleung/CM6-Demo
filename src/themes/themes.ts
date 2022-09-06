import { basicLight } from './extensions/basic-light'
import { basicDark } from './extensions/basic-dark'
import { gruvboxLight } from './extensions/gruvbox-light'
import { gruvboxDark } from './extensions/gruvbox-dark'
import { materialDark } from './extensions/material-dark'
import { nord } from './extensions/nord'
import { solarizedLight } from './extensions/solarized-light'
import { solarizedDark } from './extensions/solarized-dark'

const themes = [
    {
        extension: basicLight,
        name: 'Basic Light',
    },
    {
        extension: basicDark,
        name: 'Basic Dark',
    },
    {
        extension: gruvboxLight,
        name: 'Gruvbox Light',
    },
    {
        extension: gruvboxDark,
        name: 'Gruvbox Dark',
    },
    {
        extension: materialDark,
        name: 'Material Dark',
    },
    {
        extension: nord,
        name: 'Nord',
    },
    {
        extension: solarizedLight,
        name: 'Solarized Light',
    },
    {
        extension: solarizedDark,
        name: 'Solarized Dark',
    },
];

export default themes;