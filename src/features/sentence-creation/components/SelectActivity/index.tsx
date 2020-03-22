import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { IActivity, UUID, EChangeReason } from "types";
import { createNewActivity, getActivitiesForQuery } from "utils/api";

interface IProps {
  setActivityUuid: React.Dispatch<React.SetStateAction<UUID>>;
}

export function SelectActivity({ setActivityUuid }: IProps): JSX.Element {
  const [selectedActivityName, setSelectedActivityName] = useState<string>("");

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activityQuery, setActivityQuery] = useState<string>("");

  useEffect(() => {
    async function loadActivities() {
      const activities: IActivity[] = await getActivitiesForQuery(
        activityQuery
      );
      setActivities(activities);
    }

    if (activityQuery.length > 0) {
      loadActivities();
    }
  }, [activityQuery]);

  async function onTextFieldBlur(): Promise<void> {
    const selectedActivity = activities.filter(
      activity => activity.name === selectedActivityName
    );

    if (selectedActivity.length > 0) {
      setActivityUuid(selectedActivity[0].uuid!);
    } else if (selectedActivityName) {
      const res = await createNewActivity(selectedActivityName);
      if (res) {
        setActivityUuid(res.uuid);
      }
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
