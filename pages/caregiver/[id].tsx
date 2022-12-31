import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../../client/components/Header";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import {
    GetCaregiverQuery,
  GetMeDocument,
  SignUpUserMutation,
  useGetCaregiverQuery,
  useUpdateCaregiverMutation,
} from "../../client/generated/graphql";
import { axiosGetMe } from "../../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../../client/requests/graphqlRequestClient";
import useStore from "../../client/store";
import Router, { useRouter } from "next/router";
import { LoadingButton } from "../../client/components/LoadingButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../client/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";


type CreateCaregiverProps = {};
const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),

});

// Page to edit caregivers details

export type RegisterInput = TypeOf<typeof registerSchema>;
const EditCaregivers: NextPage<CreateCaregiverProps> = ({id}:any) => {
  const store = useStore();
  const [role, setRole] = useState('');
  const [caregiver,setCaregiver] = useState<any>({})
  const router = useRouter();

  const query = useGetCaregiverQuery<GetCaregiverQuery, Error>(
    graphqlRequestClient,
    {getCaregiver:id},
    {
      retry: 1,
      onSuccess: (data:any) => {
        console.log(data.getCaregiver.user,"Here is caregiver");
        
       setCaregiver(data.getCaregiver.user)
      },
   
    }
  );


  const options = [ "nurse","admin"]
  const defaultOption = options[0];

  const user = store.authUser;



  //SignUp User
  const { mutate: UpdateCaregiver, isLoading } = useUpdateCaregiverMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: any) {
        
        toast(`Successfully Edited!`, {
          type: "success",
          position: "top-right",
        });
        router.push("/caregivers");
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
    const addedValue: any = { ...values };

    addedValue.role = role;
    addedValue._id =id;
  UpdateCaregiver({ input: addedValue });
  };

  const selectRole = (selected: any) => {
    setRole(selected.value);
  };
  return (
    <div className="dark:bg-gray-800">
      <Header />

      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  lg:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit Caregivers
              </h1>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="max-w-xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8 space-y-5"
                >
                  <FormInput label="Full Name" name="name" value={caregiver?.name} />
                  <FormInput label="Email" name="email" type="email" value={caregiver?.email}  />
                  <Dropdown
                  className="rounded"
                    options={options}
                    onChange={selectRole}
                    placeholder="Select a role"
                  />
                  {/* <FormInput label="Password" name="password" type="password" />
                  <FormInput
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password"
                  /> */}

                  <LoadingButton
                    loading={isLoading}
                    textColor="text-ct-white-600"
                  >
                   Update Caregiver{" "}
                  </LoadingButton>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req,params }) => {
  if (req.cookies.access_token) {
    await queryClient.prefetchQuery(["getMe", {}], () =>
      axiosGetMe(GetMeDocument, req.cookies.access_token as string)
    );
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
        id:params?.id,
      dehydratedState: dehydrate(queryClient),
      requireAuth: true,
      enableAuth: true,
    },
  };
};

export default EditCaregivers;
