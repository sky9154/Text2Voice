import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { voiceObj, voicesObtain } from './App';

type ThemeMode = {
  themeMode: string,
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>
}

type Dialog = {
  setOpen: (state: boolean) => void
}

const ThemeBtn: React.FC<ThemeMode> = ({ themeMode, setThemeMode }) => {
  const [themeBtn, setThemeBtn] = React.useState(<Brightness4Icon />);

  const toggleColorMode = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    setThemeBtn(themeMode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />);
  }

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {themeBtn}
    </IconButton>
  );
}

const SettingBtn: React.FC<Dialog> = ({ setOpen }) => {
  const handleClickOpen = () => setOpen(true);

  return (
    <IconButton color="inherit" onClick={handleClickOpen}>
      <TuneIcon />
    </IconButton>
  );
}

const PlayBtn: React.FC = () => {
  const [playBtn, setPlayBtn] = React.useState(<VolumeMuteIcon sx={{ height: 35, width: 35 }} />);

  const playVoice = () => {
    let sayer: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
    let { text, lang, type, volume, rate } = voiceObj;

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
      sayer.rate = rate;

      console.log(sayer);

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
    <IconButton onClick={playVoice} color="inherit">
      {playBtn}
    </IconButton>
  );
}

const BtnGroup: React.FC<ThemeMode & Dialog> = ({ themeMode, setThemeMode, setOpen }) => (
  <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
    <SettingBtn setOpen={setOpen} />
    <PlayBtn />
    <ThemeBtn themeMode={themeMode} setThemeMode={setThemeMode} />
  </Stack>
);

export default BtnGroup;