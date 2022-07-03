import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews= async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30); 
        let parseData = await data.json();
        props.setProgress(60);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        /* eslint-disable */
    },[])
    

    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${page - 1}&pageSize=${props.pageSize}`;
    //     setLoading(true)
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     setArticles(parseData.articles)
    //     setPage(page - 1)
    //     setLoading(false)

    // }
    // handleNextClick = async () => {
    //     if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${page + 1}&pageSize=${props.pageSize}`;
    //         setLoading(true)
    //         let data = await fetch(url);
    //         let parseData = await data.json();
    //         console.log(parseData);
    //          setArticles(parseData.articles)
    //          setPage(page + 1)
    //         setLoading(false)
    //     }

    // }
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)   
    };
    
        return (
            <>
                <h2 className='text-center' style={{margin:'85px 0 40px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Loading/>}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
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
                        <button type="button" disabled={page <= 1} onClick={handlePrevClick} className="btn btn-dark my-2 align-items-start">&larr; Prev</button>
                        <button type="button" disabled={page + 1 > Math.ceil(state.totalResults / props.pageSize)} onClick={handleNextClick} className="btn btn-dark my-2 align-items-end">Next &rarr; </button>
                    </div>
                </div> */}
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'entertainment'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News