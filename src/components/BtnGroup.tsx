import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CardActions from '@mui/material/CardActions';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { voicesObtain } from './App';

type Theme = {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
}

type Text2Voice = {
  voiceObj: {
    text: string,
    lang: string,
    type: number,
    volume: number
  }
}

const ThemeBtn: React.FC<Theme> = ({ theme, setTheme }) => {
  const [themeBtn, setThemeBtn] = React.useState(<Brightness4Icon />);

  const toggleColorMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setThemeBtn(theme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />);
  }

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {themeBtn}
    </IconButton>
  );
}

const PlayBtn: React.FC<Text2Voice> = ({ voiceObj }) => {
  const [playBtn, setPlayBtn] = React.useState(<VolumeMuteIcon sx={{ height: 35, width: 35 }} />);
  
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

    sayer.onstart = () => {
      setPlayBtn(<VolumeUpIcon sx={{ height: 35, width: 35 }} />);
    };

    sayer.onend = () => {
      setPlayBtn(<VolumeMuteIcon sx={{ height: 35, width: 35 }} />);
    };
  }

  return (
    <IconButton aria-label="play" onClick={playVoice} color="inherit">
      {playBtn}
    </IconButton>
  );
}

const BtnGroup: React.FC<Theme & Text2Voice> = ({ theme, setTheme, voiceObj }) => {
  return (
    <CardActions className="center">
      <PlayBtn voiceObj={voiceObj} />
      <ThemeBtn theme={theme} setTheme={setTheme} />
    </CardActions>
  );
}

export default BtnGroup;