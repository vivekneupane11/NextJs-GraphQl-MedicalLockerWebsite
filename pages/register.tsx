import { GetServerSideProps, NextPage } from "next";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import FormInput from "../client/components/FormInput";
import Link from "next/link";
import { LoadingButton } from "../client/components/LoadingButton";
import { useRouter } from "next/router";
import {
  SignUpUserMutation,
  useSignUpUserMutation,
} from "../client/generated/graphql";
import graphqlRequestClient from "../client/requests/graphqlRequestClient";
import { toast } from "react-toastify";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  // photo: string().min(1, 'Photo is required'),
  role: string().optional(),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { mutate: SignUpUser, isLoading } = useSignUpUserMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: SignUpUserMutation) {
        toast(`Welcome ${data.signupUser.user.name}!`, {
          type: "success",
          position: "top-right",
        });
        console.log(data.signupUser.user);
        router.push("/login");
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
    }
  );

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    // 👇 Execute the Mutation
    values.role = "";
    SignUpUser({ input: values });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Account{" "}
            </h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8 space-y-5"
              >
                <FormInput label="Full Name" name="name" />
                <FormInput label="Email" name="email" type="email" />
                <FormInput label="Password" name="password" type="password" />
                <FormInput
                  label="Confirm Password"
                  name="passwordConfirm"
                  type="password"
                />
                <span className="block text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="text-ct-blue-600">Login Here</a>
                  </Link>
                </span>
                <LoadingButton
                  loading={isLoading}
                  textColor="text-ct-white-600"
                >
                  Sign Up
                </LoadingButton>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      requireAuth: false,
      enableAuth: false,
    },
  };
};

export default RegisterPage;
