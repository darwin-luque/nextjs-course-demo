import { MongoClient, ObjectID } from 'mongodb'

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
  } else {
    const meetup = await collection.find({ _id: ObjectID(id) }).toArray();
    if (meetup !== null) {
      res.status(201).json(meetup[0]);
    } else {
      res.status(502).json({ message: 'Could not get the meetup with id ' + id});
    }
  }
};

const handler = async (req, res) => {
  const { method } = req;
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zixju.mongodb.net/meetups?retryWrites=true&w=majority`,
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
