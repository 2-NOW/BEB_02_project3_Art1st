import Box from '@mui/material/Box';
import Image from 'next/image';

const profileImageCss = {
  position: 'relative',
  width: '100%',
  height: '15rem',
};

interface ImageProps {
  src: string;
}

function ProfileImage({ src }: ImageProps) {
  return (
    <Box sx={profileImageCss}>
      <Image src={src} quality={100} layout="fill" objectFit="cover" />
    </Box>
  );
}

export default ProfileImage;
