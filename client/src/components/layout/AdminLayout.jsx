import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Dashboard as DashboardIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { matBlack } from "../../constants/color";

const CustomLink = styled(LinkComponent)(({ active }) => ({
  textDecoration: 'none',
  borderRadius: '2rem',
  padding: '1rem 2rem',
  color: active ? 'white' : 'black',
  backgroundColor: active ? matBlack : 'transparent',
  '&:hover': {
    color: active ? 'white' : 'rgba(0, 0, 0, 0.54)',
  },
}));

const handlelogout =()=>{
console.log('logout');
};

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Chat
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <CustomLink
            key={tab.path}
            to={tab.path}
            active={location.pathname === tab.path ? 1 : 0}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={'1.2rem'}>{tab.name}</Typography>
            </Stack>
          </CustomLink>
        ))}

        <CustomLink onClick={handlelogout}>
          <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <ExitToAppIcon/>
        <Typography fontSize={'1.2rem'}>Logout</Typography>
          </Stack>

        </CustomLink>
      </Stack>
    </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

    const handleClose = () => {
      setIsMobile(false);
    };
if(!isAdmin) return <Navigate to='/admin'/>;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
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
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
