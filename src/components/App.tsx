import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import VoiceAlert from './VoiceAlert';
import TextInput from './TextInput';
import PlayBtn from './PlayBtn';
import TypeDownBtn from './TypeDownBtn';
import TypeUpBtn from './TypeUpBtn';
import '../css/style.css';

let voices: SpeechSynthesisVoice[];
let voiceObj: {
  voice?: SpeechSynthesisVoice,
  text: string,
  type: number,
  volume: number
} = {
  text: "",
  type: 0,
  volume: 0.5
};

const voicesFilter = (voices: SpeechSynthesisVoice[]) => voices
  .filter(i => i.lang.includes('ja') || i.lang.includes('zh-TW') || i.lang.includes('zh-CN'))
  .sort((a, b) => a.lang > b.lang ? 1 : -1);

if (speechSynthesis.onvoiceschanged == undefined) {
  speechSynthesis.onvoiceschanged = () => {
    voices = voicesFilter(speechSynthesis.getVoices());
  }
} else {
  voices = voicesFilter(speechSynthesis.getVoices());
}

const App: React.FC = () => {
  const [typeNumber, setTypeNumber] = useState(0);
  const [voiceName, setVoiceName] = useState('Microsoft Nanami Online (Natural)');

  const typeDown = () => {
    const number = typeNumber - 1 < 0 ? 15 : typeNumber - 1;

    voiceObj.type = number;
    voiceObj.voice = voices[number];

    setTypeNumber(number);
    setVoiceName(voiceObj.voice.name.split(' - ')[0]);
  }

  const typeUp = () => {
    const number = typeNumber + 1 > 15 ? 0 : typeNumber + 1;

    voiceObj.type = number;
    voiceObj.voice = voices[number];

    setTypeNumber(number);
    setVoiceName(voiceObj.voice.name.split(' - ')[0]);
  }

  return (
    <Container sx={{ minWidth: 355 }}>
      <Card>

        <VoiceAlert voiceName={voiceName} />

        <TextInput typeNumber={typeNumber} voice={voiceObj} />

        <CardActions sx={{ flexDirection: "column" }} className="center" >
          <Box>

            <TypeDownBtn onClickHandler={typeDown} />
            <PlayBtn voiceObj={voiceObj} voices={voices} />
            <TypeUpBtn onClickHandler={typeUp} />

          </Box>
        </CardActions>

      </Card>
    </Container>
  );
}

export default App;