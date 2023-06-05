//@ts-nocheck
import api from "../api";

const getAll = (title) => {
  return api.get("/item", {
    params: {
      title: title,
    },
  });
};

const get = (id) => {
  return api.get(`/item/${id}`);
};

const create = (data) => {
  return api.post("/item", data);
};

const update = (id, data) => {
  return api.put(`/item/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/item/${id}`);
};

const removeAll = () => {
  return api.delete(`/item`);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
