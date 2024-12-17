import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Parooli lähtestamine</h1>
          <p className="mt-2 text-sm text-gray-600">
            Kasutaja juba olemas?{" "}
            <Link className="font-medium text-accent hover:text-[#f07162]" href="/login">
              Logi sisse
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={forgotPasswordAction}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="sinu@email.com"
              />
            </div>
          </div>

          <div>
            <SubmitButton
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-[#f07162] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#f07162]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
              </span>
              Lähtesta parool
            </SubmitButton>
          </div>
        </form>
        <FormMessage message={searchParams} />
      </div>
    </div>
  );
}
