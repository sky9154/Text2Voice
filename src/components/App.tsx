import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import VoiceSelect from './VoiceSelect';
import TextInput from './TextInput';
import BtnGroup from './BtnGroup';
import '../css/style.css';
import { PaletteMode } from '@mui/material';

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
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  const darkTheme = createTheme({ palette: { mode: theme as PaletteMode } });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ minWidth: 355 }}>
        <Card sx={{ m: 1 }}>
          <VoiceSelect voiceObj={voiceObj} />
          <TextInput voiceObj={voiceObj} />
          <BtnGroup theme={theme} setTheme={setTheme} voiceObj={voiceObj} />
        </Card>
        <Card sx={{ m: 1 }}>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;