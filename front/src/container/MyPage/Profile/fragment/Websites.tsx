import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

interface WebsitesProps {
  websites: string[];
  isEdit: boolean;
  editInstagram: string;
  editTwitter: string;
  editFacebook: string;
  setEditInstagram: (value: string) => void;
  setEditTwitter: (value: string) => void;
  setEditFacebook: (value: string) => void;
}

function Websites({
  websites,
  isEdit,
  editInstagram,
  editTwitter,
  editFacebook,
  setEditInstagram,
  setEditTwitter,
  setEditFacebook,
}: WebsitesProps) {
  return (
    <Box sx={{ mt: '2rem' }}>
      {isEdit ? (
        <>
          <Input
            sx={{ mt: '0.5rem' }}
            defaultValue={websites[0] ? websites[0] : editInstagram}
            onChange={(e) => setEditInstagram(e.target.value)}
            placeholder="Instagram"
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            }
          />
          <Input
            sx={{ mt: '0.5rem' }}
            defaultValue={websites[1] ? websites[1] : editTwitter}
            onChange={(e) => setEditTwitter(e.target.value)}
            placeholder="Twitter"
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <TwitterIcon />
              </InputAdornment>
            }
          />
          <Input
            sx={{ mt: '0.5rem' }}
            defaultValue={websites[2] ? websites[2] : editFacebook}
            onChange={(e) => setEditFacebook(e.target.value)}
            placeholder="Facebook"
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <FacebookIcon />
              </InputAdornment>
            }
          />
        </>
      ) : (
        <>
          <IconButton>
            <a
              href={websites[0]}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <InstagramIcon />
            </a>
          </IconButton>

          <IconButton>
            <a
              href={websites[1]}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <TwitterIcon />
            </a>
          </IconButton>

          <IconButton>
            <a
              href={websites[2]}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FacebookIcon />
            </a>
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default Websites;
