import LoginForm from '@/src/components/login-form';

export default function Login() {
    return <LoginForm />;
}


// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'

// export default async function Page() {
//   const cookieStore = await cookies()
//   const supabase = createClient(cookieStore)

//   const { data: todos } = await supabase.from('tipo_paciente').select()

//   return (
//     <>
//       <div>
//         holaaaa
//       </div>
//       <ul>
//         {todos?.map((todo) => (
//           <li>{todo.name}</li>

//         ))}
//       </ul>
//     </>

//   )
// }
