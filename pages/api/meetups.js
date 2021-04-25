import { MongoClient } from 'mongodb'

const methods = {};

methods.post = async (req, res, collection) => {
  try {
    const result = await collection.insertOne(req.body.data);
    console.log(result);
    res.status(201).json({ message: 'Meetup succesfully created' });
  } catch {
    res.status(502).json({ message: 'Could not create the meetup' });
  }
};

methods.get = async (req, res, collection) => {
  let { id } = req.query;
  if (!id) {
    try {
      const meetups = await collection.find().toArray();
      res.status(201).json(meetups);
    } catch {
      res.status(502).json({ message: 'Could not get the meetups'});
    }
  }
};

const handler = async (req, res) => {
  const { method } = req;
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://admin-darwin:LLMc1JLYb6hN5dNr@cluster0.zixju.mongodb.net/meetups?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    await methods[method.trim().toLowerCase()](req, res, meetupCollection);
    client.close();
  } catch {
    res.status(502).json({ message: 'Could not connect with the server' });
  }
};

export default handler;
