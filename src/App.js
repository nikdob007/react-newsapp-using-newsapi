import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 5
  country = "in"
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
      <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
       <Routes>
          <Route exact strict path='/science' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={1} papageSize={this.papageSize} country= {this.country}  category="science" />}></Route>
          <Route exact strict path='/business' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={2} papageSize={this.papageSize} country= {this.country}  category="business" />}></Route>
          <Route exact strict path='/entertainment' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={3} papageSize={this.papageSize} country= {this.country}  category="entertainment" />}></Route>
          <Route exact strict path='/general' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={4} papageSize={this.papageSize} country= {this.country}  category="general" />}></Route>
          <Route exact strict path='/health' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={5} papageSize={this.papageSize} country= {this.country}  category="health" />}></Route>
          <Route exact strict path='/sports' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={6} papageSize={this.papageSize} country= {this.country}  category="sports" />}></Route>
          <Route exact strict path='/technology' element={<News  setProgress={this.setProgress} apiKey={this.apiKey}  key={7} papageSize={this.papageSize} country= {this.country}  category="technology" />}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
