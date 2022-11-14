import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import VoiceSelect from './VoiceSelect';
import TextInput from './TextInput';
import BtnGroup from './BtnGroup';
import Setting from './Setting';
import '../css/style.css';

export type Text2Voice = {
  voiceObj: {
    text: string,
    lang: string,
    type: number,
    volume: number
  }
}

let voiceObj: {
  text: string,
  lang: string,
  type: number,
  volume: number
} = {
  text: '',
  lang: '',
  type: 0,
  volume: 1
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
        <Card sx={{ m: 1 }}>
          <CardContent sx={{ '&:last-child': { p: 2 }}}>
            <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
              <VoiceSelect voiceObj={voiceObj} />
              <TextInput voiceObj={voiceObj} />
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <BtnGroup themeMode={themeMode} setThemeMode={setThemeMode} voiceObj={voiceObj} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ m: 1 }}>
          <CardContent sx={{ '&:last-child': { p: 2 }}}>
            <Setting voiceObj={voiceObj} />
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;