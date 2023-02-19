export class User{
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  email: string;
  type: string;
  profilePicture: string;
  verified: string;
  org:{
    city:string;
    country:string;
    name:string;
    postNumber:string;
    regNumber:string;
    street:string;
    streetNumber:string;
  }
}
