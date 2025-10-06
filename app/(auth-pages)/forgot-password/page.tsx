import { ForgotPasswordForm } from "./_components/forgot-password-form";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: any;
}) {
  return <ForgotPasswordForm searchParams={searchParams} />;
}
