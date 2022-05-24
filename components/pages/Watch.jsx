import styles from "./Watch.module.css";

const Watch = ({ match }) => {
  return (
    <div className="">
      <div className="">Video id is {match.params.id}</div>
    </div>
  );
};

export default Watch;
