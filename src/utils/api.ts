import fetch from "cross-fetch";
import { IActivity, ILocation, INewSentence, ISentence, UUID } from "types";

enum EEntityType {
  place = "place",
  activity = "activity",
  sentence = "sentence"
}

/**************
 *
 *  Activities
 *
 *************/

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
 *  Sentence
 *
 *************/

export async function getSentencesForUser(
  userUuid: UUID
): Promise<ISentence[]> {
  const response = await fetch(`${SENTENCES_URL}/${userUuid}`);
  return await response.json();
}

export async function createNewSentence(
  newSentence: INewSentence
): Promise<{ uuid: UUID } | undefined> {
  return createNewEntity(newSentence, EEntityType.sentence);
}

/**************
 *
 *  Utils
 *
 *************/

const ACTIVITIES_URL = "http://localhost:8080/activities";
const PLACES_URL = "http://localhost:8080/places";
const SENTENCES_URL = "http://localhost:8080/sentences";

/**
 * Create new entity on backend
 */
async function createNewEntity(
  entity: string | INewSentence,
  entityType: EEntityType
): Promise<{ uuid: UUID } | undefined> {
  if (entity) {
    let url: string;
    let requestBody;

    switch (entityType) {
      case EEntityType.activity: {
        url = ACTIVITIES_URL;
        requestBody = {
          name: entity
        };
        break;
      }
      case EEntityType.place: {
        url = PLACES_URL;
        requestBody = {
          name: entity
        };
        break;
      }
      case EEntityType.sentence: {
        url = SENTENCES_URL;
        requestBody = entity;
        break;
      }
    }

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
