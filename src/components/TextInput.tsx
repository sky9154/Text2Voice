import React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

type Text2Voice = {
  voiceObj: {
    text: string,
    lang: string,
    type: number,
    volume: number
  }
}

const TextInput: React.FC<Text2Voice> = ({ voiceObj }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    voiceObj.text = event.target.value;
  }

  return (
    <CardContent className="center">
      <TextField label="Enter the text to convert" sx={{ minWidth: 320 }} variant="outlined" onChange={handleChange} />
    </CardContent>
  );
}

export default TextInput;