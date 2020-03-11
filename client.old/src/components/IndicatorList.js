import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ScrollToTopOnMount from './ScrollToTopComponent.js';
import "@babel/polyfill";

import PageTitle from './PageTitle.js';
import Filters from './Filters.js';

class IndicatorList extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedItem: '',
      search: "",
      filteredIndicators: this.props.indicators,
      org: false,
      results: []
    }
  };
  
  addFilter = (type, value) => {
    this.props.addFilter(type, value);
  }
  
  removeFilter = (type, value) => {
    this.props.removeFilter(type, value);
  }
  
  handleToggle = () => {
    this.props.toggleMetaHandler();
  }
  
  //Use this for navigation
  componentDidMount() {
    console.log(this.props.location)

    if (this.props.indicators.length > 0) {
      this.setState({
        selectedItem: this.props.indicators[0].Name
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newProps = this.props
    if(prevProps.indicators !== this.props.indicators) {
      
      let defaultSelected = this.props.indicators[0].Name;
    
      this.setState({
        selectedItem: defaultSelected
      })
    }
  }
  
  handleChange = event => {
    this.setState({
      search: event.target.value
    },
    function() {
      var options = {
        keys: ['Name']
      }
      
      var results = [];
      var initialindicators = this.props.indicators;
      
      var fuse = new Fuse(initialindicators, options)
      
      results = fuse.search(this.state.search)

      if (results && results.length > 0) {
        this.setState({
          selectedItem: results[0].Name,
          results: results
        })
        this.props.handleSetIndicator(results[0].Name);
      } else {
        this.setState({
          selectedItem: initialindicators[0].Name,
          results: []
        })
        this.props.handleSetIndicator(initialindicators[0].Name);
      }
    })
  }
  
  handleClick = (event) => {    
    this.setState({
      selectedItem: event.currentTarget.dataset.name
    })
    this.props.handleSetIndicator(event.currentTarget.dataset.name);
  }

  renderPref(indicator) {
    var perfConst = 60;

    if (this.props.loggedIn || this.state.org) {
    //if (this.props.org) {
      return (
        <div className="perf-cont">
              <div>
                <div className="perf-num">
                  {indicator.Performance} <span>%</span>
                </div>
                <div className="perf-year">
                  2018
                </div>
              </div>
              <div className="perf-arrow">
                <i className={indicator.Performance > perfConst ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
              </div>
            </div>
      )
    }
  }
  
  renderIndicators() {
    var selectedIndex = this.state.selectedItem;
    var list = [];

    console.log(list)

    if (this.state.results.length > 0) {
      list = this.state.results
    } else {
      list = this.props.indicators
    }
    if (list.length > 0) {
        return list.map((indicator, index, key) => (
          <div 
            className={indicator.Name == selectedIndex ? "indicator active" : "indicator"} 
            onClick={this.handleClick} 
            data-index={index}
            data-name={indicator.Name}
            key={indicator.Name}
          >
            <div className="indicator-content">
              <div className="indicator-name">{indicator.Name}</div>
              <div className="indicator-desc">
                {indicator.Description}
              </div>
            </div>
            {this.renderPref(indicator)}
            <div className="indicator-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
           </div>
        ));
    } else {
      return <div>No Results</div>
    }
  };

  navigateFilter = (e) => {
    var type = e.target.dataset.type;
    var val = e.target.dataset.val;

    this.props.clearFilters(type, val);
  }

  renderTags() {
    var indicator = this.props.setIndicator;
    
    if (indicator.Tags ) {
      return indicator.Tags.map((tag, key) => (
        <Link to="/topic">
          <div className="tag" data-type="Tags" data-val={tag} onClick={this.navigateFilter} key={tag}>
            {tag}  
          </div>
        </Link>
      ))
    }
  }

  renderPreviewViz() {
    var selectedItem = this.state.selectedItem;

    if (selectedItem === "Public and Private Health Expenditures") {
      return (
        <div className="preview-viz-cont">
              <div className="preview-viz">
                <div className="preview-viz-title">
                  5-year Health Expenditures
                </div>
                <div className="preview-viz-img">
                  <img src="./images/5-year.png"/>
                </div>
              </div>
            </div>
      )
    }

    if (selectedItem === "30-Day Acute Myocardial Infarction In-Hospital Mortality") {
      return (
        <div className="preview-viz-cont">
              <div className="preview-viz">
                <div className="preview-viz-title">
                  Trending Spending Across Canada - 2018
                </div>
                <div className="preview-viz-img">
                  <img src="./images/6.png"/>
                </div>
              </div>
            </div>
      )
    }

    if (selectedItem === "Wait Times for Hip Replacement (Percentage Meeting Benchmark)") {
      return (
        <div className="preview-viz-cont">
              <div className="preview-viz">
                <div className="preview-viz-title">
                  Median (or 50th percentile) wait in days - Prov vs Canada - 2017
                </div>
                <div className="preview-viz-img">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/7.png"/>
                </div>
              </div>
            </div>
      )
    }
  }
  
  render() {
    return (
      <div className="main list">
        <ScrollToTopOnMount />
      <Filters
        filters={this.props.filters}
        addFilter={this.addFilter}
        removeFilter={this.removeFilter}
        handleOrg={this.handleOrg}
        removeOrg={this.removeOrg}
        clearFilters={this.props.clearFilters}
      />
      <div className={this.props.filters.length === 0 ? "indicators" : "indicators active" }>
        <div className="indicator-list">
          <input ref="textInput" type="text" className="fuzzy" placeholder="Search Indicators" onChange={this.handleChange}/>
          {this.renderIndicators()}
        </div>
        <div className="indicator-details-cont">
          <div className="indicator-details">
            <Link to="/indicator">
              <div className="indicator-name">
                {this.props.setIndicator.Name}
              </div>
            </Link>
            <div className="indicator-details-tags">
              {this.renderTags()}
            </div>
            <div className="indicator-metadata" onClick={this.handleToggle}>View Metadata</div>
            <div className="indicator-desc">
              {this.props.setIndicator.Description}
            </div>
            {this.renderPreviewViz()}
          </div>
        </div>
      </div>
    </div>
    )
  };

}


export default withRouter(IndicatorList)