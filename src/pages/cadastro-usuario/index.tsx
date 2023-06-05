import UserRegister from "components/User";
import Link from "next/link";
import { Container } from "styles/styles";

export default function Home() {
  return (
    <Container>
      <UserRegister />
    </Container>
  );
}
