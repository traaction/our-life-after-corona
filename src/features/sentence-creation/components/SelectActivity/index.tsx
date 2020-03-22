import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";
import { IActivity, UUID } from "../../../../types";

const ACTIVITY_URL = "http://localhost:8080/activities";

interface IProps {
  setActivityUuid: React.Dispatch<React.SetStateAction<UUID>>;
}

enum EChangeReason {
  createOption = "create-option",
  selectOption = "select-option",
  removeOption = "remove-option",
  blur = "blur",
  "clear" = "clear"
}

export function SelectActivity({ setActivityUuid }: IProps): JSX.Element {
  const [selectedActivityName, setSelectedActivityName] = useState<string>("");

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activityQuery, setActivityQuery] = useState<string>("");

  useEffect(() => {
    async function loadActivities() {
      const response = await fetch(`${ACTIVITY_URL}/${activityQuery}`);
      const data: IActivity[] = await response.json();
      setActivities(data);
    }

    if (activityQuery.length > 0) {
      loadActivities();
    }
  }, [activityQuery]);

  async function createNewActivity(newActivityName: string): Promise<any> {
    // const requestBody = {
    //   // put data in
    // };
    // const response = await fetch(CREATE_NEW_ACTIVITY_URL, {
    //   method: "POST",
    //   body: requestBody
    // });
    // return await response.json();
  }

  function onTextFieldBlur(): void {
    const selectedActivity = activities.filter(
      activity => activity.name === selectedActivityName
    );

    if (selectedActivity.length > 0) {
      setActivityUuid(selectedActivity[0].uuid!);
    } else {
      createNewActivity(selectedActivityName);
    }
  }

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={activities}
      autoHighlight
      blurOnSelect
      freeSolo
      selectOnFocus
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      onInputChange={(event, input: string, reason: string) => {
        switch (reason) {
          case EChangeReason.clear: {
            setActivities([]);
            setActivityQuery("");
            break;
          }
          default: {
            setSelectedActivityName(input);
            break;
          }
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setActivityQuery(event.target.value);
          }}
          onBlur={onTextFieldBlur}
        />
      )}
    />
  );
}
