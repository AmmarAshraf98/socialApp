import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

function Login() {
  // schema
  const schema = z.object({
    email: z.string().email("invalid email"),
    password: z
      .string()
      .min(3, "too short")
      .max(12, "too larg")
      .regex(/^[A-Z][a-z1-9]{8}$/, "use strong password"),
  });

  // hook form
  const {
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  return (
    <section>
      <h1>Login Form</h1>
      <form>
        <div className='from-control'>
          <label htmlFor='email'></label>
          <input
            type='email'
            id='email'
            placeholder='email'
            className='input input-info'
            {...register("email")}
          />
        </div>

        {errors.email && touchedFields.email && (
          <p className='text-red-500 text-center py-1 px-4'>
            {errors.email.message}
          </p>
        )}

        <div className='from-control'>
          <label htmlFor='password'></label>
          <input
            type='password'
            id='password'
            placeholder='password'
            className='input input-info'
            {...register("password")}
          />
          {errors.password && touchedFields.password && (
            <p className='text-red-500 py-1 px-4 text-center'>
              {errors.password.message}
            </p>
          )}
        </div>

        <button className='btn btn-info'>Login</button>
      </form>
    </section>
  );
}

export default Login;
