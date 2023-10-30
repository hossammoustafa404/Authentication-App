export interface LoginFormField {
  label: string;
  type: "email" | "password";
  name: "email" | "password";
  id: string;
  placeholder: string;
}

export const loginFormFields: LoginFormField[] = [
  {
    label: "email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Enter your email",
  },
  {
    label: "password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter your password",
  },
];
