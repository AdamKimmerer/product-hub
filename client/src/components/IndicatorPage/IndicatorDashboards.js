import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";
import tableau from "tableau-api";
import Fuse from "fuse.js";

class IndicatorDashboards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboards: [],
      filters: {
        
      },
      newDashboards: [],
      search: "",
    }

    var tableauVars = []
  }

  componentWillMount() {
    this.getDashboards();
  }

  getDashboards = () => {
    axios.get('https://api.myjson.com/bins/1gm35m')
      .then((response) => {
        this.setState({
          dashboards: response.data,
          newDashboards: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }

  renderDashboardsContainer() {
    var tableauVars = [];

    var array = this.state.newDashboards;

    var options = {
        width: "100%",
        height: "100%",
        hideTabs: false
      };

    if (array.length > 0) {
      var results = array.map((dashboard, i) => {
        return (
          <div
            className="dash-item"
            key={i}
            id={"vizContainer" + i}
          ></div>
        )
      })
    } 

    if (document.getElementById("vizContainer0") !== null)
    for (var i = 0; i < array.length; i++) {
        var containerDiv = document.getElementById("vizContainer" + i);

        console.log(containerDiv)

        tableauVars[i] = new tableau.Viz(containerDiv, array[i].Preview, options);
      }

    return results;
  }

  applyFilters = () => {
    var oldDashboards = this.state.dashboards;
    var filters = this.state.filters;

    this.setState({
      newDashboards: oldDashboards
    }, function() {

      var newDashboards = this.state.newDashboards;

      for (var i = 0; i < Object.keys(filters).length; i++) {

        var key = Object.keys(filters)[i]
        var values = filters[Object.keys(filters)[i]]
        
        
        if (values.length > 0) {
          newDashboards.forEach(dash => {
            if (!dash[key].some(v=> values.indexOf(v) !== -1)) {
              newDashboards = newDashboards.filter(el => el.Preview != dash.Preview ); 
            }
          }) 
        }
      }

      this.setState({
        newDashboards: newDashboards
      })
    })
  }

      //<b>Name:</b> {dashboard.Name}<br/>
    //<b>Topics:</b> {dashboard.Topics.toString()}<br/>
    //<b>Tags:</b> {dashboard.Tags.toString()}<br/>
    //<b>Data Sources:</b> {dashboard.DataSources.toString()}<br/>
    //<b>Orgs:</b> {dashboard.Orgs.toString()}<br/>
    //<b>Type:</b> {dashboard.Type}<br/>

  handleChange = event => {
    this.setState({
      search: event.target.value
    },
    function() {
      var options = {
        keys: ['Name', 'Topics', 'Tags', 'DataSources', 'Orgs', 'Type'],
        threshold: 0.4
      }
      
      var results = [];
      var initialDashboards = this.state.newDashboards;
      
      var fuse = new Fuse(initialDashboards, options)
      
      results = fuse.search(this.state.search)

      if (results && results.length > 0) {
        this.setState({
          newDashboards: results
        })
      } else {
        this.setState({
          newDashboards: initialDashboards
        })
      }
    })
  }

  editFilter = (e) => {
    var filterType = e.currentTarget.attributes.getNamedItem("data-type").value,
        filterName = e.currentTarget.value,
        checked = e.currentTarget.checked;

        if (checked) {
          var filters = this.state.filters;

          if (filters[filterType]) {

            filters[filterType].push(filterName);

            this.setState({
              filters: filters
            }, this.applyFilters())
          } else {
            filters[filterType] = [filterName]

            this.setState({
              filters: filters
            }, this.applyFilters())
          }
        } else {
          var filterState = this.state.filters;

          var newFilters = filterState[filterType].filter(item => !filterName.includes(item))

          filterState[filterType] = newFilters;

          this.setState({
            filters: filterState
          }, this.applyFilters())
        }
    
  }

  render() {
    return (
        <div className="dash-cont">
            <div className="dash-left">
            <input ref="textInput" type="text" className="fuzzy" placeholder="Search Dashboards" onChange={this.handleChange}/>
            <div className="dash-filters-cont">
              <div className="filters-section">
                <div className="filters-section-title">
                  Topics
                </div>
                <div className="filters-section-options">
                  <label><input type="checkbox" name="Topic 1" data-type="Topics" value="Topic 1" onChange={this.editFilter}/>Acute Care</label><br/>
                  <label><input type="checkbox" name="Topic 2" data-type="Topics" value="Topic 2" onChange={this.editFilter}/>Mental Health</label><br/>
                  <label><input type="checkbox" name="Topic 3" data-type="Topics" value="Topic 3" onChange={this.editFilter}/>Other Topic</label><br/>
                </div>
              </div>
              <div className="filters-section">
                <div className="filters-section-title">
                  Tags
                </div>
                <div className="filters-section-options">
                  <label><input type="checkbox" name="Tag 1" data-type="Tags" value="Wait Times" onChange={this.editFilter}/>Wait Times</label><br/>
                  <label><input type="checkbox" name="Tag 2" data-type="Tags" value="Access" onChange={this.editFilter}/>Access</label>
                </div>
              </div>
              <div className="filters-section">
                <div className="filters-section-title">
                  Data Sources
                </div>
                <div className="filters-section-options">
                  <label><input type="checkbox" name="Tag 1" data-type="DataSources" value="Source 1" onChange={this.editFilter}/>Source 1</label><br/>
                  <label><input type="checkbox" name="Tag 2" data-type="DataSources" value="Source 2" onChange={this.editFilter}/>Source 2</label>
                </div>
              </div>
              <div className="filters-section">
                <div className="filters-section-title">
                  Comparators
                </div>
                <div className="filters-section-options">
                  <label><input type="checkbox" name="Tag 1" data-type="DataSources" value="Source 1" onChange={this.editFilter}/>Source 1</label><br/>
                  <label><input type="checkbox" name="Tag 2" data-type="DataSources" value="Source 2" onChange={this.editFilter}/>Source 2</label><br/>
                  <div className="more-button">+ Add More</div>
                </div>
              </div>
            </div>
            </div>
            <div className="dash-right">
                {this.renderDashboardsContainer()}
            </div>
        </div>
    );
  }
};

export default withRouter(IndicatorDashboards)