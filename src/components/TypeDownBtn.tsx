import React from 'react';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

type Text2Voice = {
  onClickHandler: () => void
}

const TypeDownBtn: React.FC<Text2Voice> = ({ onClickHandler }) => (
  <IconButton aria-label="previous" onClick={onClickHandler}>
    <SkipPreviousIcon />
  </IconButton>
);

export default TypeDownBtn;