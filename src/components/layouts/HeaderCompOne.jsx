import { Box, Typography } from '@mui/material';

const HeaderCompOne = ({ title, description }) => {
  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
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
  )}

export default HeaderCompOne;