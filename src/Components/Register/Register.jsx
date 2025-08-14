import React from "react";
import { useForm } from "react-hook-form";
import * as Zod from "zod";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className='py-5'>
      <h1 className='text-2xl text-center text-blue-900 font-bold dark:text-blue-300'>
        Registeration Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col space-x-2 w-full lg:w-3xl  mx-auto py-5 shadow-2xl/20 my-10 px-5 shadow-blue-100'
      >
        {/* user name */}
        <div className='format-control-input mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            className='w-full rounded-md outline-none border border-blue-400 focus:ring-blue-950 dark:focus:ring-blue-200 focus:ring py-1 px-2'
            name='name'
            placeholder='enter your name'
            {...register("name", {
              required: "name is required",

              minLength: {
                value: 3,
                message: "minimum length is 3 character",
              },

              maxLength: {
                value: 15,
                message: "max length is 15 character",
              },
            })}
          />

          {errors.name && touchedFields.name && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.name?.message}
            </p>
          )}
        </div>

        {/* user email */}
        <div className='format-control-input mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            className='w-full rounded-md outline-none border border-blue-400 focus:ring-blue-950 dark:focus:ring-blue-200 focus:ring py-1 px-2'
            name='email'
            placeholder='enter your email'
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "invalid email",
              },
            })}
          />
          {errors.email && touchedFields.email && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* user password */}
        <div className='format-control-input mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='w-full rounded-md outline-none border border-blue-400 focus:ring-blue-950 dark:focus:ring-blue-200 focus:ring py-1 px-2'
            name='password'
            placeholder='enter your password'
            {...register("password", {
              required: "passowrd is reuired",

              pattern: {
                value: /^[A-Z][a-z1-9]{8}$/,
                message: "invalid password",
              },
            })}
          />
          {errors.password && touchedFields.password && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.password?.message}
            </p>
          )}
        </div>

        {/* user confirm password */}
        <div className='format-control-input mb-4'>
          <label htmlFor='rePassword'>Confirmation Password</label>
          <input
            type='password'
            id='rePassword'
            className='w-full rounded-md outline-none border border-blue-400 focus:ring-blue-950 dark:focus:ring-blue-200 focus:ring py-1 px-2'
            name='rePassword'
            placeholder='confirmation your password'
            {...register("rePassword", {
              required: "confirmation password is required",
              validate: (val) => {
                console.log(val);
                if (val === watch("password")) return true;
                else return "password and repassword dosen't matched";
              },
            })}
          />
          {errors.rePassword && touchedFields.rePassword && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.rePassword.message}
            </p>
          )}
        </div>

        {/* user selection date */}
        <div className='format-control-input mb-4'>
          <label htmlFor='dateOfBirth'>Date Of Birth</label>
          <input
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            className='w-full py-1 px-2 border border-blue-300 outline-none focus:ring focus:ring-blue-800 rounded-md'
            {...register("dateOfBirth", {
              required: "date is required",
              validate: (val) => {
                console.log(val);
                const objDate = new Date(val).getFullYear();
                if (2025 - objDate > 16) return true;
                else return "very short";
              },
            })}
          />
          {errors.dateOfBirth && touchedFields.dateOfBirth && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* user selection gender */}
        <div className='format-control-input mb-4'>
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            id='male'
            name='gender'
            value={"male"}
            className='appearance-none w-3 h-3 border-2 mx-4 border-blue-300 rounded-full checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
            {...register("gender", {
              required: "gnder is required",
              pattern: {
                value: /^(male|female)$/,
                message: "invalid gender",
              },
            })}
          />
          <label htmlFor='female'>Female</label>
          <input
            type='radio'
            id='female'
            name='gender'
            value={"female"}
            className='appearance-none w-3 h-3 border-2 mx-4 border-blue-300 rounded-full checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
            {...register("gender", {
              required: "gnder is required",
              pattern: {
                value: /^(male|female)$/,
                message: "invalid gender",
              },
            })}
          />
          {errors.gender && touchedFields.gender && (
            <p className='mt-1 text-red-500 capitalize text-sm px-2 text-center'>
              {errors.gender?.message}
            </p>
          )}
        </div>

        {/* submit button */}
        <button className='px-6 py-2 bg-blue-300 text-white w-fit rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-800'>
          Register
        </button>
      </form>
    </section>
  );
}

export default Register;
