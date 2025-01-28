'use client'; // Ensure this is a client component

import { useDispatch } from 'react-redux';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { increment } from '@/store/slices/counterSlice';
import { saveDetails } from '@/store/users-basic-details/usersDetailsSlice';
import { useApiCall } from '@/utils/useApiCall';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SignupFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  hubName: string;
  url: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  hubName: yup.string().required('Hub Title is required'),
  url: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Hub URL can only contain letters and numbers')
    .required('Hub URL is required')
    .test('is-unique', 'This URL is already taken', async (value) => {
      // Replace with your actual API call logic
      return true
    }),
});


export default function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { apiCall } = useApiCall();


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [hubName, setHubName] = useState<string>('');
  const [plan, setPlan] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
  });
  const handleSignup: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      data["plan"] = plan;

      const response = await apiCall({
        endpoint: "/auth/signup",
        method: "post",
        data: data,
        "showToast": false,
      }
      );

      const userData = response.data;
      Cookies.set("userData", JSON.stringify(userData), {
        expires: 7,
      });
      const { token, ...responseData } = userData;
      dispatch(saveDetails(responseData))
      router.push("/dashboard")

    } catch (error: any) {
      console.log(error);
    }




  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Create your account</CardTitle>
          <CardDescription className="text-indigo-200">
            Start your creator journey with VIKMID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400"
              />
              <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400"
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Hub Tiltle</Label>
              <Input
                id="hubName"
                {...register('hubName')}
                placeholder="eg Mr Funny"
                className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400"
              />
              <p className="text-red-500 text-sm">{errors.hubName?.message}</p>
            </div>
            <div className="space-y-2  ">
              <div className="flex">
                <div className="w-[80%]">
                  <Label htmlFor="name">Hub Url</Label>
                  <Input id="url"
                    {...register('url')}
                    placeholder="eg mrfunny"
                    className="bg-white/5 border-indigo-500/50 text-white placeholder-gray-400"
                  />
                </div>
                <div className="w-[20%] flex items-end ">
                  <div>
                    .vikmid.com
                  </div>

                </div>
              </div>

              <p className="text-red-500 text-sm">{errors.url?.message}</p>

            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register('password')}
                type="password"
                className="bg-white/5 border-indigo-500/50 text-white"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>

            </div>

            <div className="space-y-2 mt-4">
              <Button type='submit' className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white hover:from-indigo-600 hover:to-purple-800 transition-all duration-300">
                Sign Up
              </Button>
            </div>

          </form>

        </CardContent>
        <CardFooter className="flex flex-col space-y-4">

          <p className="text-sm text-gray-300 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
