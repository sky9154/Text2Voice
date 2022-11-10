import React, { Dispatch, SetStateAction } from 'react';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { voicesObtain } from './App';

type Text2Voice = {
  typeBtn?: string,
  voiceObj: {
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

const PlayBtn: React.FC<Text2Voice> = ({ voiceObj }) => {
  const text2voice = () => {
    let sayer: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    let { text, type, volume } = voiceObj;

    voicesObtain.then((voices) => {
      if (text === '') {
        text = voices[type - 1].lang === 'ja-JP' ? '入力あ バカ' : '你他媽倒是輸入呀';
      }

      speechSynthesis.cancel()

      sayer.text = text;
      sayer.voice = voices[type - 1];
      sayer.volume = volume;

      speechSynthesis.speak(sayer);
    });
  }

  return (
    <IconButton aria-label="play" onClick={text2voice}>
      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    </IconButton>
  );
}

const TypeBtn: React.FC<Text2Voice> = ({ typeBtn, voiceObj, voiceState }) => {
  const typeFunc = () => {
    let { number, setNumber, setName } = voiceState;

    voicesObtain.then((voices) => {
      switch (typeBtn) {
        case 'up':
          number = number + 1 > voices.length ? 1 : number + 1;

          break;
        case 'down':
          number = number - 1 < 1 ? voices.length : number - 1;

          break;
      }

      voiceObj.type = number;

      setNumber(number);
      setName(voices[number - 1].name.split(' - ')[0]);
    });
  }

  switch (typeBtn) {
    case 'up':
      return (
        <IconButton aria-label="typeUp" onClick={typeFunc}>
          <SkipNextIcon />
        </IconButton>
      );
    case 'down':
      return (
        <IconButton aria-label="typeDown" onClick={typeFunc}>
          <SkipPreviousIcon />
        </IconButton>
      );
  }
}

const Settings: React.FC<Text2Voice> = ({ voiceObj, voiceState }) => (
  <CardActions sx={{ flexDirection: "column" }} className="center">
    <Box>
      <TypeBtn typeBtn={'down'} voiceObj={voiceObj} voiceState={voiceState} />
      <PlayBtn voiceObj={voiceObj} />
      <TypeBtn typeBtn={'up'} voiceObj={voiceObj} voiceState={voiceState} />
    </Box>
  </CardActions>
);

export default Settings;