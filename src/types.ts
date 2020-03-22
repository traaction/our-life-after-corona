export type UUID = string;

export interface IActivity {
  name: string;
  uuid?: UUID;
}

export interface ILocation {
  name: string;
  uuid?: UUID;
}

export interface INewSentence {
  userUuid: UUID;
  activityUuid: UUID;
  placeUuid: UUID;
  userLocation: {
    lat: number;
    long: number;
  };
}

export enum EChangeReason {
  createOption = "create-option",
  selectOption = "select-option",
  removeOption = "remove-option",
  blur = "blur",
  "clear" = "clear"
}
