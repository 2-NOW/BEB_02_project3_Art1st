import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const UploadImageWrapper = styled.div`
  display: flex;
  margin-right: 2.5rem;
  width: 50%;
  height: 70vh;
  border: 0.1rem dashed;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  height: 60vh;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Uploadimage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImagePreview = (e) => {
    if (image) URL.revokeObjectURL(image);

    const images = e.target.files;
    const imageUrl = URL.createObjectURL(images[0]);

    setImage(images[0]); //object
    setPreview(imageUrl); //string
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
      setPreview(null);
      setImage(null);
    };
  }, []);

  return (
    <>
      <UploadImageWrapper>
        <StyledLabel htmlFor="input-file">
          {preview ? (
            <StyledImage src={preview} />
          ) : (
            <AddCircleIcon
              fontsize="large"
              sx={{ color: "#D9001D", opacity: "0.7" }}
            />
          )}
        </StyledLabel>
        <input
          type="file"
          id="input-file"
          accept="img/*"
          onChange={handleImagePreview}
          style={{ display: "none" }}
        />
      </UploadImageWrapper>
    </>
  );
}
