import React, { Dispatch, SetStateAction, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import VoiceAlert from './VoiceAlert';
import TextInput from './TextInput';
import Settings from './Settings';
import InfoSnackbar from './InfoSnackbar';
import '../css/style.css';

let voices: SpeechSynthesisVoice[];
let voiceObj: {
  voice?: SpeechSynthesisVoice,
  text: string,
  type: number,
  volume: number
} = {
  text: '',
  type: 0,
  volume: 0.5
};

const voicesFilter = (voices: SpeechSynthesisVoice[]) => voices
  .filter(i => i.lang.includes('ja') || i.lang.includes('zh-TW') || i.lang.includes('zh-CN'))
  .sort((a, b) => a.lang > b.lang ? 1 : -1);

if (speechSynthesis.onvoiceschanged == undefined) {
  speechSynthesis.onvoiceschanged = () => {
    voices = voicesFilter(speechSynthesis.getVoices());
    voiceObj.voice = voices[0];
  }
} else {
  voices = voicesFilter(speechSynthesis.getVoices());
  voiceObj.voice = voices[0];
}

const App: React.FC = () => {
  const [typeNumber, setTypeNumber] = useState(0);
  const [voiceName, setVoiceName] = useState('Microsoft Nanami Online (Natural)');

  const voiceState: {
    number: number,
    setNumber: Dispatch<SetStateAction<number>>,
    setName: Dispatch<SetStateAction<string>>
  } = {
    number: typeNumber,
    setNumber: setTypeNumber,
    setName: setVoiceName
  }

  return (
    <Container sx={{ minWidth: 355 }}>
      <Card>
        <VoiceAlert voiceName={voiceName} />
        <TextInput typeNumber={typeNumber} voice={voiceObj} />
        <Settings voiceObj={voiceObj} voices={voices} voiceState={voiceState} />
      </Card>
      <InfoSnackbar />
    </Container>
  );
}

export default App;