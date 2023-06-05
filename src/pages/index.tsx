import Link from "next/link";
import { Container } from "styles/styles";

export default function Home() {
  return (
    <Container>
      <h3>Segurança em Aplicações</h3>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/cadastro-usuario">Cadastro de usuarios</Link>
        </li>
        <li>
          <Link href="/listagem-usuarios">Listagem de usuários</Link>
        </li>
        <li>
          <Link href="/cadastro-item">Cadastro de itens</Link>
        </li>
        <li>
          <Link href="/listagem-itens">Listagem de itens</Link>
        </li>
        <li>
          <Link href="/listagem-logs">Listagem de logs</Link>
        </li>
      </ul>
    </Container>
  );
}
