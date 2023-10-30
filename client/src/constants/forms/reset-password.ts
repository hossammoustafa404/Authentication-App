export interface ResetPasswordFormField {
  label: string;
  type: string;
  name: "password" | "confirm_password";
  id: string;
  placeholder: string;
}

const resetPasswordFormFields: ResetPasswordFormField[] = [
  {
    label: "new password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Enter your new password",
  },
  {
    label: "confirm new password",
    type: "password",
    name: "confirm_password",
    id: "confirm_password",
    placeholder: "Re-enter your new password",
  },
];

export default resetPasswordFormFields;
