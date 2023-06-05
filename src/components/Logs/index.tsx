import { Container } from "./styles";
import { useEffect, useState, useCallback } from "react";

import Link from "next/link";
import logServices from "services/apiServices/log.service";
import { useRouter } from "next/router";
import { Table } from "react-bootstrap";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import { useLog } from "services/hooks/useLog/useLog";

interface logsProps {
  id: number;
  action: string;
  user_id: number;
  user_name: string;
}

export default function LogsList() {
  const router = useRouter();
  const { generateLog } = useLog();

  const [logs, setLogs] = useState([] as logsProps[]);
  const [filter, setFilter] = useState("");

  const getLogs = async () => {
    logServices
      .getAll("")
      .then((res) => {
        const { data } = res;
        setLogs(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (id: number) => {
    logServices
      .remove(id)
      .then(async () => {
        generateLog(`removeu item com id = ${id}`);
        getLogs();
      })
      .catch((err) => console.log(err));
  };

  const filterLogs = async () => {
    console.log(filter);
    logServices
      .getAll(filter)
      .then((res) => {
        const { data } = res;
        setLogs(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <Container>
      <div>
        <h5>Listagem de logs</h5>
        <input
          type="text"
          id="filter"
          placeholder="Filtrar pelo título"
          onChange={({ target }) => setFilter(target.value)}
        />
        <button type="button" onClick={filterLogs}>
          <FiSearch />
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ação</th>
              <th>Id do Usuário</th>
              <th>Nome do Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!!logs &&
              logs.map((item) => (
                <tr>
                  <td>{item.action}</td>
                  <td>{item.user_id}</td>
                  <td>{item.user_name}</td>
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
