import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../../client/components/Header";
import QRCode from "react-qr-code";

import {
  useGetServiceQuery,
  GetServiceQuery,
} from "../../client/generated/graphql";
import { axiosGetService } from "../../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../../client/requests/graphqlRequestClient";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

type ServiceProps = {};
type services = {
  serviceName: string;
  image: string;
  _id: string;
  assignedTo: string;
  assignedAt: string | null;
  admin: string;
  trolleyOne: [
    {
      name: string;
      expiryDate: string;
      qty: string;
    }
  ];
  trolleyTwo: [
    {
      name: string;
      expiryDate: string;
      qty: string;
    }
  ];
  trolleyThree: [
    {
      name: string;
      expiryDate: string;
      qty: string;
    }
  ];
  trolleyFour: [
    {
      name: string;
      expiryDate: string;
      qty: string;
    }
  ];
};
const ServiceDetailPage: NextPage<ServiceProps> = ({ id }: any) => {
  let componentRef = useRef();

  const [services, setServices] = useState<services>();
  const router = useRouter();

  const query = useGetServiceQuery<GetServiceQuery, Error>(
    graphqlRequestClient,
    { getServiceId: id },
    {
      retry: 1,
      onSuccess: (data: any) => {
        // setCareGivers(data.getCaregivers.user)
        console.log(data);

        if (data.getService.status === "success")
          setServices(data.getService.service);
        //    setCareGivers([...data?.getCaregivers?.user])
      },
    }
  );

  const handleCreateCaregiver = () => {
    router.push("/create-new-caregiver");
  };

  return (
    <div className="dark:bg-gray-800">
      <Header />

      <section className="bg-ct-blue-600 min-h-screen p-4 w-full bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl text-gray-500 pb-5 pl-8">Service Details</h2>

        <div className="flex justify-center items-center">
          <dl className="max-w-lg text-gray-900   pl-8 divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-row  pt-4">
              <dt className=" text-gray-500 md:text-lg dark:text-gray-400">
                Service Name :
              </dt>
              <dd className="text-lg ml-10 font-semibold">
                {services?.serviceName}
              </dd>
            </div>
            <div className="flex flex-row  pt-4">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Service Id :
              </dt>
              <dd className="text-lg ml-10 font-semibold">{services?._id}</dd>
            </div>
            <div className="flex flex-row pt-4">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Assigned To :
              </dt>
              <dd className="text-lg ml-10 font-semibold">
                {services?.assignedTo ? services?.assignedTo : "-----"}
              </dd>
            </div>
            <div className="flex flex-row pt-4">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Assigned At :
              </dt>
              <dd className="text-lg ml-10 font-semibold">
                {services?.assignedAt ? Date(services?.assignedAt) : "-----"}
              </dd>
            </div>
          </dl>

          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 400,
              width: "100%",
            }}
          >
            {services?._id && (
              <>
                <ReactToPrint
                  className="cursor-pointer	"
                  trigger={() => (
                    <button className=" m-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Print QR
                    </button>
                  )}
                  content={() => componentRef}
                />
                <QRCode
                  ref={(el: any) => (componentRef = el)}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={services?._id}
                  viewBox={`0 0 256 256`}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-evenly items-center flex-wrap">
          <div className="flex flex-col pt-4">
            <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
              <label className="block text-gray-300 mb-3">Trolley One</label>
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400 pt-3">
                Equipments In Service
              </dt>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                    >
                      Equipment Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Expiry Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Quantity (units)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services?.trolleyOne?.map((e: any, i: Number) => (
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
                      <td className="py-4 px-6">{e.expiryDate}</td>
                      <td className="py-4 px-6">{e.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
              <label className="block text-gray-300 mb-3">Trolley Two</label>
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400 pt-3">
                Equipments In Service
              </dt>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                    >
                      Equipment Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Expiry Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Quantity (units)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services?.trolleyTwo?.map((e: any, i: Number) => (
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
                      <td className="py-4 px-6">{e.expiryDate}</td>
                      <td className="py-4 px-6">{e.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
              <label className="block text-gray-300 mb-3">Trolley Three</label>
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400 pt-3">
                Equipments In Service
              </dt>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                    >
                      Equipment Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Expiry Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Quantity (units)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services?.trolleyThree?.map((e: any, i: Number) => (
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
                      <td className="py-4 px-6">{e.expiryDate}</td>
                      <td className="py-4 px-6">{e.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
              <label className="block text-gray-300 mb-3">Trolley Four</label>
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400 pt-3">
                Equipments In Service
              </dt>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                    >
                      Equipment Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Expiry Date
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Quantity (units)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services?.trolleyFour?.map((e: any, i: Number) => (
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
                      <td className="py-4 px-6">{e.expiryDate}</td>
                      <td className="py-4 px-6">{e.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  if (req?.cookies?.access_token) {
    await queryClient.prefetchQuery(["getService", {}], () =>
      axiosGetService(params?.id)
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
      id: params?.id,
      dehydratedState: dehydrate(queryClient),
      requireAuth: true,
      enableAuth: true,
    },
  };
};

export default ServiceDetailPage;
