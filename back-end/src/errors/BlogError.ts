import { logBlogs } from "../middleware/logger";

export class BlogError extends Error {

    constructor(messsage: any, status: any, method: any) {
      super()
      logBlogs(messsage, status, method);
      throw new Error(messsage);
    }
}

