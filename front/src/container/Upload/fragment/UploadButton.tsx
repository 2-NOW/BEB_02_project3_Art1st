import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface UploadButtonProps {
  handleCreate: () => void;
}

function UploadButton({ handleCreate }: UploadButtonProps) {
  return (
    <Box sx={{ m: '10vh auto' }}>
      <Button
        sx={{ width: '10vw', minWidth: '7rem' }}
        variant="contained"
        onClick={handleCreate}
      >
        CREATE
      </Button>
    </Box>
  );
}

export default UploadButton;
