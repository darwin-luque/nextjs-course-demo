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
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupID: 'm1',
        },
      },
      {
        params: {
          meetupID: 'm2',
        },
      },
      {
        params: {
          meetupID: 'm3',
        },
      },
    ]
  };
};

export const getStaticProps = async (context) => {
  const { meetupID } = context.params;
  const foundMeetup = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupID);
  return {
    props: {
      currentMeetup: foundMeetup,
    },
  };
};

export default DetailsPage;
