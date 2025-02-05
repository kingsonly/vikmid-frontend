'use client';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { saveDetails } from '@/store/users-basic-details/usersDetailsSlice';
import { useApiCall } from '@/utils/useApiCall';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

interface LoginFormInputs {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { apiCall } = useApiCall();


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await apiCall({
        endpoint: "/auth/login",
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
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription className="text-indigo-200">
            Log in to your VIKMID account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-white">
          <form onSubmit={handleSubmit(handleLogin)}>
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
                Log In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-300 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
