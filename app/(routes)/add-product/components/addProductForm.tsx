// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { TPasswordChangeSchema } from '@/lib/register-validation';
// import { cn } from '@/lib/utils';
// import { zodResolver } from '@hookform/resolvers/zod';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { ClipLoader } from 'react-spinners';
// import { useToast } from '@/components/hooks/use-toast';

// const AddProductForm = () => {
//     const toast = useToast()

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//         reset,
//         getValues,
//         setError,
//     } = useForm<TPasswordChangeSchema>({
//         resolver: zodResolver(),
//     });

//     const onSubmit = async (data: TPasswordChangeSchema) => {
//         const response = await fetch("/api/account", {
//             method: "PUT",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })

//         const responseData = await response.json()

//         if (!response.ok) {
//             toast.toast({
//                 title: "Something went wrong. Try again later!",
//             })
//             return;
//         }
//         if (responseData.error) {
//             toast.toast({
//                 title: responseData.error
//             })
//             return;
//         }

//         if (responseData.errors) {
//             const errors = responseData.errors;
//             if (errors.password) {
//                 setError("password", {
//                     type: "server",
//                     message: errors.password,
//                 })
//             }
//             if (errors.confirm_password) {
//                 setError("confirm_password", {
//                     type: "server",
//                     message: errors.confirm_password,
//                 })
//             }
//             return
//         }

//         if (responseData.success) {
//             toast.toast({
//                 title: "Successfully changed password",
//             })
//         }

//         reset()
//     }

//     return (
//         <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-[46px]">
//                 <div className="mb-[27px]">
//                     <h2 className="font-medium text-lg">Uuenda oma parooli</h2>
//                 </div>
//                 <div className="flex flex-col gap-[11px] leading-4 w-[424px]">
//                     <Input {...register("password")} placeholder="Uus parool" type="password" />
//                     {errors.password && <p className="text-red-500">{errors.password.message}</p>}
//                     <Input {...register("confirm_password")} placeholder="Uus parool uuesti" type="password" />
//                     {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
//                 </div>
//             </div>
//             <div className="flex items-center justify-center">
//                 <Button disabled={isSubmitting} className="bg-accent hover:bg-accent md:w-[202px] md:h-[55px] text-black cursor" type="submit">
//                     <h1 className={cn(isSubmitting ? " hidden " : "block")}>
//                         Vaheta parool
//                     </h1>
//                     <ClipLoader
//                         color={"#ffffff"}
//                         loading={isSubmitting}
//                         size={40}
//                         aria-label="Loading Spinner"
//                         data-testid="loader"
//                     />
//                 </Button>
//             </div>
//         </form>
//     )
// }

// export { AddProductForm }