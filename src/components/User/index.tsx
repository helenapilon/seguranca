import { Container } from "./styles";
import { useEffect, useState, useCallback } from "react";

import Image from "next/image";
import Link from "next/link";
import userServices from "services/apiServices/user.service";
import { useRouter } from "next/router";
import { useLog } from "services/hooks/useLog/useLog";

export default function UserRegister() {
  const router = useRouter();
  const [id, setId] = useState(0);
  const [user, setUser] = useState({} as any);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { generateLog } = useLog();

  const getUser = (id: number) => {
    if (id > 0)
      userServices
        .get(id)
        .then((res) => {
          const { data } = res;
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setPassword(data.password);
        })
        .catch((err) => console.log(err));
  };

  const createUser = () => {
    userServices
      .create({ name, email, password })
      .then(async (res) => {
        alert("User criado");
        generateLog(`criou user com id = ${res.data.id}`);
        router.push("/listagem-itens");
      })
      .catch((err: any) => {
        console.log("error on create itens: ", err);
        router.push("/listagem-itens");
      });
  };
  const updateUser = () => {
    userServices
      .update(id, { name, email, password })
      .then(async (res) => {
        alert("User atualizado");
        generateLog(`atualizou user com id = ${id}`);
        router.push("/listagem-itens");
      })
      .catch((err: any) => {
        console.log("error on update itens: ", err);
        router.push("/listagem-itens");
      });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (id > 0) updateUser();
    else createUser();
  };

  useEffect(() => {
    let id = router.query.id;
    let parsedId = Number(id);
    if (!!parsedId && parsedId > 0) {
      setId(parsedId);
      getUser(parsedId);
    } else setId(0);
  }, [router.query.id]);

  return (
    <Container>
      <div>
        <h5>{id > 0 ? "Editar usuário" : "Cadastro de usuários"}</h5>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={({ target }) => setName(target.value)}
            defaultValue={user.name}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={({ target }) => setEmail(target.value)}
            defaultValue={user.email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={({ target }) => setPassword(target.value)}
            defaultValue={user.password}
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </Container>
  );
}
