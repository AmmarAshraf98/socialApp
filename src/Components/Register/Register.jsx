import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as Zod from "zod";

function Register() {
  // validation Schema
  const schema = Zod.object({
    name: Zod.string().min(3, "too short"),
    email: Zod.string().email("invalid email"),
    password: Zod.string().regex(/^[A-Z][a-z1-9]{8}$/, "invalid password"),
    rePassword: Zod.string(),
    dateOfBirth: Zod.coerce.date("invalid date").refine((val) => {
      const currentYear = new Date().getFullYear();
      const selectionDate = val.getFullYear();
      if (currentYear - selectionDate < 18) return false;
      return true;
    }, "too small"),
    gender: Zod.enum(["male", "female"]),
  }).refine((object) => object.password === object.rePassword, {
    message: "didn't match",
    path: ["rePassword"],
  });

  const {
    register,
    handleSubmit,
    trigger,
    // watch,
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
    resolver: zodResolver(schema),
  });

  console.log(errors);

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
            {...register("name")}
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
            {...register("email")}
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
            {...register("password")}
            onBlur={(e) => {
              // Keep normal RHF blur behavior
              register("rePassword").onBlur(e);
              // Also revalidate the password match when rePassword is blurred
              trigger(["password", "rePassword"]);
            }}
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
            {...register("rePassword")}
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
            {...register("dateOfBirth")}
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
            {...register("gender")}
          />
          <label htmlFor='female'>Female</label>
          <input
            type='radio'
            id='female'
            name='gender'
            value={"female"}
            className='appearance-none w-3 h-3 border-2 mx-4 border-blue-300 rounded-full checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600'
            {...register("gender")}
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
