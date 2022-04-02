import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function UploadButton() {
  return (
    <Box sx={{ m: '10vh auto' }}>
      <Button
        type="submit"
        sx={{ width: '10vw', minWidth: '7rem' }}
        variant="contained"
      >
        CREATE
      </Button>
    </Box>
  );
}

export default UploadButton;
