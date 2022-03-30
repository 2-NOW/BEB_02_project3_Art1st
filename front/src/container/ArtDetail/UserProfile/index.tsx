import Profile from './Profile';
import OtherWorks from './OtherWorks';
import Divider from '@mui/material/Divider';

function index() {
  return (
    <>
      <Divider sx={{ mt: '20vh' }} />
      <Profile name={''} avatar={''} description={''} />
      <OtherWorks />
    </>
  );
}

export default index;
