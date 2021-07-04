import * as mongodb from "mongodb";

export class Mongo {
  public static client: mongodb.MongoClient;

  public static connect(url: string) {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(
        url,
        { useUnifiedTopology: true } ,
        (error: any, client: mongodb.MongoClient) => {
          if (error) {
            reject(error);
          } else {
            Mongo.client = client;
            resolve(client);
          }
        }
      );
    });
  }
}
