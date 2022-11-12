import React from 'react';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { voicesObtain } from './App';

type Text2Voice = {
  voiceObj: {
    text: string,
    lang: string,
    type: number,
    volume: number
  }
}

const PlayVoice: React.FC<Text2Voice> = ({ voiceObj }) => {
  const playVoice = () => {
    let sayer: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    let { text, lang, type, volume } = voiceObj;

    lang = lang || 'en-US';
    text = text || 'Please enter the text to convert';

    voicesObtain.then((voices) => {
      const voiceMap = voices
        .filter((item) => item.lang.includes(lang))
        .sort((a, b) => a.lang > b.lang ? 1 : -1);

      speechSynthesis.cancel()

      sayer.text = text;
      sayer.voice = voiceMap[type];
      sayer.volume = volume;

      speechSynthesis.speak(sayer);
    });
  }

  return (
    <CardActions sx={{ flexDirection: "column" }} className="center">
      <Box>
        <IconButton aria-label="play" onClick={playVoice}>
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </Box>
    </CardActions>
  );
}

export default PlayVoice;