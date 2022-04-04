import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';

import { deleteUserLogout } from '@/api/user/delete';

interface UserMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

function UserMenu({ open, anchorEl, setAnchorEl }: UserMenuProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: logoutMutate } = useMutation(deleteUserLogout);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => queryClient.invalidateQueries(['user', 'islogin']),
    });
    router.push('/');
    handleClose();
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/mypage">
          <MenuItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            My Page
          </MenuItem>
        </Link>

        <Divider />

        <Link href="/upload">
          <MenuItem>
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            Upload
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
