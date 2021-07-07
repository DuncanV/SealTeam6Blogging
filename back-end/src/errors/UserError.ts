import { logUsers } from "../middleware/logger";

export class UserError extends Error {

    constructor(messsage: any, status: any) {
      super()
      logUsers(messsage, status);
      throw new Error(messsage);
    }
}

