import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";

interface IActivity {
  name: string;
}

const exampleActivities = [
  { name: "walking" },
  { name: "hiking" },
  { name: "bouldering" },
  { name: "eating ice" }
];

export function SelectActivity(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    async function loadCountries() {
      // const response = await fetch("https://restcountries.eu/rest/v2/all");
      // const data: ICountry[] = await response.json();
      setActivities(exampleActivities);
    }

    if (activities.length === 0) {
      loadCountries();
    }

    // return (cleanUp = () => {});
  }, [activities]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={activities}
      autoHighlight
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose an activity"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
