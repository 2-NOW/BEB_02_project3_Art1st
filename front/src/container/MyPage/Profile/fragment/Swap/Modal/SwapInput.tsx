import { ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import TokenSelect from './TokenSelect';

const swapbox = {
  borderRadius: '20px',
  border: '1px solid rgb(255, 255, 255)',
  backgroundColor: 'rgb(247, 248, 250)',
};

const contentbox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
};

const balancebox = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: 'rgb(0,0,0)',
  fontSize: '0.75rem',
  padding: '0 1rem 1rem',
  lineHeight: '1rem',
};

const downwardcss = {
  padding: '4px',
  borderRadius: '12px',
  height: '32px',
  width: '32px',
  position: 'relative',
  marginTop: '-14px',
  marginBottom: '-14px',
  left: 'calc(50% - 16px)',
  backgroundColor: 'rgb(247, 248, 250)',
  border: '4px solid rgb(255, 255, 255)',
  zIndex: 2,
};

interface SwapInputprops {
  value: number;
  swapable: number;
  setSelectedIndex: (value: number) => void;
  image: string;
  token: string;
  maxValue: number;
  setValue: (value: number) => void;
}

function SwapInput({
  value,
  swapable,
  setSelectedIndex,
  image,
  token,
  setValue,
  maxValue,
}: SwapInputprops) {
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const pattern = /^\d*[.]?\d*$/;
    // if (pattern.test(e.target.value) && e.target.value !== 'e') {
    if (token == 'AST' && maxValue < Number(e.target.value)) setValue(maxValue);
    else setValue(Number(e.target.value));
    // }
  };

  return (
    <>
      <Box sx={swapbox}>
        <Box sx={contentbox}>
          <Input
            inputMode="decimal"
            type="number"
            disableUnderline={true}
            placeholder="0.0"
            defaultValue={value ? value : ''}
            onChange={handleOnChange}
            sx={{ color: 'rgb(0,0,0)', fontWeight: 500, fontSize: '28px' }}
          />
          <TokenSelect
            setSelectedIndex={setSelectedIndex}
            image={image}
            token={token}
          />
        </Box>
        <Box sx={balancebox}>
          {token == 'AST' ? <Typography>Swapable: {swapable}</Typography> : ''}
        </Box>
      </Box>

      <Box sx={downwardcss}>
        <ArrowDownwardIcon
          sx={{ position: 'relative', right: '0.25rem', bottom: '0.25rem' }}
        />
      </Box>
    </>
  );
}

export default SwapInput;
