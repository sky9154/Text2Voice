import React from 'react';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';

type Text2Voice = {
  onClickHandler: () => void
}

const TypeUpBtn: React.FC<Text2Voice> = ({ onClickHandler }) => (
  <IconButton aria-label="next" onClick={onClickHandler}>
    <SkipNextIcon />
  </IconButton>
);

export default TypeUpBtn;