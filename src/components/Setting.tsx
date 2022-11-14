import React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Text2Voice } from './App';

const Volume: React.FC<Text2Voice> = ({ voiceObj }) => {
  const getVolume = (volume: number) => {
    voiceObj.volume = volume / 100;

    return volume + '';
  }

  return (
    <Stack spacing={2} direction="row" sx={{ m: 1 }} alignItems="center">
      <VolumeDown />
      <Slider defaultValue={50} step={10} min={0} max={100} getAriaValueText={getVolume} />
      <VolumeUp />
    </Stack>
  );
}

const Setting: React.FC<Text2Voice> = ({ voiceObj }) => {
  return (
    <>
      <Volume voiceObj={voiceObj} />
    </>
  );
}

export default Setting;