import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../client/components/Header";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiExpandAlt } from "react-icons/bi";

import {

  useGetServicesQuery,
  GetServicesQuery,
  useDeleteServiceMutation,
  DeleteServiceMutation,
  useUpdateServiceMutation,
  UpdateServiceMutation,
} from "../client/generated/graphql";
import { IUser } from "../client/lib/types";
import {

  axiosGetServices,
} from "../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../client/requests/graphqlRequestClient";
import useStore from "../client/store";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

type ServiceProps = {};
type Services = {
  _id: string;
  serviceName: string;
  assignedTo: string;
  trolleyOne: [
    {
      name: string;
      expiryDate: string;
      qty:string
    }
  ];
  trolleyTwo: [
    {
      name: string;
      expiryDate: string;
      qty:string
    }
  ];
  trolleyThree: [
    {
      name: string;
      expiryDate: string;
      qty:string
    }
  ];
  trolleyFour: [
    {
      name: string;
      expiryDate: string;
      qty:string
    }
  ];
};

const ServicePage: NextPage<ServiceProps> = ({}) => {
  const [services, setServices] = useState<any[]>();
  const store = useStore();
  const router = useRouter();
  const user = store.authUser;

  const query = useGetServicesQuery<GetServicesQuery, Error>(
    graphqlRequestClient,
    { input: { page: 1, limit: 100 } },
    {
      retry: 1,
      onSuccess: (data) => {
        setServices(data?.getServices?.services);
      },
    }
  );
  const { mutate: deleteService } = useDeleteServiceMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: DeleteServiceMutation) {
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
  const { mutate: UpdateServiceMutation } = useUpdateServiceMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: UpdateServiceMutation) {
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
  const handleServiceDelete = (id: string) => {
    deleteService({ deleteServiceId: id });
  };
  const handleServiceUpdate = (id: string) => {
    UpdateServiceMutation({
      input: {
        assignedTo: "Nepal",
        assignedAt: "now",
        dailyTap: [true],
        dailyTapDoneAt: ["a"],
        monthlyTap: [false],
        monthlyTapDoneAt: ["1"],
      },
      updateServiceId: id,
    });
  };

  const handleCreateCaregiver = () => {
    router.push("/create-new-service");
  };

  return (
    <div className="dark:bg-gray-800">
      <Header />
      <div className="flex-row justify-end items-end max-w-4xl">
        <button
          onClick={handleCreateCaregiver}
          className="bg-dark m-2 ml-40  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-xl font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
        >
          <AiOutlinePlusCircle size={20} className="pr-1" /> Add New Service
        </button>
      </div>

      <section className="bg-ct-blue-600 min-h-screen p-4 w-full bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl text-gray-700 uppercase dark:text-gray-100 pb-8 pl-8">List of Services</h2>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  Service Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  Admin
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  AssignedTo
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  AssignedAt
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Equipment List
                </th>
          
              </tr>
            </thead>
            <tbody>
              {services?.map((e: Services, i: Number) => (
                <tr
                  key={i.toString()}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {e.serviceName}
                  </th>
                  <td className="py-4 px-6">
                    {e.admin ? e.admin : "---"}
                  </td>
                  <td className="py-4 px-6">
                    {e.assignedTo ? e.assignedTo : "---"}
                  </td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {e?.assignedAt ? e?.assignedAt : "---"}
                  </td>
                  <td className="py-4 px-6 text-blue-600 flex  items-center">
                    <div className="flex-row cursor-pointer">
                      <Link
                        href={"/service/" + e._id}
                        className="cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <div className="flex items-center">
                          {" "}
                          <BiExpandAlt size={28} className="pr-3" /> View{" "}
                        </div>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleServiceDelete(e._id)}
                      className="cursor-pointer ml-10 bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-red-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-red-500 hover:border-red rounded "
                    >
                      Delete
                    </button>
                    <Link
                    href={{
                      pathname: '/editservice/[id]',
                      query: { id: e._id },
                    }}
                      className="cursor-pointer ml-10 bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-blue rounded "
                    >
                      Edit
                    </Link>

            
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

    await queryClient.prefetchQuery(["getServices", {}], () =>
      axiosGetServices()
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

export default ServicePage;
