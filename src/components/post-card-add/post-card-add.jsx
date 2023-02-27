import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import old_map from "../../assets/old_map.jpg";

const PostCardAdd = () => {
    return (
        <Card className="h-100" >
            <Link to={`/createpost`}>
                <Card.Img src={old_map} alt="title" className="postCardImage"/>
            </Link>
            <Card.Title>
                <Link to={`/createpost`}>
                    <h3>Create New Post</h3>
                </Link>
            </Card.Title>
        </Card>
    );
}

export default PostCardAdd;