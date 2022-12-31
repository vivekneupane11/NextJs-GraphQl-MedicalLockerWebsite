import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../client/components/Header";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  GetMeDocument,
  useGetCaregiversQuery,
  GetCaregiversQuery,
  useCreateDepartmentMutation,
  CreateDepartmentMutation,
  useCreateQuestionMutation,
  CreateQuestionMutation,
} from "../client/generated/graphql";
import { axiosGetMe } from "../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../client/requests/graphqlRequestClient";
import useStore from "../client/store";
import Router, { useRouter } from "next/router";
import { LoadingButton } from "../client/components/LoadingButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../client/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { array, boolean, object, string, TypeOf } from "zod";

type CreateDepartmentProp = {};
const departmentSchema = object({
  departmentName: string().min(1, "Department name is required"),
  admin:string().min(1, "Must be assigned to admin").optional().nullable()
});

export type DepartmentInput = TypeOf<typeof departmentSchema>;
const CreateNewService: NextPage<CreateDepartmentProp> = ({}) => {
const [admin,setAdmin] = useState(' ')
const [adminOptions,setAdminOptions] = useState([''])
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;

  //Fetching caregivers
  const query = useGetCaregiversQuery<GetCaregiversQuery, Error>(
    graphqlRequestClient,
    {},
    {
      retry: 1,
      onSuccess: (data) => {
        // setCareGivers(data.getCaregivers.user)
    const filterAdmin =    data?.getCaregivers?.user.filter(e=>e.role === 'admin')
        const admins = filterAdmin.map(e=>e.email)
       setAdminOptions(admins)
       
      },
   
    }
  );
//Creating Departmentsß
  const { mutate: CreateDepartment, isLoading } = useCreateDepartmentMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: CreateDepartmentMutation) {
        toast(`Successfully created department!`, {
          type: "success",
          position: "top-right",
        });
        console.log(data);
        router.push("/department");
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




  const methods = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
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


  const onSubmitHandler: SubmitHandler<DepartmentInput> = async (values) => {

    values.admin = admin;
    console.log(values);
    
    CreateDepartment({
      input: Object.create({
        departmentName:values.departmentName,
        admin:admin
      })
    })

  };

  const selectAdmin = (selected: any) => {
    setAdmin(selected.value);
  };
  return (
    <div className="dark:bg-gray-800">
      <Header />

      <section className="bg-gray-50 dark:bg-gray-900  ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto   lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  lg:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create New Department
              </h1>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5"
                >
                  <FormInput label="Department Name" name="departmentName" />
                  <label className="block text-gray-300 mb-3">
              Assign To:
                    </label>

                  <Dropdown
                  className="rounded"
                    options={adminOptions}
                    onChange={selectAdmin}
                    placeholder="Assign To Admin"
                  />

                  <div className="pb-20">
                    <LoadingButton
                      loading={isLoading}
                      textColor="text-ct-white-600 "
                    >
                      Create New Department
                    </LoadingButton>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
      dehydratedState: dehydrate(queryClient),
      requireAuth: true,
      enableAuth: true,
    },
  };
};

export default CreateNewService;
