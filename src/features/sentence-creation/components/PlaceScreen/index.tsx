import React from "react";
import { SelectPlace } from "../SelectPlace";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

interface IProps {
  setPlaceUuid: React.Dispatch<React.SetStateAction<string>>;
}

export function PlaceScreen({ setPlaceUuid }: IProps): JSX.Element {
  return (
    <>
      <p>in...</p>

      <SelectPlace setSelectedPlaceUuid={setPlaceUuid} />

      <IconButton
        aria-label="next"
        color="primary"
        // disabled={!activityUuidInput}
        // onClick={() => {
        //   setActivity(activityUuidInput);
        //   onNext();
        // }}
      >
        <CheckIcon fontSize="large" />
      </IconButton>
    </>
  );
}
