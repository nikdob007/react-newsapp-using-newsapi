import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading: false,
            page: 1
         }   
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=1&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        console .log(parseData);
        this.setState({articles : parseData.articles, totalResults : parseData.totalResults })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        console .log(parseData);
        this.setState({articles : parseData.articles})
       
        this.setState({
            page: this.state.page - 1,
            article: parseData.articles
        })

    }
    handleNextClick = async () => {
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cbd664cb0cb64396b203dfb4d3acc116&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parseData = await data.json();
            console .log(parseData);
            this.setState({articles : parseData.articles})
        
            this.setState({
                page: this.state.page + 1,
                article: parseData.articles
            })
        }
        
    }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='my-3'>NewsMonkey - TOp Headlines</h2>
        <div className="row">
            {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,88):""} 
                    imageUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com/2022-06/n9cacqc8_sri-lanka-fans_625x300_24_June_22.jpg"}
                    newsUrl={element.url}
                    />
                </div>
            })}
        </div>
        <div className="row">
            <div className="d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark my-2 align-items-start">&larr; Prev</button>
                <button type="button" onClick={this.handleNextClick} className="btn btn-dark my-2 align-items-end">Next &rarr; </button>
            </div>
        </div>
      </div>
    )
  }
}

export default News