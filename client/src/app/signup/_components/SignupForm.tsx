"use client";

import { Button } from "@components/ui/Button";
import registerFormFields, {
  RegisterFormField,
} from "@constants/forms/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { registerRequest } from "@lib/api/services/auth";
import { RegisterValidator, registerValidator } from "@lib/zod/auth";
import { cn } from "@utils";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import exclude from "@utils/exclude";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { loginFormFields } from "@constants/forms/login";
import { Input } from "@components/ui/Input";
import { useAppDispatch } from "@hooks/redux";
import { userAuthenticated } from "@lib/redux/features/auth";

// Props Interface
interface props extends HTMLAttributes<HTMLFormElement> {}

const SignupForm: FC<props> = ({ className }) => {
  const [resError, setResError] = useState("");
  const router = useRouter();
  const firstFieldRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  // React Hook Form
  const form = useForm<RegisterValidator>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(registerValidator),
    mode: "onBlur",
  });

  // On Submit
  const onSubmit = async (formData: RegisterValidator) => {
    formData = exclude(["confirm_password"], formData);
    try {
      const { user, accessToken } = await registerRequest(formData);
      dispatch(
        userAuthenticated({
          user: {
            firstName: user.first_name,
            avatar: user.avatar,
            role: user.role,
            verified: user.email_verified,
          },
          accessToken,
        })
      );
      setResError("");
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setResError(error.response?.data.message);
      } else {
        setResError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        autoComplete="on"
        className="mt-8"
      >
        <div className="flex flex-col gap-y-6">
          {registerFormFields.map((registerField, index) => {
            return (
              <FormField
                key={registerField.id}
                control={form.control}
                name={registerField.name}
                render={({ field }) => {
                  let finalField;
                  if (index === 0) {
                    const { ref, ...rest } = field;
                    finalField = {
                      ref: (e: HTMLInputElement) => {
                        ref(e);
                        firstFieldRef.current = e;
                      },
                      ...rest,
                    };
                  } else {
                    finalField = field;
                  }
                  return (
                    <FormItem>
                      <FormLabel
                        htmlFor={registerField.id}
                        className="capitalize font-semibold text-sm"
                      >
                        {registerField.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={registerField.type}
                          id={registerField.id}
                          placeholder={registerField.placeholder}
                          {...finalField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </div>
        <p className="text-red-500 text-sm mt-6 text-center">{resError}</p>
        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          Sign up
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </Form>
  );
};

export default SignupForm;
