import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addFriendHandler = (id) => {
    console.log(id, chatId);
  };

  return (
    <Dialog open>
      <Stack p={"1rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map(
              (
                user // Changed 'i' to 'user' and fixed the mapping issue
              ) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={addFriendHandler}
                />
              )
            )
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
          <Button color="error" >Cancel</Button>
          <Button variant="contained" disabled={isLoadingAddMember}>Submit</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
