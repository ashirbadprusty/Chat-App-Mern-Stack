import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Container, Paper, Stack } from "@mui/material";
import { AdminPanelSettings as AdminPanelSettingsIcon } from "@mui/icons-material";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack>
        <AdminPanelSettingsIcon/>
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>{Appbar}</Container>
    </AdminLayout>
  );
};

export default Dashboard;
