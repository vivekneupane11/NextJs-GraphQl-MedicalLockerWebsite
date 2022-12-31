import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../client/components/Header";
import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  useDeleteDepartmentMutation,
  DeleteDepartmentMutation,
  useGetDepartmentsQuery,
  GetDepartmentsQuery,
} from "../client/generated/graphql";
import {

  axiosGetDepartments,
} from "../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../client/requests/graphqlRequestClient";
import useStore from "../client/store";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

type DepartmentProps = {};
type Departments = {
  _id:string
  departmentName: string;
  admin: string;

  
};

const DepartmentPage: NextPage<DepartmentProps> = ({}) => {
  const [departments, setDepartments] = useState<any[]>();
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;

  const query = useGetDepartmentsQuery<GetDepartmentsQuery, Error>(
    graphqlRequestClient,
    { input: { page: 1, limit: 100 } },
    {
      retry: 1,
      onSuccess: (data) => {
        setDepartments(data?.getDepartments?.departments);
      },
    }
  );
  const { mutate: deleteDepartment } = useDeleteDepartmentMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: DeleteDepartmentMutation) {
        toast("Deleted successfully", {
          type: "success",
          position: "top-right",
        });
        window.location.reload();
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

  const handleDepartmentDelete = (id: string) => {
    deleteDepartment({ deleteDepartmentId: id });
  };


  const handleCreateCaregiver = () => {
    router.push("/create-new-department");
  };

  return (
    <div className="dark:bg-gray-800">
      <Header />
      <div className="flex-row justify-end items-end max-w-4xl">
        <button
          onClick={handleCreateCaregiver}
          className="bg-dark m-2 ml-40  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-xl font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
        >
          <AiOutlinePlusCircle size={20} className="pr-1" /> Add New Department
        </button>
      </div>

      <section className="bg-ct-blue-600 min-h-screen p-4 w-full bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl text-gray-700 uppercase dark:text-gray-100 pb-8 pl-8">List of Departments</h2>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  Department Name
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  AssignedTo
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((e: Departments, i: Number) => (
                <tr
                  key={i.toString()}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {e.departmentName}
                  </th>
                  <td className="py-4 px-6">
                    {e.admin ? e.admin : "---"}
                  </td>
                  <td className="py-4 px-6">
                  <button
                      onClick={() => handleDepartmentDelete(e._id)}
                      className="cursor-pointer ml-10 bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-red-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-red-500 hover:border-red rounded "
                    >
                      Delete 
                    </button>
                  </td>

               
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.access_token) {

    await queryClient.prefetchQuery(["getDepartments", {}], () =>
    axiosGetDepartments()
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

export default DepartmentPage;
