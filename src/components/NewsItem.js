import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div>
        <div className="card mb-3">
           <div>
              <span  className="badge rounded-pill bg-danger" style={{    display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                left: '10px',
                top: '10px'
                }}>
                {source}
              </span>
           </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} On {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
