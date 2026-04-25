import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  searchTerm: string;
  onChange: (searchTerm: string) => void;
}

export default function SearchInput({
  searchTerm,
  onChange,
}: SearchInputProps) {
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        id="search-bar"
        label="Search lotteries"
        value={searchTerm}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
