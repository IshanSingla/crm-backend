const { Client } = require("redis-om");

const client = new Client();

const connect = async () => {
  if (!client.isOpen()) {
    client
      .open(
        "redis://default:NeZvo9uP1FkulE6YreAipi60HHutg1ME@redis-17467.c1.asia-northeast1-1.gce.cloud.redislabs.com:17467"
      )
      .catch((err) => {
        console.log(err);
      });
  }
  return client;
};

const set = async (
  key = "",
  value = {
    expensesCount: 0,
    inventoryCount: 0,
  }
) => {
  connect();
  let data = await client.jsonget(key);
  if (data) {
    throw new Error("Key already exists");
  } else {
    client.jsonset(key, JSON.stringify(value));
  }
  client.close();
};
const get = async (key = "") => {
  connect();
  let data = await client.jsonget(key);
  client.close();
  return data;
};

const update = async (
  key = "",
  value = {
    expensesCount: 0,
    inventoryCount: 0,
  }
) => {
  connect();
  let data = await client.jsonget(key);
  if (data) {
    client.jsonset(key, JSON.stringify(value));
  } else {
    throw new Error("Key does not exists");
  }
  client.close();
};

const del = async (key = "") => {
  connect();
  let data = await client.jsonget(key);
  if (data) {
    client.dropIndex(key);
  } else {
    throw new Error("Key does not exists");
  }
  client.close();
};

const incriment = async (key = "", field = "") => {
  connect();
  let data = await client.jsonget(key);
  if (data) {
    data[field] = data[field] + 1;
    client.jsonset(key, JSON.stringify(data));
  } else {
    throw new Error("Key does not exists");
  }
  client.close();
};

const decriment = async (key = "", field = "") => {
  connect();
  let data = await client.jsonget(key);
  if (data) {
    data[field] = data[field] - 1;
    client.jsonset(key, JSON.stringify(data));
  } else {
    throw new Error("Key does not exists");
  }
  client.close();
};

module.exports = {
  client,
  connect,
  set,
  get,
  update,
  del,
  incriment,
  decriment,
};
