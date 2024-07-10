import React from 'react'

const NewsItem =(props)=>  {
  

  
  let {title, description, imgurl, newsurl, author,date, source} = props;
    return (
      <div className='my-3'>
       <div className="card">
        <div style={
          {display: `flex`,
          justifyContent: `flex-end`,
          position:`absolute`,
        right:`0`}
        }>
        <span className="badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}}> {source} </span>
        </div>
       
  <img src={!imgurl?"https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2021/03/leon-edwards-belal-muhammad-ufc-257.jpg?w=1024&h=576&crop=1": imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
    <a href={newsurl} className="btn btn-sm btn-dark">Read More Here</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem