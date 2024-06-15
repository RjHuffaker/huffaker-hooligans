import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import mtn_logo from "../../assets/mtn_logo.png";

const PostCardAdd = () => {
  return (
    <Card className="h-100">
      <Link to={`/createpost`}>
        <Card.Img src={mtn_logo} alt="title" className="postCardImage" />
      </Link>
      <Card.Title>
        <Link to={`/createpost`}>
          <h3>Create New Post</h3>
        </Link>
      </Card.Title>
    </Card>
  );
};

export default PostCardAdd;
