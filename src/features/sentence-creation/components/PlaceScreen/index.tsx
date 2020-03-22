import React from "react";
import { SelectPlace } from "../SelectPlace";

interface IProps {
  setPlaceUuid: React.Dispatch<React.SetStateAction<string>>;
}

export function PlaceScreen({ setPlaceUuid }: IProps): JSX.Element {
  return (
    <>
      <p>in...</p>

      <SelectPlace setSelectedPlaceUuid={setPlaceUuid} />
    </>
  );
}
