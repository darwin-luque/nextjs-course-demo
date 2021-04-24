import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is the first meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is the second meetup',
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is the thir meetup',
  },
]

const DetailsPage = () => {
  const [currentMeetup, setCurrentMeetup] = useState();
  const router = useRouter();

  useEffect(() => {
    const { meetupID } = router.query;
    if (meetupID !== undefined) {
      const foundMeetup = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupID);
      setCurrentMeetup(foundMeetup);
    }
  }, [router]);

  if (currentMeetup === undefined || currentMeetup === null) return null;

  return <MeetupDetail meetup={currentMeetup} />;
};

export default DetailsPage;
