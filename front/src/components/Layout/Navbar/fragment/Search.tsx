import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

function Search() {
  return (
    <Input
      sx={{ pl: '1rem', mr: '3rem', width: '14rem' }}
      id="input-with-icon-adornment"
      placeholder="Search..."
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default Search;
