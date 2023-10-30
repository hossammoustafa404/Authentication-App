"use client";

import { Button } from "@components/ui/Button";
import { cn } from "@utils";
import { FC, HTMLAttributes, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LoginValidator, loginValidator } from "@lib/zod/auth";
import { loginFormFields } from "@constants/forms/login";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import { selectAuthUser } from "@lib/redux/features/auth";
import { useAppSelector } from "@hooks/redux";
import { useLogin } from "@lib/api/hooks/auth";

// Props Interface
interface Props extends HTMLAttributes<HTMLFormElement> {}

const SigninForm: FC<Props> = ({ className }) => {
  const [resError, setResError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const authUser = useAppSelector(selectAuthUser);
  const login = useLogin();

  // React Hook Form
  const form = useForm<LoginValidator>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidator),
    mode: "onBlur",
  });

  // On Submit
  const onSubmit = async (formValues: LoginValidator) => {
    try {
      await login(formValues);
      setResError("");

      if (redirectUrl) {
        router.replace(redirectUrl);
      } else {
        router.back();
      }
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        setResError(error.response?.data.message);
      } else {
        setResError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (authUser) {
      router.replace(document.referrer);
    }
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
          {loginFormFields.map((loginField, index) => {
            return (
              <FormField
                key={loginField.id}
                control={form.control}
                name={loginField.name}
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
                        htmlFor={loginField.id}
                        className="capitalize font-semibold text-sm"
                      >
                        {loginField.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={loginField.type}
                          id={loginField.id}
                          placeholder={loginField.placeholder}
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
          Sign in
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </Form>
  );
};

export default SigninForm;
