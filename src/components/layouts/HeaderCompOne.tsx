import { Box, Typography } from '@mui/material';

interface HeaderCompOneProps {
  title: string;
  description: string;
}

const HeaderCompOne = ({ title, description }: HeaderCompOneProps) => {
  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Typography
        variant="h1"
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          color: '#52525b',
          marginBottom: '40px',
          maxWidth: '600px',
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}

export default HeaderCompOne;