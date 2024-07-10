// import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
   state ={
    progress:0
   }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        
        <Navbar/>
        <LoadingBar
        height={4}
        color='#198754'
        progress={this.state.progress}
      />
        <Routes>
          <Route path="/" element={<News setProgress = {this.setProgress} key="general" pageSize={5} country="in" category="General" />} />
          <Route path="/Business" element={<News setProgress = {this.setProgress} key="Business" pageSize={5} country="in" category="Business" />} />
          <Route path="/Entertainment" element={<News setProgress = {this.setProgress} key="Entertainment" pageSize={5} country="in" category="Entertainment" />} />
          <Route path="/General" element={<News setProgress = {this.setProgress} key="General" pageSize={5} country="in" category="General" />} />
          <Route path="/Health" element={<News setProgress = {this.setProgress} key="Health" pageSize={5} country="in" category="Health" />} />
          <Route path="/Science" element={<News setProgress = {this.setProgress} key="Science" pageSize={5} country="in" category="Science" />} />
          <Route path="/Sports" element={<News setProgress = {this.setProgress} key="Sports" pageSize={5} country="in" category="Sports" />} />
          <Route path="/Technology" element={<News setProgress = {this.setProgress} key="Technology" pageSize={5} country="in" category="Technology" />} />
        </Routes>
        
      </div>
      </BrowserRouter>
    )
  }
}

