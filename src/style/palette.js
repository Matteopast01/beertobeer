import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#4fc3f7',
            main: '#29b6f6',
            dark: '#0288d1',
            contrastText: '#fff',
        },

        secondary: {
            main: '#0288d1',
        },
        error: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        warning: {
            light: '#ff9800',
            main: '#ed6c02',
            dark: '#e65100',
            contrastText: '#000',
        },
        success: {
            light: '#4caf50',
           main: '#2e7d32',
            dark: '#1b5e20',
            contrastText: '#fff'
        },
        black:{
            light: '#eeeeee',
            main: '#9e9e9e',
            dark: '#333333',
            contrastText: '#212121'
        },
    },
});

export default theme;

/* export const primary = '#FFFFFF';

export const secondary = '#2196F3';

export const tertiary = '#333333';

export const quaternary = '#c9c9c9';

export const error = '#EC0013';

export const alert = '#FFCD34';*/
