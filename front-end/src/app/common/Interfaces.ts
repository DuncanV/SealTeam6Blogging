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
}

export interface IUser extends IObject {
  username: string;
  passwordHash: string;
  salt: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: ERole[];
}

export interface IRole {
  key: ERole;
  permissions: EPermission[];
}

