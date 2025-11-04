import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, sources } = props;
  return (
    <div>
      <div className="card newsitem-card my-3">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-dark"
          style={{ left: "90%", zIndex: "1" }}
        >
          {sources}
        </span>
        <img
          id="newsitem-img"
          className="card-img-top"
          src={imgUrl || "./logo.jpg"}
          alt="..."
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "./logo.jpg";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title ? title.split(" ").slice(0, 10).join(" ") + "..." : ""}
          </h5>
          <p className="card-text">
            {description
              ? description.split(" ").slice(0, 20).join(" ") + "..."
              : ""}
          </p>
          <p className="card-text">
            <small className="text-muted">
              Author:- {author ? author : "unknown"}
              <br />
              Date:- {new Date(date).toUTCString()}
            </small>
          </p>
        </div>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary btn-end"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
