import React, { useState } from "react";
import { SelectPlace } from "../SelectPlace";
import { Button } from "@material-ui/core";

interface IProps {
  setPlaceUuid: React.Dispatch<React.SetStateAction<string>>;
}

export function PlaceScreen({ setPlaceUuid }: IProps): JSX.Element {
  const [selectedPlaceUuid, setSelectedPlaceUuid] = useState<string>("");

  return (
    <>
      <SelectPlace setSelectedPlaceUuid={setPlaceUuid} />

      <Button variant="outlined" color="primary">
        Create
      </Button>
    </>
  );
}
