import React, { Dispatch, SetStateAction, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import VoiceSelect from './VoiceSelect';
import TextInput from './TextInput';
import PlayVoice from './PlayVoice';
import '../css/style.css';

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
    .filter((item) => ['en-US', 'ja-JP', 'ko-KR'].includes(item.lang) || item.lang.includes('zh'))
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

const App: React.FC = () => (
  <Container sx={{ minWidth: 355 }}>
    <Card>
      <VoiceSelect voiceObj={voiceObj} />
      <TextInput voiceObj={voiceObj} />
      <PlayVoice voiceObj={voiceObj} />
    </Card>
  </Container>
);

export default App;