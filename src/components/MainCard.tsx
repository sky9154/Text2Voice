import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import VoiceSelect from './VoiceSelect';
import TextInput from './TextInput';
import BtnGroup from './BtnGroup';

type Card = {
  themeMode: string,
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>,
  setOpen: (state: boolean) => void
}

const MainCard: React.FC<Card> = ({ themeMode, setThemeMode, setOpen }) => {
  return (
    <Card sx={{ m: 1 }}>
      <CardContent sx={{ '&:last-child': { p: 2 } }}>
        <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
          <VoiceSelect />
          <TextInput />
          <BtnGroup themeMode={themeMode} setThemeMode={setThemeMode} setOpen={setOpen} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MainCard;