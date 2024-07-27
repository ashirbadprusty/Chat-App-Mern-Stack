import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { Face,AlternateEmail,CalendarMonth } from "@mui/icons-material";
import moment from 'moment';
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"Everyone knows everything eventually"} />
      <ProfileCard heading={"Username"} text={"ashirbadprusty"} Icon={AlternateEmail} />
      <ProfileCard heading={"Name"} text={"Ashirbad Prusty"} Icon={Face} />
      <ProfileCard heading={"joined"} text={moment('2024-01-30T00:00:00.000Z').fromNow()} Icon={CalendarMonth} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    sx={{
      color: "white",
      textAlign: "center",
    }}
  >
    {Icon && <Icon sx={{ fontSize: "2rem" }} />}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
