import React from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Groups = () => {

const IconBtns = <>
<Tooltip title='back'>
  <IconButton>
    <KeyboardBackspaceIcon/>
  </IconButton>
</Tooltip>
</>

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={'bisque'}
      >
        {" "}
        Groups Lis
      </Grid>
      <Grid item 
      xs={12}
      sm={8}
      sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative',
        padding: '1rem 3rem',
      }}>
        {IconBtns}
      </Grid>
    </Grid>
  );
};

export default Groups;
