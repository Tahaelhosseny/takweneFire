import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useState } from "react";

import BlankLayout from "@components/layouts/BlankLayout";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { BsGoogle } from "react-icons/bs";
import Button from "@components/Button";
import Link from "@components/Link";
import logger from "@config/logger";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    logger.info({ redirect: { destination: "/" } });
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
}

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      console.error("aaaa");

      setError(result.error);
    }else{
      router.push("http://localhost:3000");

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-8 min-w-max">
        <img
          src="http://localhost:3000/logos/tak_logo_black.png"
          alt="BioDrop Home"
          width={360}
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-medium flex flex-col">
          <span>Connect to YOUR audience</span>
          <span className="text-tertiary-medium">with a single link</span>
        </h2>

       
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button type="submit" primary={true}>
            Sign in with Email
          </Button>
        </form>
        <h>or</h>
        <Button primary={true} key="google" onClick={() => signIn("google")}>
          <span className="mr-2">
            <BsGoogle className="text-2xl" />
          </span>
          Continue with Google
        </Button>


        <p className="mt-10 text-center text-sm text-primary-low-medium">
          Don&lsquo;t have a Google account? Create one on{" "}
          <Link
            href="https://accounts.google.com/v3/signin/identifier?continue=http%3A%2F%2Fsupport.google.com%2Faccounts%2Fanswer%2F27441%3Fhl%3Den&ec=GAZAdQ&hl=en&ifkv=ARZ0qKKfREjGl08TEGlMMgJtA7uIezUv_H3ZyHy-9xwsQLeGYIkHu5UrBPzWN0KSLfDSbxaQXhfqHw&passive=true&sjid=13958094034036690395-EU&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1224809929%3A1713576377736446&theme=mn&ddm=0"
            target="_blank"
          >
            Google
          </Link>
        </p>
      </div>
    </div>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <BlankLayout>{page}</BlankLayout>;
};
