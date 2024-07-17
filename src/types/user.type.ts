
// IUser.ts
export default interface IUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  name?: string; // Make this property optional
  orgCode: string;
}

