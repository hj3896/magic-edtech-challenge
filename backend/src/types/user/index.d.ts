export interface User extends Document {
  username: string;
  password: string;
  role: "admin" | "user";
}
