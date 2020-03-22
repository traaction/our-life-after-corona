import React from "react";
import { UUID } from "../../../../types";
import { SelectActivity } from "../SelectActivity";

interface IProps {
  setActivityUuid: React.Dispatch<React.SetStateAction<UUID>>;
}

export function ActivityScreen({ setActivityUuid }: IProps): JSX.Element {
  return (
    <>
      <p>After the corona pandemic, I want to do...</p>

      <SelectActivity {...{ setActivityUuid }} />
    </>
  );
}
