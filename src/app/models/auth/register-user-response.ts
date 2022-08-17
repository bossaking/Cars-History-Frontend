import {User} from "./user";

export interface RegisterUserResponse{
  token:string;
  user:User;
}
