import { MongoClient } from 'mongodb'

// /api/new-meetup


//this will never run client side so its safe to have credentials

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body

        const { title, image, address, description } = data

        const client = await MongoClient.connect('mongodb+srv://kacper:kacper@cluster0.w6yyu.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)

        console.log(result)

        client.close()

        res.status(201).json({ message: 'Meetup inserted' })
    }
}

export default handler