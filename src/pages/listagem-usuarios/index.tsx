import UserRegister from "components/User";
import UserList from "components/UserList";
import Link from "next/link";
import { Container } from "styles/styles";

export default function Home() {
  return (
    <Container>
      <UserList />
    </Container>
  );
}
