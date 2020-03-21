import React, { useState } from "react";
import { SelectActivity } from "../SelectActivity";
import { Button, TextField } from "@material-ui/core";
import { UUID } from "../../types";

interface IProps {
  onNext: () => void;
  setActivity: React.Dispatch<React.SetStateAction<string>>;
}

export function ActivityScreen({ onNext, setActivity }: IProps): JSX.Element {
  const [activityUuidInput, setActivityUuid] = useState<UUID>("");

  return (
    <>
      <p>After the corona pandemic, I want to</p>
      <SelectActivity {...{ setActivityUuid }} />

      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setActivity(activityUuidInput);
          onNext();
        }}
      >
        Create
      </Button>
    </>
  );
}
