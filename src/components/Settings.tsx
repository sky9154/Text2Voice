import React from 'react';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type PlayBtnProps = {
  voices: SpeechSynthesisVoice[],
  voiceObj: {
    voice?: SpeechSynthesisVoice,
    text: string,
    type: number,
    volume: number
  }
}

type TypeBtnProps = {
  onClickHandler: () => void
}

type Text2Voice = PlayBtnProps & {
  typeUpDown: {
    up: () => void,
    down: () => void
  }
};

const PlayBtn: React.FC<PlayBtnProps> = ({ voiceObj, voices }) => {
  const text2voice = () => {
    let sayer: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    let voiceTextState: boolean = true;

    if (voiceObj.text === '') {
      voiceObj.text = voiceObj.type > 1 ? '你他媽倒是輸入呀' : '入力あ バカ';
      voiceTextState = false;
    }

    voiceObj.voice = voices[voiceObj.type];

    speechSynthesis.cancel();

    sayer.text = voiceObj.text;
    sayer.voice = voiceObj.voice;
    sayer.volume = voiceObj.volume;

    speechSynthesis.speak(sayer);

    if (!voiceTextState) {
      voiceObj.text = '';
    }
  }

  return (
    <IconButton aria-label="play" onClick={text2voice}>
      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    </IconButton>
  );
}

const TypeUpBtn: React.FC<TypeBtnProps> = ({ onClickHandler }) => (
  <IconButton aria-label="next" onClick={onClickHandler}>
    <SkipNextIcon />
  </IconButton>
);

const TypeDownBtn: React.FC<TypeBtnProps> = ({ onClickHandler }) => (
  <IconButton aria-label="previous" onClick={onClickHandler}>
    <SkipPreviousIcon />
  </IconButton>
);

const Settings: React.FC<Text2Voice> = ({ voiceObj, voices, typeUpDown }) => (
  <CardActions sx={{ flexDirection: "column" }} className="center" >
    <Box>

      <TypeDownBtn onClickHandler={typeUpDown.down} />
      <PlayBtn voiceObj={voiceObj} voices={voices} />
      <TypeUpBtn onClickHandler={typeUpDown.up} />

    </Box>
  </CardActions>
);

export default Settings;