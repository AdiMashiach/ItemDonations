export type User = {
  email: string;
  password: string;
  phoneNumber: string;
};

export const users: User[] = [
  { email: "a@gmail.com", password: "12345678", phoneNumber: "+972526310107" },
  { email: "b@gmail.com", password: "12345678", phoneNumber: "+972526310107" },
];
