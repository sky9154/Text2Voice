import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainCard from './MainCard';
import MainDialog from './MainDialog';
import '../css/style.css';

export let voiceObj: {
  text: string,
  lang: string,
  type: number,
  volume: number,
  rate: number
} = {
  text: '',
  lang: '',
  type: 0,
  volume: 0.5,
  rate: 1
};

export const voicesObtain = new Promise((resolve: (voices: SpeechSynthesisVoice[]) => void) => {
  const voicesFilter = (voices: SpeechSynthesisVoice[]) => voices
    .filter((item) => ['en-US', 'ja-JP', 'ko-KR', 'zh-TW', 'zh-CN', 'zh-HK'].includes(item.lang))
    .sort((a, b) => a.lang > b.lang ? 1 : -1);

  let voices: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();

  if (voices.length !== 0) {
    resolve(voicesFilter(voices));
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      voices = window.speechSynthesis.getVoices();

      resolve(voicesFilter(voices));
    });
  }
});

const App: React.FC = () => {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light');
  const [open, setOpen] = React.useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode as PaletteMode,
      ...(themeMode === 'dark' ? {
        background: { default: '#0A1828', paper: '#0E203F' }
      } : {
        background: { default: '#BBDEFD' }
      })
    },
    typography: { fontFamily: `"Noto Sans JP", "Noto Sans TC", "Roboto", sans-serif` },
    components: {
      MuiCard: {
        styleOverrides: {
          ...(themeMode === 'dark' && { root: { border: '1px solid #2161DD' } })
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ minWidth: 355 }}>
        <MainCard themeMode={themeMode} setThemeMode={setThemeMode} setOpen={setOpen} />
        <MainDialog open={open} setOpen={setOpen} />
      </Container>
    </ThemeProvider>
  );
}

export default App;