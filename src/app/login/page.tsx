import Link from "next/link";
import { SubmitButton } from "@/cmps/submit-button";
import { signIn } from "@/lib/auth";
import { Form } from "@/cmps/Form";

export default function Login() {
  return (
    <div className="flex items-center justify-center bg-theme-light dark:bg-darkmode-theme-light">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border  shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm">Use your email and password to sign in</p>
        </div>
        <Form
          action={async (formData: FormData) => {
            "use server";
            await signIn("credentials", {
              redirectTo: "/admin",
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            });
          }}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sms">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold">
              Sign up
            </Link>
            {" for free."}
          </p>
        </Form>
      </div>
    </div>
  );
}
