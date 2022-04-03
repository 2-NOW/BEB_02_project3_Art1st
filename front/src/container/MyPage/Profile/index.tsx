import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ProfileImage from './fragment/ProfileImage';
import Content from './fragment/Content';
import Websites from './fragment/Websites';
import ConfirmModal from './fragment/ConfirmModal';
import Loading from '@/components/Loading';
import Alert from '@/components/Alert';

import { getUser } from '@/api/user/get';
import { putEditUser } from '@/api/user/put';

function index() {
  // todo: swap 기능 ui 추가 후 address 및 balance 데이터 뿌리는 작업 예정
  // todo: edit user post 기능
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editTwitter, setEditTwitter] = useState('');
  const [editFacebook, setEditFacebook] = useState('');

  const { mutate: editUserDataMutate, isSuccess: editUserDataIsSuccess } =
    useMutation(putEditUser);

  const handleClick = () => {
    if (isEdit) setOpen(!open);
    setIsEdit(true);
  };

  const handleConfirm = () => {
    editUserDataMutate(
      {
        user_name: editName ? editName : userName,
        user_desc: editDescription ? editDescription : description,
        instagram: editInstagram ? editInstagram : instargram,
        twitter: editTwitter ? editTwitter : tweeter,
        facebook: editFacebook ? editFacebook : facebook,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setIsEdit(false);
          queryClient.invalidateQueries('user');
        },
      }
    );
  };

  const { data: userData, isLoading, isError } = useQuery(['user'], getUser());

  if (isLoading) return <Loading />;

  const {
    picture: profileImage,
    description,
    instargram,
    tweeter,
    facebook,
  } = userData.user_profile;

  const { name: userName } = userData.user;
  const websites = [instargram, tweeter, facebook];
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

      <Websites
        isEdit={isEdit}
        websites={websites}
        editInstagram={editInstagram}
        setEditInstagram={setEditInstagram}
        editTwitter={editTwitter}
        setEditTwitter={setEditTwitter}
        editFacebook={editFacebook}
        setEditFacebook={setEditFacebook}
      />

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
