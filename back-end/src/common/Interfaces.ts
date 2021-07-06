import {EPermission, ERole} from "./Enums";

export interface IDeletable {
  deleted: boolean;
}

export interface ICreated {
  created: Date;
}

export interface IObject extends ICreated, IDeletable {
  id: number;
}

export interface IContent extends IObject {
  username: string;
  title: string;
  likes: string[];
  content: string;
  visible: boolean;
}

export interface IUser extends IObject {
  username: string;
  passwordHash: string;
  firstname: string;
  lastname: string;
  // email: string;
  role: ERole;
  refreshToken:string;
}

export interface IRole {
  key: ERole;
  permissions: EPermission[];
}

export interface IResponse{
  message:string;
  data:object;
}
