import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Rocket } from "lucide-react";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
      showToast({ message: "Registered Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 md:px-10" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First name
          <input
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.firstName && "border-red-500"
            }`}
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500 font-semibold">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last name
          <input
            className={`border rounded w-full py-1 px-2 font-normal outline-none ${
              errors.lastName && "border-red-500"
            }`}
            {...register("lastName", {
              required: "This field is required",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500 font-semibold">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className={`border rounded w-full py-1 px-2 font-normal outline-none ${
            errors.confirmPassword && "border-red-500"
          }`}
          {...register("confirmPassword", {
            validate(confirmPassword) {
              if (!confirmPassword) {
                return "This field is required";
              } else if (confirmPassword !== watch("password")) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 font-semibold">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="flex flex-col-reverse md:flex-row gap-2 items-center justify-between">
        <span className="font-semibold text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-700 underline font-semibold ml-1"
          >
            Login
          </Link>
        </span>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 transition text-white font-semibold text-xl px-4 py-3 rounded-[5px]"
        >
          <Rocket />
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
