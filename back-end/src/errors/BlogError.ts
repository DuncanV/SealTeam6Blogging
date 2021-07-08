import { logBlogs } from "../middleware/logger";

export class BlogError extends Error {

    constructor(messsage: any, status: any) {
      super()
      logBlogs(messsage, status);
      throw new Error(messsage);
    }
}

