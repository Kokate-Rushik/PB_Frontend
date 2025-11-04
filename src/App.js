import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import New from "./components/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0,
  };

  apiKey = process.env.REACT_APP_NEWS_API;
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <New
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key="/"
                  pageSize={10}
                  country="us"
                  category="general"
                />
              }
            />
            {/* <Route
              exact
              path="/home"no
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="home"
                  pageSize={10}
                  country="us"
                  category="home"
                />
              }
            /> */}
            <Route
              exact
              path="/general"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="general"
                  pageSize={10}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="business"
                  pageSize={10}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="entertainment"
                  pageSize={10}
                  country="us"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="health"
                  pageSize={10}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="science"
                  pageSize={10}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="sports"
                  pageSize={10}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <New
                  setProgress={this.setProgress}
                  apikey={this.apiKey}
                  key="technology"
                  pageSize={10}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
