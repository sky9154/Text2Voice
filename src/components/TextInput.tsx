import React from 'react';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

type TextInputProps = {
  typeNumber: number,
  voice: {
    voice?: SpeechSynthesisVoice,
    text: string,
    type: number,
    volume: number
  }
}

const TextInput: React.FC<TextInputProps> = ({ typeNumber, voice }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => voice.text = event.target.value;

  return (
    <>
      <CardContent className="center input">
        <TextField disabled id="input-type" label="Choose the voice type" variant="outlined" value={typeNumber} />
      </CardContent>
      <CardContent className="center input">
        <TextField id="input-text" label="Enter the text to convert" variant="outlined" onChange={handleChange} />
      </CardContent>
    </>
  );
}

export default TextInput;