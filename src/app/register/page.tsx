import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/cmps/submit-button";
import { Form } from "@/cmps/Form";
import { userApiService } from "@/services/client-api/userApi";

export default function Login() {
  async function register(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const user = await userApiService.getUser(email);

    if (user) {
      return "User already exists"; // TODO: Handle errors with useFormStatus
    } else {
      await userApiService.createUser({ email, password, username });
      redirect("/login");
    }
  }

  return (
    <div className="pb-12 px-4 max-w-screen-lg mx-auto  min-h-[calc(100vh-70px)] justify-center items-center flex flex-col pt-5">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border  shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm ">
            Create an account with your email and password
          </p>
        </div>
        <Form action={register}>
          <SubmitButton className="">Sign Up</SubmitButton>
          <p className="text-center text-sm">
            {"Already have an account? "}
            <Link href="/login" className="font-semibold ">
              היכנס
            </Link>
            {" instead."}
          </p>
        </Form>
      </div>
    </div>
  );
}
