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

const DetailsPage = ({ currentMeetup }) => {
  return <MeetupDetail meetup={currentMeetup} />;
};

export const getStaticPaths = async () => {
  const meetups = await (await fetch('http://localhost:3000/api/meetups')).json();
  const paths = meetups.map((meetup) => ({
    params: { meetupID: meetup._id },
  }));
  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps = async (context) => {
  const { meetupID } = context.params;
  const response = await fetch(`http://localhost:3000/api/meetups?id=${meetupID}`);
  const foundMeetup = await response.json();
  return {
    props: {
      currentMeetup: foundMeetup,
    },
  };
};

export default DetailsPage;
