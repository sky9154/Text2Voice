import React, { Dispatch, SetStateAction } from 'react';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Text2Voice = {
  typeBtn?: string,
  voices: SpeechSynthesisVoice[],
  voiceObj: {
    voice?: SpeechSynthesisVoice,
    text: string,
    type: number,
    volume: number
  },
  voiceState?: {
    number: number,
    setNumber: Dispatch<SetStateAction<number>>,
    setName: Dispatch<SetStateAction<string>>
  }
}

const PlayBtn: React.FC<Text2Voice> = ({ voiceObj, voices }) => {
  const text2voice = () => {
    let sayer: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    let { voice, text, type, volume } = voiceObj;

    voice = voices[type];

    if (text === '') {
      text = type > 1 ? '你他媽倒是輸入呀' : '入力あ バカ';
    }

    speechSynthesis.cancel()

    sayer.text = text;
    sayer.voice = voice;
    sayer.volume = volume;

    speechSynthesis.speak(sayer);
  }

  return (
    <IconButton aria-label="play" sx={{cursor: "pointer"}} onClick={text2voice}>
      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    </IconButton>
  );
}

const TypeBtn: React.FC<Text2Voice> = ({ typeBtn, voiceObj, voices, voiceState }) => {
  let { number, setNumber, setName } = voiceState;
  
  const typeFunc = () => {
    switch (typeBtn) {
      case 'up':
        number = number + 1 > 15 ? 0 : number + 1;
        
        break;
      case 'down':
        number = number - 1 < 0 ? 15 : number - 1;

        break;
    }
    
    voiceObj.type = number;
    voiceObj.voice = voices[number];

    setNumber(number);
    setName(voiceObj.voice.name.split(' - ')[0]);
  }

  switch (typeBtn) {
    case 'up':
      return (
        <IconButton aria-label="typeUp" sx={{cursor: "pointer"}} onClick={typeFunc}>
          <SkipNextIcon />
        </IconButton>
      );
    case 'down':
      return (
        <IconButton aria-label="typeDown" sx={{cursor: "pointer"}} onClick={typeFunc}>
          <SkipPreviousIcon />
        </IconButton>
      );
  }
}

const Settings: React.FC<Text2Voice> = ({ voiceObj, voices, voiceState }) => (
  <CardActions sx={{ flexDirection: "column" }} className="center" >
    <Box>
      <TypeBtn typeBtn={'down'} voiceObj={voiceObj} voices={voices} voiceState={voiceState} />
      <PlayBtn voiceObj={voiceObj} voices={voices} />
      <TypeBtn typeBtn={'up'} voiceObj={voiceObj} voices={voices} voiceState={voiceState} />
    </Box>
  </CardActions>
);

export default Settings;