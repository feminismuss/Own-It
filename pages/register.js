import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";
import { registerUser } from "@/services/userService";
import { StyledMain } from "@/styles/sharedStyles";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(data) {
    try {
      await registerUser(data);
      router.push("/login");
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <StyledMain>
      <RegisterForm onSubmit={handleRegister} />
    </StyledMain>
  );
}
