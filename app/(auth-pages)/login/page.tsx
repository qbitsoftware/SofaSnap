import { GetUserInfo, signInAction } from "@/app/actions";
import { Auth } from "@/components/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login({ searchParams }: { searchParams: Message }) {
  const user = await GetUserInfo()
  if (user.data.user) {
    redirect("/profiil")
  }


  return (
    <div className="flex justify-center items-center w-full flex-col md:min-h-[80vh] pb-20">
      <Image src={"/images/profile.svg"} width={185} height={185} alt="profile" priority />
      <Auth />
      <div className="relative md:w-[406px]">
        <Separator color="[#FBFBFB]" className="w-full mt-5" />
        <p className="text-[#CFCFCF] text-center font-semibold absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background w-10">VÕI</p>
      </div>
      <form className="flex flex-col min-w-64 md:w-[400px] mx-auto">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
          <div className="relative">
            <Label className="absolute top-[-6px] bg-background left-3 py-[2px] px-[4px] rounded-xl" htmlFor="email">Email</Label>
            <Input className="bg-accent-foreground h-12" name="email" type="email" placeholder="sinu@email.com" required autoComplete="off" />
          </div>
          <div className="relative">
            <Label className="absolute top-[-6px] bg-background left-3 py-[2px] px-[4px] rounded-xl" htmlFor="password">Parool</Label>
            <Input
              className="h-12 bg-[#D9D9D980]"
              type="password"
              name="password"
              placeholder="Sisesta parool"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Link
              className="text-base text-accent-foreground font-normal underline"
              href="/forgot-password"
            >
              Unustasid parooli?
            </Link>
          </div>
          <SubmitButton className="bg-accent hover:bg-[#f07162] w-[256px] h-[48px] md:w-[376px] md:h-[65px] mx-auto mt-10" pendingText="Sisse logimine..." formAction={signInAction}>
            Logi sisse
          </SubmitButton>
          <Link href={"/registreeri"} className="md:w-[376px] md:h-[65px] bg-[#D9D9D9] mx-auto rounded-lg">
            <Button className="w-[256px] h-[48px] md:w-[376px] md:h-[65px] bg-[#D9D9D9] mx-auto">
              Registreeri
            </Button>
          </Link>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
} 
