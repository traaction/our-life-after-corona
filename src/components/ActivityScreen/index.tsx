import React, { useState } from "react";
import { SelectActivity } from "../SelectActivity";
import { Button, TextField } from "@material-ui/core";
<<<<<<< HEAD
import Typing from "react-typing-animation";
=======
>>>>>>> cffff13d932d18487de10ea542946f6b56d66775

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
  const [showActivityText, setShowActivityText] = useState<boolean>(false);
  const [showActivityInput, setShowActivityInput] = useState<boolean>(false);

  return (
    <>
      <>
        <Typing>
          <span>Hi, my name is</span>
        </Typing>
        <TextField
          onChange={event => {
            setUserNameInput(event.target.value);
          }}
          onBlur={event => setShowActivityText(true)}
        />
      </>

      {showActivityText && (
        <Typing onFinishedTyping={() => setShowActivityInput(true)}>
          <p>and after the corona pandemic, I want to</p>
        </Typing>
      )}

      {showActivityInput && (
        <>
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
      )}
    </>
  );
}
