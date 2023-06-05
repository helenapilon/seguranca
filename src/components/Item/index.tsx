import { Container } from "./styles";
import { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/router";
import itemService from "services/apiServices/item.service";
import { useLog } from "services/hooks/useLog/useLog";

export default function ItemRegister() {
  const router = useRouter();
  const [id, setId] = useState(0);
  const [item, setItem] = useState({} as any);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const { generateLog } = useLog();

  const getItem = (id: number) => {
    if (id > 0)
      itemService
        .get(id)
        .then((res) => {
          const { data } = res;
          setItem(data);
          setTitle(data.title);
          setDescription(data.description);
          setQuantity(data.quantity);
        })
        .catch((err) => console.log(err));
  };

  const createItem = async () => {
    itemService
      .create({ title, description, quantity, price: 1 })
      .then(async (res) => {
        alert("Item criado");
        generateLog(`criou item com id = ${res.data.id}`);
        router.push("/listagem-itens");
      })
      .catch((err: any) => {
        console.log("error on create itens: ", err);
        router.push("/listagem-itens");
      });
  };
  const updateItem = () => {
    itemService
      .update(id, { title, description, quantity, price: 1 })
      .then(async (res) => {
        alert("Item atualizado");
        generateLog(`atualizou item com id = ${id}`);
        router.push("/listagem-itens");
      })
      .catch((err: any) => {
        console.log("error on update itens: ", err);
        router.push("/listagem-itens");
      });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    console.log(id, title, description, quantity);

    if (id > 0) updateItem();
    else createItem();
  };

  useEffect(() => {
    let id = router.query.id;
    let parsedId = Number(id);
    if (!!parsedId && parsedId > 0) {
      setId(parsedId);
      getItem(parsedId);
    } else setId(0);
  }, [router.query.id]);

  return (
    <Container>
      <div>
        <h5>{id > 0 ? "Editar item" : "Cadastro de itens"}</h5>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Título"
            onChange={({ target }) => setTitle(target.value)}
            defaultValue={item.title}
          />

          <input
            type="text"
            placeholder="Descrição"
            onChange={({ target }) => setDescription(target.value)}
            defaultValue={item.description}
          />
          <input
            type="number"
            placeholder="Quantidade"
            onChange={({ target }) => setQuantity(target.value)}
            defaultValue={item.quantity}
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </Container>
  );
}
