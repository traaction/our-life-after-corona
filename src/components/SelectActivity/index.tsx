import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";
import { IActivity, UUID } from "../../types";

const ACTIVITY_URL = "http://localhost:8080/activities";

interface IProps {
  setActivityUuid: React.Dispatch<React.SetStateAction<UUID>>;
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

    if (activityQuery.length > 0 && activities.length === 0) {
      loadActivities();
    }
  }, [activities, activityQuery]);

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

  // function onActivityChange(
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ): void {
  //   setActivityQuery(event.target.value);

  //   // API request
  //   // const response = [];

  //   // if (!response || (Array.isArray(response) && response.length === 0)) {
  //   //   // New activity!
  //   //   setActivities([]);
  //   // } else {
  //   //   // setIsNewActiviy(false);
  //   // }
  // }

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
      blurOnSelect={true}
      freeSolo={true}
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      selectOnFocus={true}
      onInputChange={(event, input: string) => {
        // console.log("Autocomplete.onInputChange");
        // console.log({ event, input });
        setSelectedActivityName(input);
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
