import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

import Button from '@mui/material/Button';

import ProfileImage from './fragment/ProfileImage';
import Content from './fragment/Content';
import Websites from './fragment/Websites';
import ConfirmModal from './fragment/ConfirmModal';

import { getUser } from '@/api/user/get';
import { putEditUser } from '@/api/user/put';

function index() {
  // todo: swap 기능 ui 추가 후 address 및 balance 데이터 뿌리는 작업 예정
  // todo: edit user post 기능
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editWebsites, setEditWebsites] = useState([]);

  const editUserData = useMutation(putEditUser);

  const handleClick = () => {
    if (isEdit) setOpen(!open);
    setIsEdit(true);
  };

  const handleConfirm = () => {
    editUserData.mutate({ user_name: editName, user_desc: editDescription });
  };

  const { data: userData, isLoading, isError } = useQuery(['user'], getUser());

  if (isLoading) return <div>Loading...</div>;

  const { picture: profileImage, description } = userData.user_profile;
  const { name: userName, user_websites: websites } = userData.user;
  return (
    <>
      <ProfileImage src={profileImage} />

      <Content
        isEdit={isEdit}
        userName={userName}
        description={description}
        editName={editName}
        editDescription={editDescription}
        setEditName={setEditName}
        setEditDescription={setEditDescription}
      />

      <Websites isEdit={isEdit} websites={websites} />

      <Button
        onClick={handleClick}
        sx={{ mt: '2rem', width: '100%' }}
        variant="outlined"
      >
        {isEdit ? 'Save Profile' : 'Edit Profile'}
      </Button>

      <ConfirmModal
        open={open}
        setOpen={setOpen}
        setIsEdit={setIsEdit}
        handleConfirm={handleConfirm}
      />
    </>
  );
}

export default index;
