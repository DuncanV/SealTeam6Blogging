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
  name: string;
  surname: string;
  email: string;
  roles: ERole[];
}

export interface IRole {
  key: ERole;
  permissions: EPermission[];
}

export interface Response{
  message:string;
  data:object;
}