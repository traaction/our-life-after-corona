export type UUID = string;

export interface IActivity {
  name: string;
  uuid?: UUID;
}

export interface ILocation {
  name: string;
  uuid?: UUID;
}

export interface ISentence {
  userUuid: UUID;
  userName: string;
  activityUuid: UUID;
  placeUuid: UUID;
  userLocation: {
    lat: number;
    long: number;
  };
}
