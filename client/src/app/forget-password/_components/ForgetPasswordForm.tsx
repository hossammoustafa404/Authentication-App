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
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetEmailRequest } from "@lib/api/services/auth";
import {
  ForgetPasswordValidator,
  forgetPasswordValidator,
} from "@lib/zod/auth";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const ForgetPasswordForm = () => {
  const fieldRef = useRef<HTMLInputElement>();
  const [resErrorMsg, setResErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // React Hook Form
  const form = useForm<ForgetPasswordValidator>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordValidator),
    mode: "onBlur",
  });
  const onSubmit = async (formData: ForgetPasswordValidator) => {
    try {
      const { message } = await forgetEmailRequest(formData.email);
      setSuccessMsg(message);
      setResErrorMsg("");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setResErrorMsg(error.response?.data.message);
        } else {
          setResErrorMsg("Something went wrong");
        }
      }
      setSuccessMsg("");
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              let finalField;

              const { ref, ...rest } = field;
              finalField = {
                ref: (e: HTMLInputElement) => {
                  ref(e);
                  fieldRef.current = e;
                },
                ...rest,
              };

              return (
                <FormItem>
                  <FormLabel
                    htmlFor="email"
                    className="capitalize font-semibold text-sm"
                  >
                    email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...finalField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <p className="text-red-500 text-sm mt-6 text-center">{resErrorMsg}</p>
        <p className="text-green-500 text-sm mt-6 text-center">{successMsg}</p>

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

export default ForgetPasswordForm;
