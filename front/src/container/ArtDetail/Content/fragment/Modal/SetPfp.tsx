import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from 'react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Loading from '@/components/Loading';
import { successState, errorState } from '@/store/status';
import { putUserPfp } from '@/api/user/put';

interface Setpfpprops {
  artworkImage: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SetPfp({ artworkImage, open, setOpen }: Setpfpprops) {
  const queryClient = useQueryClient();
  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  const { mutate: setPfpMutate, isLoading: setPfpIsLoading } =
    useMutation(putUserPfp);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetPfp = () => {
    //API) /user/profile user_pic artImage
    setPfpMutate(
      { user_picture: artworkImage },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['user', 'islogin']);
          setOpen(false);
          setSuccessState(true);
        },
        onError: () => {
          setOpen(false);
          setErrorState(true);
        },
      }
    );
  };

  if (setPfpIsLoading) return <Loading />;

  return (
    <>
      <Box sx={{ pt: '0.9rem', pl: '0.5rem' }}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            {'Do you want to set this image as your profile?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSetPfp}>Set as profile</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default SetPfp;
