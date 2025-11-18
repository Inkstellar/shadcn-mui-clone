import { Container, Grid, Typography } from '@mui/material';
import HeaderCompOne from '../components/layouts/HeaderCompOne';
import { componentsList } from 'mui-cascade';
import { Link } from 'react-router-dom';

const Components = () => {
  return (
    <Container maxWidth="md">
      <HeaderCompOne
        title="Components"
        description="A collection of reusable components that you can use to build your application."
      />
      <Grid container spacing={2}>
        {componentsList.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4}>
            <Typography component={Link} to={`/components/${item.name}`}
                sx={{
                  display: 'block',
                  padding: '12px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: 'underline',
                  }
                }}
            >
            {item.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Components;
