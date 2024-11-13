"use client"
import { changePasswordAction } from "@/app/actions";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordChangeValidator, TPasswordChangeSchema } from "@/lib/register-validation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";


const ChangePassword = () => {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TPasswordChangeSchema>({
        resolver: zodResolver(passwordChangeValidator),
    });

    const onSubmit = async (data: TPasswordChangeSchema) => {
        const { error } = await changePasswordAction(data)
        if (error) {
            if (typeof error == 'string') {
                toast.toast({
                    title: "Midagi laks valesti!",
                    description: error,
                })
            } else {
                toast.toast({
                    title: "Midagi laks valesti!",
                    description: "Proovige hiljem uuesti!",
                })
            }
            reset()
            return
        }

        toast.toast({
            title: "Parool on edukalt vahetatud!"
        })
        reset()
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[46px]">
                <div className="mb-[27px]">
                    <h2 className="font-medium text-lg">Uuenda oma parooli</h2>
                </div>
                <div className="flex flex-col gap-[11px] leading-4">
                    <Input {...register("password")} placeholder="Uus parool" type="password" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <Input {...register("confirm_password")} placeholder="Uus parool uuesti" type="password" />
                    {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Button disabled={isSubmitting} className="bg-accent hover:bg-accent w-[150px] lg:w-[200px] rounded-full md:h-[45px] text-black cursor" type="submit">
                    <h1 className={cn(isSubmitting ? " hidden " : "block")}>
                        Vaheta parool
                    </h1>
                    <ClipLoader
                        color={"#ffffff"}
                        loading={isSubmitting}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Button>
            </div>
        </form>
    )
}

export { ChangePassword }