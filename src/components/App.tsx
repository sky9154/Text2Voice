import React, { Dispatch, SetStateAction, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import VoiceAlert from './VoiceAlert';
import TextInput from './TextInput';
import Settings from './Settings';
import '../css/style.css';

let voiceObj: {
  text: string,
  type: number,
  volume: number
} = {
  text: '',
  type: 1,
  volume: 1
};

export const voicesObtain = new Promise((resolve: (voices: SpeechSynthesisVoice[]) => void) => {
  const voicesFilter = (voices: SpeechSynthesisVoice[]) => voices
    .filter(i => i.lang.includes('ja') || i.lang.includes('zh-TW') || i.lang.includes('zh-CN'))
    .sort((a, b) => a.lang > b.lang ? 1 : -1);

  let voices = window.speechSynthesis.getVoices();

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
  const [typeNumber, setTypeNumber] = useState(1);
  const [voiceName, setVoiceName] = useState('');

  const voiceState: {
    number: number,
    setNumber: Dispatch<SetStateAction<number>>,
    setName: Dispatch<SetStateAction<string>>
  } = {
    number: typeNumber,
    setNumber: setTypeNumber,
    setName: setVoiceName
  }

  if (voiceName === '') {
    voicesObtain.then((voices) => setVoiceName(voices[0].name.split(' - ')[0]));
  }

  return (
    <Container sx={{ minWidth: 355 }}>
      <Card>
        <VoiceAlert voiceName={voiceName} />
        <TextInput typeNumber={typeNumber} voice={voiceObj} />
        <Settings voiceObj={voiceObj} voiceState={voiceState} />
      </Card>
    </Container>
  );
}

export default App;