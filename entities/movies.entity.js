import { Entity } from "electrodb"; //ORM
import { client } from "../util/dbconnection.js";
const Movies = new Entity(
  {
    model: {
      entity: "Movies",
      version: "1",
      service: "MovieService",
    },
    attributes: {
      movieId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
      poster: {
        type: "string",
        required: true,
      },
      trailer: {
        type: "string",
        required: true,
      },
      summary: {
        type: "string",
        required: true,
      },
      rating: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          // highlight-next-line
          field: "pk",
          facets: ["movieId"],
        },
        sk: {
          // highlight-next-line
          field: "sk",
          facets: [],
        },
      },
    },
    // add your DocumentClient and TableName as a second parameter
  },
  { client, table: "movies" }
);

export { Movies };
