"use client";

import { Button } from "@components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import resetPasswordFormFields from "@constants/forms/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@lib/api/hooks/auth";
import { ResetPasswordValidator, resetPasswordValidator } from "@lib/zod/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends HTMLAttributes<HTMLFormElement> {
  resetToken: string;
}

const ResetPasswordForm: FC<Props> = ({ resetToken }) => {
  const firstFieldRef = useRef<HTMLInputElement>();
  const [resErrorMsg, setResErrorMsg] = useState("");
  const resetPassword = useResetPassword();
  const router = useRouter();

  // React Hook Form
  const form = useForm<ResetPasswordValidator>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(resetPasswordValidator),
    mode: "onBlur",
  });
  const onSubmit = async (formData: ResetPasswordValidator) => {
    try {
      await resetPassword(resetToken, formData.password);
      setResErrorMsg("");
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setResErrorMsg(error.response?.data.message);
        } else {
          setResErrorMsg("Something went wrong");
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        autoComplete="on"
        className="mt-8"
      >
        <div className="flex flex-col gap-y-6">
          {resetPasswordFormFields.map((formField, index) => {
            return (
              <FormField
                key={formField.id}
                control={form.control}
                name={formField.name}
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
                        htmlFor={formField.id}
                        className="capitalize font-semibold text-sm"
                      >
                        {formField.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={formField.type}
                          id={formField.id}
                          placeholder={formField.placeholder}
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

        <p className="text-red-500 text-sm mt-6 text-center">{resErrorMsg}</p>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
      {/* <DevTool control={form.control} /> */}
    </Form>
  );
};

export default ResetPasswordForm;
