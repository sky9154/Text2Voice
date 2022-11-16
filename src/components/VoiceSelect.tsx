import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { voiceObj, voicesObtain } from './App';

const VoiceSelect: React.FC = () => {
  const [langSelect, setLangSelect] = React.useState([<MenuItem key="" value="">None</MenuItem>]);
  const [voiceSelect, setVoiceSelect] = React.useState([<MenuItem key="" value="">None</MenuItem>]);
  const [lang, setLang] = React.useState('');
  const [voice, setVoice] = React.useState('');

  if (langSelect.length === 1) {
    voicesObtain.then((voices) => {
      let langMap = voices.map((item) => item.lang);

      langMap = Array.from(new Set(langMap));
      langMap.map((lang) => langSelect.push(
        <MenuItem key={lang} value={lang}>{lang}</MenuItem>
      ));

      setLangSelect(langSelect);
    });
  }

  const langHandleChange = (event: SelectChangeEvent) => {
    const lang: string = event.target.value;
    const defaultVoiceSelect: JSX.Element[] = [];

    if (lang === '') {
      defaultVoiceSelect.push(<MenuItem key="" value="">None</MenuItem>);
    } else {
      voicesObtain.then((voices) => {
        const voiceMap = voices
          .filter((item) => item.lang.includes(lang))
          .sort((a, b) => a.lang > b.lang ? 1 : -1);

        voiceMap.map((voice, index) => defaultVoiceSelect.push(
          <MenuItem key={index} value={index}>{voice.name.split(' - ')[0]}</MenuItem>
        ));
      });
    }

    voiceObj.lang = lang;

    setLang(lang);
    setVoiceSelect(defaultVoiceSelect);
    setVoice(lang === '' ? '' : '0');
  };

  const voiceHandleChange = (event: SelectChangeEvent) => {
    const type: string = event.target.value;

    voiceObj.type = Number(type);

    setVoice(type);
  };

  return (
    <>
      <FormControl sx={{ minWidth: 330 }}>
        <InputLabel id="lang">Select the language of voice</InputLabel>
        <Select label="Select the language of voice" value={lang} onChange={langHandleChange}>
          {langSelect}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 330 }}>
        <InputLabel id="voice">Select the type of voice</InputLabel>
        <Select label="Select the type of voice" value={voice} onChange={voiceHandleChange}>
          {voiceSelect}
        </Select>
      </FormControl>
    </>
  );
}

export default VoiceSelect;