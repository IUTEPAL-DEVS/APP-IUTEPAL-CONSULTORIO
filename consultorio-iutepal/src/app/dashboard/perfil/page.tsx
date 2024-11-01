import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    const { data: { user } } = await supabase.auth.getUser();
    console.log(user);

    return (
        <div>
            <h1>Perfil</h1>
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>Nombre: {user.phone}</p>
                    {/* Add other user properties as needed */}
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}