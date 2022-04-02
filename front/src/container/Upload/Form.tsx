import { FormEvent } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';

import Box from '@mui/material/Box';

import Title from './fragment/Title';
import Description from './fragment/Description';
import Uploadimage from './fragment/UploadImage';
import InputTags from './fragment/InputTags';
import UploadButton from './fragment/UploadButton';
import ForSale from './fragment/ForSale';

import { postArtworkUpload } from '@/api/artwork/post';

const wrapperCss = {
  display: 'flex',
  flexDirection: 'column',
  m: '6rem 20vw 0 20vw',
};

function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [forSale, setForSale] = useState(false);
  const [price, setPrice] = useState('');

  const uploadArtwork = useMutation(postArtworkUpload);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // todo: submit 확인하고 안되면 onclick으로 변경
    e.preventDefault();
    if (title && description && image) {
      const metaData = { title, description, tags, forSale, price };
      const formData = new FormData();
      formData.append('image', image);
      formData.append('metadata', JSON.stringify(metaData));

      uploadArtwork.mutate(formData);
    }
  };

  return (
    <Box sx={wrapperCss} component="form" onSubmit={handleSubmit}>
      <Title title={title} setTitle={setTitle} />
      <Uploadimage image={image} setImage={setImage} />
      <Description description={description} setDescription={setDescription} />
      <InputTags tags={tags} setTags={setTags} />
      <ForSale
        forSale={forSale}
        setForSale={setForSale}
        price={price}
        setPrice={setPrice}
      />
      <UploadButton />
    </Box>
  );
}

export default Form;
