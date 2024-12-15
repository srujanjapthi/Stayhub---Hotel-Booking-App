import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Key } from "lucide-react";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed in successfully!", type: "SUCCESS" });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: SignInFormData) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {/* <div className="max-w-[550px] flex flex-col gap-5 py-6 px-8 bg-slate-200 rounded-xl"> */}
      <h2 className="text-3xl mb-4 font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className={`border rounded w-full py-1 px-2 font-normal outline-none ${
            errors.email && "border-red-500"
          }`}
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <span className="text-red-500 font-semibold">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className={`border rounded w-full py-1 px-2 font-normal outline-none ${
            errors.password && "border-red-500"
          }`}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 font-semibold">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex flex-col-reverse md:flex-row gap-2 items-center justify-between">
        <span className="font-semibold text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 underline font-semibold ml-1"
          >
            Register
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-700 flex items-center gap-2 text-white font-semibold text-xl px-7 py-3 rounded-[5px] hover:bg-blue-800 hover:shadow-lg transition-all"
        >
          <Key />
          Login
        </button>
      </span>
      {/* </div> */}
    </form>
  );
};

export default SignIn;
