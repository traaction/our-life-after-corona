import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { EChangeReason, ILocation } from "types";
import { createNewPlace, getPlacesForQuery } from "utils/api";

interface IProps {
  setSelectedPlaceUuid: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectPlace({ setSelectedPlaceUuid }: IProps) {
  const [places, setPlaces] = useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [placeQuery, setPlaceQuery] = useState<string>("");
  const [selectedPlaceName, setSelectedPlaceName] = useState<string>("");

  useEffect(() => {
    async function loadCountries() {
      const places: ILocation[] = await getPlacesForQuery(placeQuery);
      setPlaces(places);
      setIsLoading(false);
    }

    if (placeQuery.length > 0) {
      setIsLoading(true);
      loadCountries();
    }
  }, [placeQuery]);

  async function onTextFieldBlur(): Promise<void> {
    const selectedActivity = places.filter(
      place => place.name === selectedPlaceName
    );

    if (selectedActivity.length > 0) {
      setSelectedPlaceUuid(selectedActivity[0].uuid!);
    } else if (selectedPlaceName) {
      const res = await createNewPlace(selectedPlaceName);
      if (res) {
        setSelectedPlaceUuid(res.uuid);
      }
    }
  }
  return (
    <Autocomplete
      style={{ width: 300 }}
      options={places}
      autoHighlight
      freeSolo
      loading={isLoading}
      getOptionLabel={option => option.name}
      renderOption={option => option.name}
      onInputChange={(event, input: string, reason: string) => {
        switch (reason) {
          case EChangeReason.clear: {
            setPlaces([]);
            setPlaceQuery("");
            break;
          }
          default: {
            setSelectedPlaceName(input);
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
            setPlaceQuery(event.target.value);
          }}
          onBlur={onTextFieldBlur}
        />
      )}
    />
  );
}
