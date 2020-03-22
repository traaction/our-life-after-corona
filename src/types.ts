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
export interface ISentence {
  activity: IActivity;
  place: ILocation;
  userInfo: {
    userUUID: UUID;
    lat: number;
    long: number;
  };
  uuid: UUID;
}

export enum EChangeReason {
  createOption = "create-option",
  selectOption = "select-option",
  removeOption = "remove-option",
  blur = "blur",
  clear = "clear"
}
