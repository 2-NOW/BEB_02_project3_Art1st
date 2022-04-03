import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface NameProps {
  isEdit: boolean;
  userName: string;
  description: string;
  editName: string;
  editDescription: string;
  setEditName: (name: string) => void;
  setEditDescription: (value: string) => void;
}

function Content({
  isEdit,
  userName,
  description,
  editName,
  editDescription,
  setEditName,
  setEditDescription,
}: NameProps) {
  return (
    <>
      {isEdit ? (
        <>
          <TextField
            sx={{ mt: '2rem', fontSize: '2rem' }}
            fullWidth
            variant="standard"
            onChange={(e) => setEditName(e.target.value)}
            defaultValue={userName ? userName : editName}
            placeholder="What's your name?"
            inputProps={{
              style: { fontSize: '1.5rem' },
            }}
          />
          <TextField
            sx={{ mt: '1rem' }}
            multiline
            fullWidth
            minRows={4}
            variant="standard"
            onChange={(e) => setEditDescription(e.target.value)}
            defaultValue={description ? description : editDescription}
            placeholder="Describe who you are."
            inputProps={{
              style: { fontSize: '1rem' },
            }}
          />
        </>
      ) : (
        <>
          <Typography sx={{ ml: '0.5rem', mt: '2rem' }} variant="h5">
            {userName}
          </Typography>
          <Typography sx={{ mt: '1rem' }} variant="subtitle1">
            {description}
          </Typography>
        </>
      )}
    </>
  );
}

export default Content;
