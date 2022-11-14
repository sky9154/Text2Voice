import React from 'react';
import TextField from '@mui/material/TextField';
import { Text2Voice } from './App';

const TextInput: React.FC<Text2Voice> = ({ voiceObj }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    voiceObj.text = event.target.value;
  }

  return (
    <TextField label="Enter the text to convert" sx={{ minWidth: 330 }} variant="outlined" onChange={handleChange} />
  );
}

export default TextInput;