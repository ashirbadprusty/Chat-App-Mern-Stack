import { Box, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import {Menu as MenuIcon} from '@mui/icons-material'

const Sidebar = () => {
  return <div>Sidebar</div>;
};

const AdminLayout = ({ children }) => {

    const [isMobile,setIsMobile]=useState(false);
    const handleMobile = () =>setIsMobile(!isMobile);
  return (
    <Grid container minHeight={"100vh"}>
        <Box
        sx={{
            display:{xs: 'block', md: 'none'},
            position: 'fixed',
            right: '1rem',
            top: '1rem',
        }}>
            <IconButton onClick={handleMobile}>
            <MenuIcon/>
            </IconButton>
        </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
       <Sidebar/>
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{
        bgcolor: "#f5f5f5"
      }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
