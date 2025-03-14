import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.props.category} - NewsApp`;
  }

  async updateNews() {
    this.props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19576c128b7c4b3197ce4dd3f360a317&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json()
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100);
  }


  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousclick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextclick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }
  fetchMoreData = async() => {
    this.setState({page:this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19576c128b7c4b3197ce4dd3f360a317&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles:this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '35px 0px' }}>News App - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
         {this.state.loading && <Spinner />} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
         <div className="container">
         <div className="row">
            { this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
         </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
      </>

    )
  }
}

export default News
