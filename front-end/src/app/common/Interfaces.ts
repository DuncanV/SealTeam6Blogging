import {EPermission, ERole} from "./Enums";

export interface IDeletable {
  deleted: boolean;
}

export interface ICreated {
  created: Date;
}

export interface IObject extends ICreated, IDeletable {
  id: string;
}

export interface IContent extends IObject {
  userId: string;
  title: string;
  likes: string[];
  content: string;
  visibile: boolean;
}

export interface IUser extends IObject {
  username: string;
  passwordHash: string;
  salt: string;
  name: string;
  surname: string;
  email: string;
  roles: ERole[];
}

export interface IRole {
  key: ERole;
  permissions: EPermission[];
}

