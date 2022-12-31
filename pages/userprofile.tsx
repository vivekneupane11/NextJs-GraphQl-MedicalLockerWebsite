import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';
import useStore from '../client/store';

import Header from "../client/components/Header";



const UserProfile: NextPage = () => {
  const router = useRouter();
  const store = useStore();
  const user = store.authUser;

  return (
    <div className="dark:bg-gray-800">
      <Header />
<div className='flex justify-center items-center  h-screen '>
<div className=" w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">

        <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px; margin: 0px', transform: 'translate3d(0px, 10px, 0px)'}}>
            <ul className="py-1" aria-labelledby="dropdownButton">
            <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
    <article className="mb-3 w-24 h-24 rounded-full shadow-lg flex justify-center uppercase items-center text-4xl	font-extrabold text-gray-500 	"> {user?.name.charAt(0)}</article>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-300">{user?.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</span>

        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="/editprofile" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Edit Profile</a>
        </div>
    </div>
</div>
</div>

</div>
       

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

export default UserProfile;
