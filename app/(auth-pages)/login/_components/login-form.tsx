"use client"

import { signInAction } from "@/app/actions";
import { Auth } from "@/components/auth";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n/i18n-provider";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginForm() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    if (searchParams.get("error") != "") {
      setErrorMsg("Kasutajanimi või parool on vale");
    }
  }, [searchParams])
  console.log("erormsg", errorMsg);

  return (
    <div className="flex justify-center items-center w-full flex-col md:min-h-[80vh] pb-20">
      <Image src={"/images/profile.svg"} width={185} height={185} alt={t('auth.login.profileImageAlt')} priority />
      <Auth />
      <div className="relative md:w-[406px]">
        <Separator color="[#FBFBFB]" className="w-full mt-5" />
        <p className="text-[#CFCFCF] text-center font-semibold absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background w-10">{t('auth.login.or')}</p>
      </div>
      <form className="flex flex-col min-w-64 md:w-[400px] mx-auto">
        <div className="flex flex-col gap-4 [&>input]:mb-3 mt-8">
          <div className="relative">
            <Label className="absolute top-[-6px] bg-background left-3 py-[2px] px-[4px] rounded-xl" htmlFor="email">{t('auth.login.email')}</Label>
            <Input className="bg-accent-foreground h-12" name="email" type="email" placeholder={t('auth.login.emailPlaceholder')} required autoComplete="off" />
          </div>
          <div className="relative">
            <Label className="absolute top-[-6px] bg-background left-3 py-[2px] px-[4px] rounded-xl" htmlFor="password">{t('auth.login.password')}</Label>
            <Input
              className="h-12 bg-[#D9D9D980]"
              type="password"
              name="password"
              placeholder={t('auth.login.passwordPlaceholder')}
              required
            />

            <FormMessage message={{ error: errorMsg }} />
          </div>
          <div className="flex flex-col justify-between items-center">
            <Link
              className="text-base text-accent-foreground font-normal underline"
              href="/forgot-password"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
          <SubmitButton className="bg-accent hover:bg-[#f07162] w-[256px] h-[48px] md:w-[376px] md:h-[65px] mx-auto mt-10" pendingText={t('auth.login.loginPending')} formAction={signInAction}>
            {t('auth.login.loginButton')}
          </SubmitButton>
          <Link href={"/registreeri"} className="md:w-[376px] md:h-[65px] bg-[#D9D9D9] mx-auto rounded-lg">
            <Button className="w-[256px] h-[48px] md:w-[376px] md:h-[65px] bg-[#D9D9D9] mx-auto">
              {t('auth.login.registerButton')}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
