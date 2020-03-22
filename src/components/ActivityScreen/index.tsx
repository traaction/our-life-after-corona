import React, { useState } from "react";
import { SelectActivity } from "../SelectActivity";
import { IconButton } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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

      <IconButton
        aria-label="next"
        color="primary"
        disabled={!activityUuidInput}
        onClick={() => {
          setActivity(activityUuidInput);
          onNext();
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </>
  );
}
