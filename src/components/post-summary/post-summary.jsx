import { Link } from "react-router-dom";

import Badge from "react-bootstrap/Badge";

import "./post-summary.css";

const PostSummary = ({ post }) => {
  return (
    <div key={post.id} className="card mb-3 x-100">
      <Link className="row no-gutters" to={`/readPost/${post.id}`}>
        <div className="col-md-4">
          <img
            src={post.titleImage?.xs_img}
            srcSet={`
              ${post.titleImage?.xs_img} 992w,
              ${post.titleImage?.sm_img} 1200w,
              ${post.titleImage?.md_img} 1400w
            `}
            className="card-img summary-img"
            alt="title"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.summary}</p>
            {post.tags &&
              post.tags.map((tag) => (
                <Badge bg="secondary" className="m-1" key={tag.value}>
                  {tag.label}
                </Badge>
              ))}
            <p className="card-text">
              <small className="text-muted">@{post.author.name}</small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostSummary;
