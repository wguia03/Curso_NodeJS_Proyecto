const { Database } = require("../database/index");
const { ObjectId } = require("mongodb"); // 'findOne' funciona con 'ObjectId'
const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION); // 'database' es asíncrono (retorna una promesa), por eso usamos 'await'
  return await collection.find({}).toArray(); // devolver la lista productos como un arreglo
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) }); // buscar por 'id' y usar 'new' para no ocasionar errores
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product); // inserción del producto en la db
  return result.insertedId; // falta 'await'?
};

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

const updateProduct = async (id, newProduct) => {
  const collection = await Database(COLLECTION);
  const query = { _id: new ObjectId(id) };
  const replacement = {
    _id: new ObjectId(id),
    ...newProduct,
  };
  await collection.replaceOne(query, replacement);
  return replacement; // 'upsertedId' solo funciona si no se encontraron coincidencias con la query y se agrega un nuevo objeto
};

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.ProductsService = {
  getAll, // la clave y valor es 'getAll', la misma lógica para los demás
  getById,
  create,
  generateReport,
  updateProduct,
  deleteProduct,
};
