import React from 'react';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';

type Text2Voice = {
  voiceName: string
}

const VoiceAlert: React.FC<Text2Voice> = ({ voiceName }) => (
  <CardContent>
    <Alert icon={false} severity="info" className="center">{voiceName}</Alert>
  </CardContent>
);

export default VoiceAlert;