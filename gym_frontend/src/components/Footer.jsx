import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 - About */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fit For Fight
            </Typography>
            <Typography variant="body2">
              Your premier fitness destination offering top-notch training programs
              and state-of-the-art facilities.
            </Typography>
          </Grid>

          {/* Column 2 - Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              {['Home', 'About', 'Services', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', py: 0.5 }}>
                    {item}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Column 3 - Contact */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" gutterBottom>
              Trivandrum,<br />Nta ,Gym city
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email: info@fit4fight.com
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: 8848325945
            </Typography>
          </Grid>

          {/* Column 4 - Social Media */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Fit For Fight. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;