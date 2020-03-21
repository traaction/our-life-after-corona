import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";

interface ICountry {
  name: string;
}

export function SelectPlace() {
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    async function loadCountries() {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data: ICountry[] = await response.json();
      setCountries(data);
    }

    if (countries.length === 0) {
      loadCountries();
    }

    // return (cleanUp = () => {});
  }, [countries]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a place"
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
