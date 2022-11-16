import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import { voiceObj } from './App';

type Setting = {
  volumeObj?: {
    volume: number,
    setVolume: (volume: number) => void
  },
  rateObj?: {
    rate: number,
    setRate: (rate: number) => void
  }
}
const VolumeSlider: React.FC<Setting> = ({ volumeObj }) => {
  const { volume, setVolume } = volumeObj;

  const handleChange = (event: Event, volume: number) => {
    voiceObj.volume = volume / 100;

    setVolume(volume);

    return volume + '';
  }

  return (
    <Stack spacing={2} direction="row" sx={{ m: 1 }} alignItems="center">
      <VolumeDown />
      <Slider value={volume} step={10} min={0} max={100} valueLabelDisplay="auto" onChange={handleChange} />
      <VolumeUp />
    </Stack>
  );
}

const PitchSlider: React.FC<Setting> = ({ rateObj }) => {
  const { rate, setRate } = rateObj;

  const handleChange = (event: Event, rate: number) => {
    voiceObj.rate = rate / 10;

    setRate(rate);
  }

  return (
    <Stack spacing={2} direction="row" sx={{ m: 1 }} alignItems="center">
      <AccessibleIcon />
      <Slider value={rate} step={5} min={0} max={100} valueLabelDisplay="auto" onChange={handleChange} />
      <AccessibleForwardIcon />
    </Stack>
  );
}

const Setting: React.FC<Setting> = ({ volumeObj, rateObj }) => (
  <Box m={2}>
    <VolumeSlider volumeObj={volumeObj} />
    <PitchSlider rateObj={rateObj} />
  </Box>
);

export default Setting;