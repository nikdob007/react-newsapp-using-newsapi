import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  let pageSize = 5
  let country = "in"
  let apiKey = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0)
  
  
    return (
      <div>
      <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
       <Routes>
          <Route exact strict path='/science' element={<News  setProgress={setProgress} apiKey={apiKey}  key={1} pageSize={pageSize} country= {country}  category="science" />}></Route>
          <Route exact strict path='/business' element={<News  setProgress={setProgress} apiKey={apiKey}  key={2} pageSize={pageSize} country= {country}  category="business" />}></Route>
          <Route exact strict path='/entertainment' element={<News  setProgress={setProgress} apiKey={apiKey}  key={3} pageSize={pageSize} country= {country}  category="entertainment" />}></Route>
          <Route exact strict path='/general' element={<News  setProgress={setProgress} apiKey={apiKey}  key={4} pageSize={pageSize} country= {country}  category="general" />}></Route>
          <Route exact strict path='/health' element={<News  setProgress={setProgress} apiKey={apiKey}  key={5} pageSize={pageSize} country= {country}  category="health" />}></Route>
          <Route exact strict path='/sports' element={<News  setProgress={setProgress} apiKey={apiKey}  key={6} pageSize={pageSize} country= {country}  category="sports" />}></Route>
          <Route exact strict path='/technology' element={<News  setProgress={setProgress} apiKey={apiKey}  key={7} pageSize={pageSize} country= {country}  category="technology" />}></Route>
        </Routes>
        </Router>
      </div>
    )
}


export default App