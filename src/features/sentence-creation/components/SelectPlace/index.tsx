import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";

interface ICountry {
  name: string;
}

interface IProps {
  setSelectedPlaceUuid: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectPlace({ setSelectedPlaceUuid }: IProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadCountries() {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const data: ICountry[] = await response.json();
      setCountries(data);
      setIsLoading(false);
    }

    if (countries.length === 0) {
      setIsLoading(true);
      loadCountries();
    }
  }, [countries]);

  return (
    <Autocomplete
      style={{ width: 300 }}
      options={countries}
      autoHighlight
      freeSolo
      loading={isLoading}
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      onChange={(_event: unknown, selectedPlace: ICountry | null) => {
        if (selectedPlace) {
          setSelectedPlaceUuid(selectedPlace.name);
        }
      }}
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
