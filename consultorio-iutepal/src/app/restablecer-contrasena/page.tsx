'use client';

import PasswordRequirements from "@/src/components/password-requirements";
import { ErrorModal } from "@/src/components/send-error-modal";
import { SuccessModal } from "@/src/components/send-success-modal";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/src/components/ui/input-otp";
import { supabase } from "@/src/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const formSchema = z
        .object({
            code: z.string().min(6, { message: 'El código debe tener al menos 6 caracteres' }),
            newPassword: z
                .string()
                .min(8, { message: 'Al menos 8 caracteres' })
                .regex(/[A-Z]/, { message: 'Al menos una mayúscula' })
                .regex(/\d/, { message: 'Al menos un número' })
                .regex(/[!@#$%^&*(),.?":{}|<>-]/, { message: 'Al menos un carácter especial #?!@$%^&*()-' })
                .regex(/[!@#$%^&*(),.?":{}|<>-]/, { message: 'Al menos un símbolo' }),
            confirmPassword: z
                .string()
                .min(8, { message: 'Al menos 8 caracteres' })
                .regex(/[A-Z]/, { message: 'Al menos una mayúscula' })
                .regex(/\d/, { message: 'Al menos un número' })
                .regex(/[!@#$%^&*(),.?":{}|<>-]/, { message: 'Al menos un carácter especial #?!@$%^&*()-' })
                .regex(/[!@#$%^&*(),.?":{}|<>-]/, { message: 'Al menos un símbolo' }),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: 'Las contraseñas no coinciden',
            path: ['confirmPassword'],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
            code: '',
        },
    });

    useEffect(() => {
        const recoveryEmail = localStorage.getItem('recoveryEmail');
        if (recoveryEmail) {
            console.log('Correo de recuperación:', recoveryEmail);
        }
    }, []);

    const resentCode = async (values: { email: string; }) => {
        setIsloading(true);
        const { email } = values;

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        setIsloading(false);

        if (error) {
            console.error('Error recovery in:', error.message);
            setIsError(true);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsloading(true);

        const { newPassword: password } = values;

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setIsloading(false);

        if (error) {
            console.error('Error logging in:', error.message);
            setIsError(true);
        } else {
            setIsSuccess(true);
        }
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center p-8">
            <ErrorModal
                messageBody={
                    'Tu solicitud no pudo enviarse correctamente, revisa los cambios obligatorios antes de enviar tu solicitud'
                }
                title="Error al enviar la solicitud"
                isError={isError}
                setIsError={setIsError}
            />
            <SuccessModal
                title="Solicitud enviada con éxito"
                messageBody="Tu solicitud ha sido enviada correctamente, ¡Gracias por su colaboración!"
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                href="/"
            />

            <div className="">
                <div className="mb-5">
                    <h2 className="mb-5 text-2xl text-brand-blue">
                        Recuperación de contraseña
                    </h2>
                </div>

                <div className="mb-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                            <h2 className="text-left text-gray-light mb-3">
                                Para tener mayor seguridad en tu cuenta, asegúrate que tu contraseña contenga estos elementos:
                            </h2>
                            <PasswordRequirements password={form.getValues('newPassword')} />


                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="mt-2">
                                        <FormControl>
                                            <div className="relative flex w-full  items-center space-x-2">
                                                <div className="grid w-full items-center">
                                                    <Input
                                                        id="newPassword"
                                                        placeholder="Nueva contraseña"
                                                        type={!showPassword ? 'password' : 'text'}
                                                        className="block w-full rounded-md border-0   py-1.5 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset   sm:text-sm sm:leading-6"
                                                        {...field}
                                                    />
                                                </div>
                                                <div className="absolute right-3 top-1" onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword && <Eye className="text-primary" />}
                                                    {!showPassword && <EyeOff className="text-primary" />}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage>
                                            {error && (
                                                <span className="text-sm font-medium text-destructive" role="alert">
                                                    {error.message}
                                                </span>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="mt-2">
                                        <FormControl>
                                            <div className="relative flex w-full  items-center space-x-2">
                                                <div className="grid w-full items-center">
                                                    <Input
                                                        id="confirmPassword"
                                                        placeholder="Confirmar contraseña"
                                                        type={!isConfirmPassword ? 'password' : 'text'}
                                                        className="block w-full rounded-md border-0  py-1.5 pr-10 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset   sm:text-sm sm:leading-6"
                                                        {...field}
                                                    />
                                                </div>
                                                <div
                                                    className="absolute right-3 top-1"
                                                    onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                                                >
                                                    {isConfirmPassword && <Eye className="text-primary" />}
                                                    {!isConfirmPassword && <EyeOff className="text-primary" />}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage>
                                            {error && (
                                                <span className="text-sm font-medium text-destructive" role="alert">
                                                    {error.message}
                                                </span>
                                            )}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                            {/* <div className="my-5 flex items-center">
                                <h2 className="text-gray-light">
                                    ¿No recibiste el correo?
                                </h2>

                                <Button
                                    variant={'ghost'}
                                    className="ml-1 cursor-pointer p-1 font-bold text-brand-blue hover:bg-transparent focus:bg-transparent active:bg-transparent"
                                    type="button"
                                    onClick={() => {
                                        const recoveryEmail = localStorage.getItem('recoveryEmail');
                                        if (recoveryEmail) {
                                            resentCode({ email: recoveryEmail });
                                        } else {
                                            console.error('No se encontró el correo electrónico de recuperación');
                                        }
                                    }}                                >
                                    {isLoading ? (
                                        <>
                                            <RefreshCcw className="mr-2 size-4 animate-spin" />
                                            Cargando...
                                        </>
                                    ) : (
                                        'Haz click aqui para reenviarlo'
                                    )}
                                </Button>
                            </div> */}
                            <div>
                                <Button className="w-full" variant={'default'} disabled={!form.formState.isValid}>
                                    {isLoading ? (
                                        <>
                                            <RefreshCcw className="mr-2 size-4 animate-spin" />
                                            Cargando...
                                        </>
                                    ) : (
                                        'Confirmar'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
