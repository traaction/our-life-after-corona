import React, { useState } from "react";
import { SelectActivity } from "../SelectActivity";
import { Button, TextField } from "@material-ui/core";

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
  const [activityUuidInput, setActivityUuid] = useState<string>("");

  return (
    <>
      <div>
        Hi, my name is{" "}
        <TextField
          onChange={event => {
            setUserNameInput(event.target.value);
          }}
        />{" "}
        and
      </div>
      <p>after the corona epidemic, I want to</p>

      {/*TODO: cascade changes up */}
      <SelectActivity />

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
  );
}
