import Link from 'next/link';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { LogoutUserQuery, useLogoutUserQuery } from '../generated/graphql';
import graphqlRequestClient from '../requests/graphqlRequestClient';
import useStore from '../store';
import Spinner from './Spinner';

const Header = () => {
  const store = useStore();
  const user = store.authUser;

  const queryClient = useQueryClient();
  const { refetch } = useLogoutUserQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      onSuccess(data: LogoutUserQuery) {
        queryClient.clear();
        document.location.href = '/';
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: 'error',
            position: 'top-right',
          });
          queryClient.clear();
          document.location.href = '/';
        });
      },
    }
  );

  const handleLogout = () => {
    refetch();
  };

  return (
    <>
      <header className='bg-gray-50 dark:bg-gray-900 px-10 h-20'>
        <nav className='h-full flex justify-between  items-center'>
          <div className='text-ct-blue-600'>
            <Link href='/' className='text-ct-blue-600 text-2xl font-semibold'>
              Medical Locker
            </Link>
          </div>
          <ul className='flex items-center gap-4 '>
        
            {!user && (
              <>
                <li className='text-ct-blue-600'>
                  <Link href='/register' className='text-ct-blue-600'>
                    SignUp
                  </Link>
                </li>
                <li className='text-ct-blue-600'>
                  <Link href='/login' className='text-ct-blue-600'>
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                  <li className='text-ct-blue-600'>
              <Link href='/caregivers' className='text-ct-blue-600'>
                Caregivers
              </Link>
            </li>
            <li className='text-ct-blue-600'>
              <Link href='/userprofile' className='text-ct-blue-600'>
                Profile
              </Link>
            </li>
          {
            user.role === 'admin' &&       <li className='text-ct-blue-600'>
            <Link href='/services' className='text-ct-blue-600'>
              Services
            </Link>
          </li>
          }
           
{
  user.role === 'superadmin' && 
  <li className='text-ct-blue-600 cursor-pointer'>    
   <Link href='/department' className='text-ct-blue-600'> 
  Departments
  </Link>
  </li>
}
                
                <button
     onClick={handleLogout}
          className="bg-dark m-2 ml-40  flex  hover:bg-light-500 flex justify-center items-center  text-blue-700 max-w-xl font-semibold hover:text-gray-500 py-2 px-4 border border-blue-500 hover:border-gray-500 rounded "
        >
          <BiLogOut size={20} className="pr-1" /> Log Out
        </button>
               
              </>
            )}
          </ul>
        </nav>
      </header>
      {/* <div className='pt-4 pl-2 bg-ct-blue-600 fixed flex justify-center items-center'>
        {store.pageLoading && <Spinner color='text-ct-yellow-600' />}
      </div> */}
    </>
  );
};

export default Header;
