import RegisterForm from "@/components/RegisterForm"
import { useRouter } from "next/router"
import { registerUser } from "@/services/userService"

export default function RegisterPage(){
const router = useRouter()

async function handleRegister(data) {
  try {
    await registerUser(data);
    router.push("/login");
  } catch (error) {
    console.error(error.message);
  }
}
    return (
        <RegisterForm onSubmit={handleRegister} />
    )

    
}