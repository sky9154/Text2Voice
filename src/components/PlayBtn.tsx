import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type Text2Voice = {
  voices: SpeechSynthesisVoice[],
  voiceObj: {
    voice?: SpeechSynthesisVoice,
    text: string,
    type: number,
    volume: number
  }
}

const PlayBtn: React.FC<Text2Voice> = ({ voiceObj, voices }) => {
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

export default PlayBtn;