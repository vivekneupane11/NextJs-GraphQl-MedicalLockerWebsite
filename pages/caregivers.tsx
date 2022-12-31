import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../client/components/Header";
import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  useGetCaregiversQuery,
  GetCaregiversQuery,
  UserData,
  useCreateQuestionMutation,
  CreateQuestionMutation,
  useCreateInventoryMutation,
  CreateInventoryMutation,
} from "../client/generated/graphql";
import { axiosGetCaregivers } from "../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../client/requests/graphqlRequestClient";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

type CaregiverProps = {};

const CaregiverPage: NextPage<CaregiverProps> = ({}) => {
  const [careGivers, setCareGivers] = useState<UserData[]>();
  const router = useRouter();



  //Getting All caregiver/nurse list
  const query = useGetCaregiversQuery<GetCaregiversQuery, Error>(
    graphqlRequestClient,
    {},
    {
      retry: 1,
      onSuccess: (data) => {
        setCareGivers([...data?.getCaregivers?.user]);
      },
    }
  );

  const handleCreateCaregiver = () => {
    router.push("/create-new-caregiver");
  };

  return (
    <div className="dark:bg-gray-800">
      <Header />
      <div className="flex-row justify-end items-end max-w-4xl">
        <button
          onClick={handleCreateCaregiver}
          className="bg-dark m-2 ml-40  flex  hover:bg-gray-500  flex justify-center items-center  text-blue-700 max-w-xl font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-white rounded "
        >
          <AiOutlinePlusCircle size={20} className="pr-1" /> Add New Caregiver
        </button>
      </div>

      <section className="bg-ct-blue-600 min-h-screen p-4 w-full bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl text-gray-700 uppercase dark:text-gray-400 pb-8 pl-8">
          List of Caregivers
        </h2>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  Caregiver Name
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Email
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800 text-lg"
                >
                  Role
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Assigned Service
                </th>
                <th scope="col" className="py-3 px-6 text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {careGivers?.map((e: UserData, i: Number) => (
                <tr
                  key={i.toString()}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {e.name}
                  </th>
                  <td className="py-4 px-6">{e.email}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {e.role}
                  </td>
                  <td className="py-4 px-6 text-blue-600">
                    <Link href="#">{e._id}</Link>
                  </td>

                  <td className="py-4 px-6 text-blue-600">
                    <Link
                      href={{
                        pathname: "/caregiver/[id]",
                        query: { id: e._id },
                      }}
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
    await queryClient.prefetchQuery(["getCaregivers", {}], () =>
      axiosGetCaregivers()
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

export default CaregiverPage;
