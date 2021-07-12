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

export interface IUser {
  username: string;
  password: string;
  passwordConfirm: string | null;
  firstname: string;
  lastname: string;
  roles: ERole[];
  deleted: boolean;
}

export interface IRole {
  key: ERole;
  permissions: EPermission[];
}

export interface IToken {
  accessToken: string,
  refreshToken: string
}
