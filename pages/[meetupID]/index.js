import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const DetailsPage = ({ currentMeetup }) => {
  return (
    <>
      <Head>
        <title>{currentMeetup.title}</title>
        <meta name="description" content={currentMeetup.description} />
      </Head>
      <MeetupDetail meetup={currentMeetup} />
    </>
  );
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
