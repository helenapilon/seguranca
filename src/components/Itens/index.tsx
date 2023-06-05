import { Container } from "./styles";
import { useEffect, useState, useCallback } from "react";

import Link from "next/link";
import itemServices from "services/apiServices/item.service";
import { useRouter } from "next/router";
import { Table } from "react-bootstrap";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import { useLog } from "services/hooks/useLog/useLog";

interface itemsProps {
  id: number;
  title: string;
  description: string;
  quantity: number;
}

export default function ItemsList() {
  const router = useRouter();
  const { generateLog } = useLog();

  const [items, setItems] = useState([] as itemsProps[]);
  const [filter, setFilter] = useState("");

  const getItems = async () => {
    itemServices
      .getAll("")
      .then((res) => {
        const { data } = res;
        setItems(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (id: number) => {
    itemServices
      .remove(id)
      .then(async () => {
        generateLog(`removeu item com id = ${id}`);
        getItems();
      })
      .catch((err) => console.log(err));
  };

  const filterItems = async () => {
    console.log(filter);
    itemServices
      .getAll(filter)
      .then((res) => {
        const { data } = res;
        setItems(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <div>
        <h5>Listagem de itens</h5>
        <input
          type="text"
          id="filter"
          placeholder="Filtrar pelo título"
          onChange={({ target }) => setFilter(target.value)}
        />
        <button type="button" onClick={filterItems}>
          <FiSearch />
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!!items &&
              items.map((item) => (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td className="actions">
                    <Link href={`/item/${item.id}`}>
                      <FiEdit />
                    </Link>
                    <button type="button" onClick={() => deleteItem(item.id)}>
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
