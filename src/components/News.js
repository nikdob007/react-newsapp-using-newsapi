import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'entertainment'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
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
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(60);
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false           
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     console.log(parseData);
    //     this.setState({ articles: parseData.articles })

    //     this.setState({
    //         page: this.state.page - 1,
    //         article: parseData.articles,
    //         loading: false
    //     })

    // }
    // handleNextClick = async () => {
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({ loading: true });
    //         let data = await fetch(url);
    //         let parseData = await data.json();
    //         console.log(parseData);
    //         this.setState({ articles: parseData.articles })

    //         this.setState({
    //             page: this.state.page + 1,
    //             article: parseData.articles,
    //             loading: false
    //         })
    //     }

    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
       
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        })
        
    };
    render() {
        return (
            <>
                <h2 className='my-5 text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Loading/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2022-06/n9cacqc8_sri-lanka-fans_625x300_24_June_22.jpg"}
                                        newsUrl={element.url}
                                        author={element.author}
                                        publishedAt={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="row">
                    <div className="d-flex justify-content-between">
                        <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark my-2 align-items-start">&larr; Prev</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark my-2 align-items-end">Next &rarr; </button>
                    </div>
                </div> */}
            </>
        )
    }
}

export default News