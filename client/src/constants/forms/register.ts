export interface RegisterFormField {
  label: string;
  type: string;
  name:
    | "first_name"
    | "last_name"
    | "email"
    | "username"
    | "password"
    | "confirm_password";
  id: string;
  placeholder: string;
}

// Register Form Fields
const registerFormFields: RegisterFormField[] = [
  {
    label: "first name",
    type: "text",
    name: "first_name",
    id: "first_name",
    placeholder: "Enter your first name",
  },
  {
    label: "last name",
    type: "text",
    name: "last_name",
    id: "last_name",
    placeholder: "Enter your last name",
  },
  {
    label: "email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Enter your email",
  },
  {
    label: "username",
    type: "text",
    name: "username",
    id: "username",
    placeholder: "Enter your username",
  },
  {
    label: "password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter your password",
  },
  {
    label: "confirm password",
    type: "password",
    name: "confirm_password",
    id: "confirm_password",
    placeholder: "Re-enter your password",
  },
];

export default registerFormFields;
