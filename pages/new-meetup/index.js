// our-domain.com/new-meetup
import Head from "next/head"
import { useRouter } from "next/router"
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetup = () => {
    const router = useRouter()

    const onAddMeetup = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)

        router.push('/')
    }

    return (
        <>
            <Head>
                <title>NextJS Meetups</title>
                <meta name="description" content="Add your own meetups and create amazing networking opportunities" />
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetup} />
        </>
    )
}

export default NewMeetup