import React, { useState } from "react";
import { SelectActivity } from "../SelectActivity";
import { Button, TextField } from "@material-ui/core";
import { UUID } from "../../types";

interface IProps {
  onNext: () => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setActivity: React.Dispatch<React.SetStateAction<string>>;
}

export function ActivityScreen({
  onNext,
  setUserName,
  setActivity
}: IProps): JSX.Element {
  const [userNameInput, setUserNameInput] = useState<string>("");
  const [activityUuidInput, setActivityUuid] = useState<UUID>("");
  const [showActivityInput, setShowActivityInput] = useState<boolean>(false);

  return (
    <>
      <>
        <span>Hi, my name is</span>
        <TextField
          onChange={event => {
            setUserNameInput(event.target.value);
          }}
          onBlur={event => setShowActivityInput(true)}
        />
      </>

      {showActivityInput && (
        <>
          <p>and after the corona pandemic, I want to</p>
          <SelectActivity {...{ setActivityUuid }} />

          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setUserName(userNameInput);
              setActivity(activityUuidInput);
              onNext();
            }}
          >
            Create
          </Button>
        </>
      )}
    </>
  );
}
