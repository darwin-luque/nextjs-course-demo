import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const res = await fetch('/api/meetups', {
      method: 'post',
      body: JSON.stringify({ data: meetupData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 201) {
      router.push('/');
    } else {
      alert('Could not create the meetup');
    }
  };

  return (
    <>
      <Head>
        <title>Create a new Meetup</title>
        <meta name="description" content="Create a new meetup so that the community can gather around." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
