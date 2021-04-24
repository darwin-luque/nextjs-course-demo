import classes from './MeetupDetail.module.css';

const MeetupDetail = ({ meetup }) => {
  const { image, title, address, description } = meetup;
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
