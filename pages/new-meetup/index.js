import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const res = await fetch('/api/new-meetup', {
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
    <div>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
};

export default NewMeetupPage;
