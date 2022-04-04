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
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { deleteUserLogout } from '@/api/user/delete';

interface UserMenuProps {
  balance?: number;
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

function UserMenu({ balance, open, anchorEl, setAnchorEl }: UserMenuProps) {
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
        // sx={{ width: '25rem' }}
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
        <MenuItem sx={{ width: '9rem' }}>
          <ListItemIcon>🎨</ListItemIcon>
          <Tooltip title={String(balance)}>
            <Typography variant="inherit" noWrap>
              {balance ? balance : 0} AST
            </Typography>
          </Tooltip>
        </MenuItem>

        <Divider />
        <Link href="/mypage">
          <MenuItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            My Page
          </MenuItem>
        </Link>

        <Link href="/upload">
          <MenuItem>
            <ListItemIcon>
              <UploadIcon />
            </ListItemIcon>
            Upload
          </MenuItem>
        </Link>

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
