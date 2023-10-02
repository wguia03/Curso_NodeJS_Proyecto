const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");

const COLLECTION = "sales";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const checkStock = async (id_product, cantidad_sol) => {
  // verifica el stock
  const collection = await Database("products");
  const product = await collection.findOne({ _id: new ObjectId(id_product) });
  const { stock } = product;
  if (cantidad_sol <= stock) {
    return true;
  } else {
    return false;
  }
};

const createSale = async (sale) => {
  const { id_user, id_product, cantidad } = sale;
  const collection_sales = await Database(COLLECTION);
  const collection_products = await Database("products");

  stock_suficiente = await checkStock(id_product, cantidad);
  if (!stock_suficiente) {
    return false;
  }

  const filter = { _id: new ObjectId(id_product) };

  // Define la actualización utilizando $inc para restar 'cantidad'' al stock
  const updateDoc = {
    $inc: {
      stock: -cantidad, // Resta decrementAmount al campo "stock"
    },
  };

  await collection_products.updateOne(filter, updateDoc); // Realiza la actualización

  const result = await collection_sales.insertOne({
    id_user: new ObjectId(id_user),
    id_product: new ObjectId(id_product),
    cantidad: cantidad,
  });

  return result.insertedId;
};

const deleteSale = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.SalesService = {
  getAll,
  getById,
  createSale,
  deleteSale,
};
