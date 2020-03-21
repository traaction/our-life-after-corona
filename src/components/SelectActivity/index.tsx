import { TextField } from "@material-ui/core";
import { Autocomplete, AutocompleteChangeReason } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";
import { IActivity, UUID } from "../../types";

const exampleActivities = [
  { name: "walking", uuid: "9d3c783c-2c15-4680-a874-e9d15d6cf70f" },
  { name: "hiking", uuid: "4b8f73b3-12e7-441f-b32c-e3236960e394" },
  { name: "bouldering", uuid: "048b4da9-90a1-4ed0-a02a-3f8b3069eddb" },
  { name: "eating ice", uuid: "bc0dd9d6-b34a-4cc8-91fa-df004feff0de" }
];

const CREATE_NEW_ACTIVITY_URL = "";

export function SelectActivity(): JSX.Element {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isNewActiviy, setIsNewActiviy] = useState<boolean>(false);

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

  async function createNewActicity(newActiviyName: string): Promise<any> {
    // const requestBody = {
    //   // put data in
    // };
    // const response = await fetch(CREATE_NEW_ACTIVITY_URL, {
    //   method: "POST",
    //   body: requestBody
    // });
    // return await response.json();
  }

  function onActivityChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    console.log(event.target.value);

    // API request
    const response = [];

    if (!response || (Array.isArray(response) && response.length === 0)) {
      // New activity!
      setActivities([]);
    } else if (isNewActiviy) {
      // setIsNewActiviy(false);
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
      onInputChange={(...args) => {
        console.log("Autocomplete.onInputChange");
        console.log({ args });
      }}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
          onChange={onActivityChange}
          onBlur={(
            event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            console.log("Autocomplete.TextField.onBlur");
            console.log(event.target.value);
          }}
        />
      )}
    />
  );
}
