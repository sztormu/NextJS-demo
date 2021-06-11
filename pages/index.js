// our-domain.com/
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from "../components/meetups/MeetupList"


const Homepage = (props) => {

    return (
        <>
            <Head>
                <title>NextJS Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>

    )
}

// export const getServerSideProps = async (context) => {
//     //runs always after deplyoment, every incoming request
//     //only on the server
//     //fetch data from API
//     const req = context.req
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export const getStaticProps = async () => {
    //runs during the build process and when we revalidate
    //fetch data from API

    const client = await MongoClient.connect('mongodb+srv://kacper:kacper@cluster0.w6yyu.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}



export default Homepage

