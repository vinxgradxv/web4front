import {User} from "./user";

export interface Entry {
  id?:number,
  x:number,
  y:number,
  r:number,
  hit:boolean,
  user?:User
}
