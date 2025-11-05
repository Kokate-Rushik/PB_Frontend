import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      showScrollUp: false,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Prime Bulletin`;
  }
  backendUrl = `https://pb-backend-1-u522.onrender.com`;

  async updateNews(loadMore = false) {
    this.props.setProgress(10);

    console.log(this.state.totalResults);
    console.log(this.state.articles.length);

    let page = loadMore ? this.state.page + 1 : 1; // Page 1 for initial load
    this.setState({ loading: !loadMore, page });

    const url = `${this.backendUrl}/news?country=${this.props.country}&category=${this.props.category}&page=${page}&pageSize=${this.props.pageSize}`;

    this.props.setProgress(40);

    try {
      let response = await fetch(url);
      this.props.setProgress(60);
      let parsedData = await response.json();
      this.props.setProgress(90);

      let newArticles = parsedData.articles || []; // Ensure it's an array

      if (loadMore) {
        const existingUrls = new Set(
          this.state.articles.map((article) => article.url)
        );
        newArticles = newArticles.filter(
          (article) => !existingUrls.has(article.url)
        );

        if (newArticles.length === 0) {
          // ✅ Stop fetching if no new articles
          this.setState({ hasMore: false });
          return;
        }

        this.setState((prevState) => ({
          articles: [...prevState.articles, ...newArticles],
          totalResults: parsedData.totalResults || prevState.totalResults,
          loading: false,
        }));
      } else {
        this.setState({
          articles: newArticles,
          totalResults: parsedData.totalResults || 0,
          hasMore: newArticles.length > 0,
          loading: false,
        });
      }

      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, hasMore: false });
    }
  }

  async componentDidMount() {
    this.updateNews();
    window.addEventListener("scroll", this.toggleScrollUp);
  }

  fetchMoreData = () => {
    if (!this.state.hasMore) return;
    this.updateNews(true);
  };

  toggleScrollUp = () => {
    window.scrollY > 500
      ? this.setState({ showScrollUp: true })
      : this.setState({ showScrollUp: false });
  };

  toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          Prime Bulletin - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner />}
        >
          <div className="container my-4">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      sources={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {this.state.showScrollUp && (
          <button
            className="btn btn-small btn-dark"
            style={{ position: "fixed", bottom: "3%", right: "3%" }}
            onClick={this.toTop}
          >
            &uarr;
          </button>
        )}
      </>
    );
  }
}

export default News;
