import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="This is a list with all the react meetups around the world!" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const meetups = await (await fetch('http://localhost:3000/api/meetups')).json();
  return { 
    props: {
      meetups: meetups.map((meetup) => {
        const id = meetup._id.toString();
        delete meetup._id;
        return { id, ...meetup };
      }),
    },
    revalidate: 1,
  };
};

export default HomePage;
