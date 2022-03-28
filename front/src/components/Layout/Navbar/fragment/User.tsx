import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

function User() {
  return (
    <>
      <Link href="/mypage">
        <a>
          <AccountCircleIcon />
        </a>
      </Link>
    </>
  );
}

export default User;
