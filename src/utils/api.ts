import { UUID, IActivity, ILocation } from "types";
import fetch from "cross-fetch";

enum EEntityType {
  place = "place",
  activity = "activity"
}

/**************
 *
 *  Activities
 *
 *************/

const ACTIVITIES_URL = "http://localhost:8080/activities";

export async function getActivitiesForQuery(
  query: string
): Promise<IActivity[]> {
  const response = await fetch(`${ACTIVITIES_URL}/${query}`);
  return await response.json();
}

export async function createNewActivity(
  newActivityName: string
): Promise<{ uuid: UUID } | undefined> {
  return createNewEntity(newActivityName, EEntityType.activity);
}

/**************
 *
 *  Places
 *
 *************/

const PLACES_URL = "http://localhost:8080/places";

export async function getPlacesForQuery(query: string): Promise<ILocation[]> {
  const response = await fetch(`${PLACES_URL}/${query}`);
  return await response.json();
}

export async function createNewPlace(
  newPlaceName: string
): Promise<{ uuid: UUID } | undefined> {
  return createNewEntity(newPlaceName, EEntityType.place);
}

/**************
 *
 *  Utils
 *
 *************/

/**
 * Create new entity on backend
 */
async function createNewEntity(
  entityName: string,
  entityType: EEntityType
): Promise<{ uuid: UUID } | undefined> {
  if (entityName) {
    let url: string;

    switch (entityType) {
      case EEntityType.activity: {
        url = ACTIVITIES_URL;
        break;
      }
      case EEntityType.place: {
        url = PLACES_URL;
        break;
      }
    }

    const requestBody = {
      name: entityName
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    return await response.json();
  }

  console.debug("called createNewEntitiy with empty string");
  return;
}
