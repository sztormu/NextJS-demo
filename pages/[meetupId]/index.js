// our-domain.com/[meetupId]
import Head from "next/head"
import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from 'mongodb'

const MeetupDetails = (props) => {
    const { image, title, address, description } = props.meetupData

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <MeetupDetail
                title={title}
                image={image}
                address={address}
                description={description}
            />
        </>
    )
}

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://kacper:kacper@cluster0.w6yyu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

    client.close()


    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() },
        }))
    }
}

export const getStaticProps = async (context) => {

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://kacper:kacper@cluster0.w6yyu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

    client.close()



    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails