import type { GetServerSideProps, NextPage } from "next";
import { dehydrate } from "react-query";
import Header from "../../client/components/Header";

import {
  GetMeDocument,

  useGetServiceQuery,
  GetServiceQuery,
  useUpdateTrolleyMutation,
  UpdateTrolleyMutation,
  ServiceUpdateTrolleyInput,
} from "../../client/generated/graphql";
import { axiosGetMe } from "../../client/requests/axiosClient";
import graphqlRequestClient, {
  queryClient,
} from "../../client/requests/graphqlRequestClient";
import useStore from "../../client/store";
import { AiOutlinePlusCircle } from "react-icons/ai";
import  { useRouter } from "next/router";
import { LoadingButton } from "../../client/components/LoadingButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../client/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { array, boolean, object, string, TypeOf } from "zod";

type EditServiceProps = {};
const serviceSchema = object({
  serviceName: string().min(1, "Service name is required"),
  assignedTo: string().optional(),
  image: string().optional(),
  dailyTap: array(boolean()).optional(),
  monthlyTap: array(boolean()).optional(),
  monthlyTapDoneAt: array(string()).optional(),

  dailyTapDoneAt: array(string()).optional(),
  assignedAt: string().optional(),
  admin: string().optional(),
  trolleyOne: array(
    object({
      name: string(),
      expiryDate: string(),
      qty: string(),
    })
  ).optional(),
  trolleyTwo: array(
    object({
      name: string(),
      expiryDate: string(),
      qty: string(),
    })
  ).optional(),
  trolleyThree: array(
    object({
      name: string(),
      expiryDate: string(),
      qty: string(),
    })
  ).optional(),
  trolleyFour: array(
    object({
      name: string(),
      expiryDate: string(),
      qty: string(),
    })
  ).optional(),

});

export type ServiceInput = TypeOf<typeof serviceSchema>;
const EditService: NextPage<EditServiceProps> = ({id}:any) => {
  const [equipmentCountForTroleyOne, setEquipmentCountForTrolleyOne] =
    useState(1);
  const [equipmentCountForTroleyTwo, setEquipmentCountForTrolleyTwo] =
    useState(1);

  const [equipmentCountForTroleyThree, setEquipmentCountForTrolleyThree] =
    useState(1);

  const [equipmentCountForTroleyFour, setEquipmentCountForTrolleyFour] =
    useState(1);

  const [equipmentsforTrolleyOne, setEquipmentsforTrolleyOne] = useState([
    {
      name: "",
      expiryDate: "",
      qty: "",
    },
  ]);
  const [equipmentsforTrolleyTwo, setEquipmentsforTrolleyTwo] = useState([
    {
      name: "",
      expiryDate: "",
      qty: "",
    },
  ]);

  const [equipmentsforTrolleyThree, setEquipmentsforTrolleyThree] = useState([
    {
      name: "",
      expiryDate: "",
      qty: "",
    },
  ]);

  const [equipmentsforTrolleyFour, setEquipmentsforTrolleyFour] = useState([
    {
      name: "",
      expiryDate: "",
      qty: "",
    },
  ]);

  const store = useStore();
  const router = useRouter();
  const user = store.authUser;



  const getServiceById = useGetServiceQuery<GetServiceQuery, Error>(
    graphqlRequestClient,
    {getServiceId:id},
    {
      retry: 1,
      onSuccess:(data)=>{
        setEquipmentCountForTrolleyOne(data?.getService?.service?.trolleyOne?.length)
        setEquipmentCountForTrolleyTwo(data?.getService?.service?.trolleyTwo?.length)

        setEquipmentCountForTrolleyThree(data?.getService?.service?.trolleyThree?.length)

        setEquipmentCountForTrolleyFour(data?.getService?.service?.trolleyFour?.length)
        setEquipmentsforTrolleyFour(data?.getService?.service?.trolleyFour)
        setEquipmentsforTrolleyOne(data?.getService?.service?.trolleyOne)
        setEquipmentsforTrolleyThree(data?.getService?.service?.trolleyThree)
        setEquipmentsforTrolleyTwo(data?.getService?.service?.trolleyTwo)

      }
   
    }
  );
  

  const { mutate: updateTrolley, isLoading } = useUpdateTrolleyMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: UpdateTrolleyMutation) {
        toast(`Successfully created service!`, {
          type: "success",
          position: "top-right",
        });
        console.log(data);
        router.push("/services");
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

  const methods = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
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

  //Saving values to specific trolley
  const handleEquipment = (
    e: any,
    i: number,
    type: string,
    trolley: string
  ) => {
    console.log(i, e.target.value);

    const newArray: any =
      trolley === "trolley1"
        ? [...equipmentsforTrolleyOne]
        : trolley === "trolley2"
        ? [...equipmentsforTrolleyTwo]
        : trolley === "trolley3"
        ? [...equipmentsforTrolleyThree]
        : trolley === "trolley4"
        ? [...equipmentsforTrolleyFour]
        : [];
    if (type === "name") {
      newArray[i] = {
        name: e.target.value,
        expiryDate: newArray[i]?.expiryDate,
        qty: newArray[i]?.qty,
      };
    } else if (type == "qty") {
      newArray[i] = {
        name: newArray[i]?.name ? newArray[i]?.name : "",
        expiryDate: newArray[i]?.expiryDate ? newArray[i]?.expiryDate : "",

        qty: e.target.value,
      };
    }
   
    else if (type === "date") {
      newArray[i] = {
        name: newArray[i]?.name ? newArray[i]?.name : "",
        expiryDate: e.target.value,
        qty: newArray[i]?.qty ? newArray[i]?.qty : "",
      };
    }

    console.log(newArray, "i am here");
if(trolley==="trolley1"){
  setEquipmentsforTrolleyOne([...newArray]);
}else if(trolley==='trolley2'){
  setEquipmentsforTrolleyTwo([...newArray])
}
else if(trolley==='trolley3'){
  setEquipmentsforTrolleyThree([...newArray])
}
else if(trolley==='trolley4'){
  setEquipmentsforTrolleyFour([...newArray])
}
    };
  const onSubmitHandler: SubmitHandler<ServiceUpdateTrolleyInput> = async (values) => {
    updateTrolley({
      input: await Object.create({
        _id:id,
        serviceName: values.serviceName,
        admin: user?.email,
        image:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        assignedAt: Date.now().toString(),
        trolleyOne: [...equipmentsforTrolleyOne],
        trolleyTwo: [...equipmentsforTrolleyTwo],
        trolleyThree: [...equipmentsforTrolleyThree],
        trolleyFour: [...equipmentsforTrolleyFour],
      }),
    });
  };
  return (
    <div className="dark:bg-gray-800">
      <Header />

      <section className="bg-gray-50 dark:bg-gray-900  ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto   lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  lg:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Service 
              </h1>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5"
                >
                  <FormInput label="Service Name" name="serviceName" value={getServiceById?.data?.getService?.service?.serviceName} />
                  <label className="block text-gray-300 mb-3">
                    Add Equipments
                  </label>
                  <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
                    <label className="block text-gray-300 mb-3">
                      Trolley One
                    </label>
                    {Array.from(Array(equipmentCountForTroleyOne).keys()).map(
                      (e: number, i: number) => (
                        <div
                          key={e.toString()}
                          className="flex justify-between items-start"
                        >
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentname"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Name
                            </label>
                            <input
                              type="text"
                              name="equipmentname"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyOne[i].name}
                              placeholder="Service Name "
                              onChange={(e) =>
                                handleEquipment(e, i, "name", "trolley1")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentqty"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Qty.
                            </label>
                            <input
                              type="number"
                              name="equipmentqty"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyOne[i].qty}

                              placeholder="Qty in units"
                              onChange={(e) =>
                                handleEquipment(e, i, "qty", "trolley1")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>{" "}
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentdate"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Expiry Date{" "}
                            </label>
                            <input
                              type="date"
                              name="equipmentdate"
                              placeholder="Expiry Date "
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyOne[i].expiryDate}

                              onChange={(e) =>
                                handleEquipment(e, i, "date", "trolley1")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex">
                      <span
                        onClick={(e) =>
                          setEquipmentCountForTrolleyOne((init) => init + 1)
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" /> Add
                        More
                      </span>
                      <span
                        onClick={() =>
                          setEquipmentCountForTrolleyOne((init) =>
                            init <= 1 ? init : init - 1
                          )
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" />{" "}
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
                    <label className="block text-gray-300 mb-3">
                      Trolley Two
                    </label>
                    {Array.from(Array(equipmentCountForTroleyTwo).keys()).map(
                      (e: number, i: number) => (
                        <div
                          key={e.toString()}
                          className="flex justify-between items-start"
                        >
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentname"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Name
                            </label>
                            <input
                              type="text"
                              name="equipmentname"
                              placeholder="Service Name "
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyTwo[i].name}

                              onChange={(e) =>
                                handleEquipment(e, i, "name", "trolley2")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentqty"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Qty.
                            </label>
                            <input
                              type="number"
                              name="equipmentqty"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyTwo[i].qty}

                              placeholder="Qty in units"
                              onChange={(e) =>
                                handleEquipment(e, i, "qty", "trolley2")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>{" "}
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentdate"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Expiry Date{" "}
                            </label>
                            <input
                              type="date"
                              name="equipmentdate"
                              placeholder="Expiry Date "
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyTwo[i].expiryDate}

                              onChange={(e) =>
                                handleEquipment(e, i, "date", "trolley2")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex">
                      <span
                        onClick={(e) =>
                          setEquipmentCountForTrolleyTwo((init) => init + 1)
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" /> Add
                        More
                      </span>
                      <span
                        onClick={() =>
                          setEquipmentCountForTrolleyTwo((init) =>
                            init <= 1 ? init : init - 1
                          )
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" />{" "}
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
                    <label className="block text-gray-300 mb-3">
                      Trolley Three
                    </label>
                    {Array.from(Array(equipmentCountForTroleyThree).keys()).map(
                      (e: number, i: number) => (
                        <div
                          key={e.toString()}
                          className="flex justify-between items-start"
                        >
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentname"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Name
                            </label>
                            <input
                              type="text"
                              name="equipmentname"
                              placeholder="Service Name "
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyThree[i].name}

                              onChange={(e) =>
                                handleEquipment(e, i, "name", "trolley3")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentqty"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Qty.
                            </label>
                            <input
                              type="number"
                              name="equipmentqty"
                              placeholder="Qty in units"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyThree[i].qty}

                              onChange={(e) =>
                                handleEquipment(e, i, "qty", "trolley3")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>{" "}
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentdate"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Expiry Date{" "}
                            </label>
                            <input
                              type="date"
                              name="equipmentdate"
                              placeholder="Expiry Date "
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyThree[i].expiryDate}

                              onChange={(e) =>
                                handleEquipment(e, i, "date", "trolley3")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex">
                      <span
                        onClick={(e) =>
                          setEquipmentCountForTrolleyThree((init) => init + 1)
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" /> Add
                        More
                      </span>
                      <span
                        onClick={() =>
                          setEquipmentCountForTrolleyThree((init) =>
                            init <= 1 ? init : init - 1
                          )
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" />{" "}
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className="max-w-6xl w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8  space-y-5">
                    <label className="block text-gray-300 mb-3">
                      Trolley Four
                    </label>
                    {Array.from(Array(equipmentCountForTroleyFour).keys()).map(
                      (e: number, i: number) => (
                        <div
                          key={e.toString()}
                          className="flex justify-between items-start"
                        >
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentname"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Name
                            </label>
                            <input
                              type="text"
                              name="equipmentname"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyFour[i].name}

                              placeholder="Service Name "
                              onChange={(e) =>
                                handleEquipment(e, i, "name", "trolley4")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentqty"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Equipment Qty.
                            </label>
                            <input
                              type="number"
                              name="equipmentqty"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyFour[i].qty}

                              placeholder="Qty in units"
                              onChange={(e) =>
                                handleEquipment(e, i, "qty", "trolley4")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>{" "}
                          <div className="mr-10" style={{ width: "100%" }}>
                            <label
                              htmlFor={"equipmentdate"}
                              className="block text-ct-blue-600 mb-3"
                            >
                              Expiry Date{" "}
                            </label>
                            <input
                              type="date"
                              name="equipmentdate"
                              defaultValue={getServiceById?.data?.getService?.service?.trolleyFour[i].expiryDate}

                              placeholder="Expiry Date "
                              onChange={(e) =>
                                handleEquipment(e, i, "date", "trolley4")
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex">
                      <span
                        onClick={(e) =>
                          setEquipmentCountForTrolleyFour((init) => init + 1)
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" /> Add
                        More
                      </span>
                      <span
                        onClick={() =>
                          setEquipmentCountForTrolleyFour((init) =>
                            init <= 1 ? init : init - 1
                          )
                        }
                        className=" cursor-pointer bg-dark m-2 ml-2  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-md font-light hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-white rounded "
                      >
                        <AiOutlinePlusCircle size={20} className="pr-1" />{" "}
                        Remove
                      </span>
                    </div>
                  </div>

                  {/* <FormInput label="Email" name="email" type="email" /> */}
                  <div className="pb-20">
                    <LoadingButton
                      loading={isLoading}
                      textColor="text-ct-white-600 "
                    >
                    Edit Service
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

export default EditService;
