import { MongoClient } from 'mongodb'

const methods = {};

methods.post = async (body, collection, res) => {
  try {
    const result = await collection.insertOne(body.data);
    console.log(result);
    res.status(201).json({ message: 'Meetup succesfully created' });
  } catch {
    res.status(502).json({ message: 'Could not create the meetup' });
  }
};

methods.get = async (body, collection, res) => {
  const getAll = typeof body.data.getAll === 'boolean' ? body.data.getAll : true;
  if (getAll) {
    try {
      const meetups = collection.find().toArray();
      res.status(201).json(meetups);
    } catch {
      res.status(502).json({ message: 'Could not get the meetups'});
    }
  }
};

const handler = async (req, res) => {
  const { method, body } = req;
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
    await methods[method.trim().toLowerCase()](body, meetupCollection, res);
    client.close();
  } catch {
    res.status(502).json({ message: 'Could not connect with the server' });
  }
};

export default handler;
