import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuthContext } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";

const useResetPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useAuthContext();
    const toaster = useToast();

    const formSchema = z
        .object({
            password: z.string(),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        });

    type FormSchemaType = z.infer<typeof formSchema>;

    const { control, handleSubmit, setError } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const setErrors = (errors: Record<string, any>) => {
        Object.entries(errors).forEach(([key, value]: any[]) => setError(key, { message: value }));
    };

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const response = await resetPassword(data);
        if (response.status == "success") {
            toaster.success(response.data);
            navigate(routes.auth.login);
        } else {
            setErrors(response.errors);
        }
        setIsLoading(false);
    });

    return {
        isLoading,
        control,
        onSubmit,
    };
};

export { useResetPassword };
