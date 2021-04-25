import { MongoClient } from 'mongodb'

const methods = {};

methods.post = (req, res) => {
  MongoClient.connect('mongodb+srv://admin-darwin:<password>@cluster0.zixju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
};

const handler = (req, res) => {
  methods[req.method](req, res);
};

export default handler;
