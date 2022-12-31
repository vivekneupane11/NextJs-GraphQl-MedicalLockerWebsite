import type { GetServerSideProps, NextPage } from 'next';
import { object, string, TypeOf } from 'zod';
import { useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../client/components/FormInput';
import { LoadingButton } from '../client/components/LoadingButton';
import Link from 'next/link';
import {
  LoginUserMutation,
  useGetMeQuery,
  useLoginUserMutation,
} from '../client/generated/graphql';
import graphqlRequestClient from '../client/requests/graphqlRequestClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useStore from '../client/store';
import { IUser } from '../client/lib/types';

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const store = useStore();

  const query = useGetMeQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      onSuccess: (data) => {
        store.setAuthUser(data.getMe.user as IUser);
      },
    }
  );

  const { isLoading, mutate: loginUser } = useLoginUserMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: LoginUserMutation) {
        toast('Logged in successfully', {
          type: 'success',
          position: 'top-right',
        });
        query.refetch();
        router.push('/services');
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: 'error',
            position: 'top-right',
          });
        });
      },
    }
  );

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
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

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // 👇 Executing the loginUser Mutation
    console.log(values,"logger")
    loginUser({ input: values });
  };
  return (
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-white-100 rounded-2xl p-8 space-y-5'
          >
            <FormInput  label='Email' name='email' type='email' />
            <FormInput label='Password' name='password' type='password' />

            <div className='text-right text-ct-blue-600'>
              <Link href='#' className=''>
                Forgot Password?
              </Link>
            </div>
            <LoadingButton loading={isLoading}  textColor=' text-ct-white-600'>
              Login
            </LoadingButton>
            <span className='block text-gray-600'>
              Need an account?{' '}
              <Link href='/register'>
                <a className='text-ct-blue-600'>Sign Up Here</a>
              </Link>
            </span>
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

export default LoginPage;
