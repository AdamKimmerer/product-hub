import React from "react";
import axios from "axios";
import { BrowserRouter, Link, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import tableau from "tableau-api";

import './styles.scss';

import PageTitle from "../PageTitle.js";
import ScrollToTopOnMount from "../ScrollToTopComponent.js";
import IndicatorOverview from "./IndicatorOverview.js";
import IndicatorDashboards from "./IndicatorDashboards.js";

let Router = BrowserRouter;

class IndicatorBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentViz: "Sheet2",
      vizTitle:
        "Median (or 50th percentile) wait in days - Prov vs Canada - 2017"
    };

    var myChart = {};
  }

  toggleBookmark = () => {
    this.props.toggleBookmark();
  };

  componentDidMount() {
    axios
      .get("https://product-hub-cihi.firebaseio.com/Data2.json")
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    //this.renderTViz();

    // axios.get('./data/data.json')
    //   .then((response) => {
    //     this.setState({
    //       data: response.data
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  navigateFilter = e => {
    var type = e.currentTarget.dataset.type;
    var val = e.currentTarget.dataset.val;

    if (this.props.history.location.pathname === "/indicator") {
      this.props.clearFilters(type, val);

      this.props.history.push("/list");
    }
  };

  // renderTViz = () => {
  //   var containerDiv = document.getElementById("vizContainer"),
  //     url = `https://10ax.online.tableau.com/t/producthubdev142028/views/test1/Sheet2`,
  //     options = {
  //       width: "100%",
  //       height: "100%"
  //     };

  //   this.setState({
  //     currentViz: "Sheet2"
  //   });
  //   this.tableauChart = new tableau.Viz(containerDiv, url, options);
  // };

  changeTViz = e => {
    var currentViz = e.currentTarget.attributes.getNamedItem("data-name").value;

    this.setState({
      currentViz
    });

    var containerDiv = document.getElementById("vizContainer"),
      //url = `https://10ax.online.tableau.com/t/producthubdev142028/views/test1/${currentViz}`,
      url = `https://10ax.online.tableau.com/t/producthubdev142028/trusted/${this.props.token}/views/test1/${currentViz}`,
      options = {
        width: "100%",
        height: "100%"
      };

    this.tableauChart.dispose();
    this.tableauChart = new tableau.Viz(containerDiv, url, options);
  };

  exportTViz = () => {
    this.tableauChart.showExportPDFDialog();
  };

  downloadTViz = () => {
    this.tableauChart.showExportDataDialog();
  };

  render() {
    const { path, url } = this.props.match;

    var location = this.props.location.pathname
    var currentLoc = location.split("/").slice(-1)[0];

    return (
      <div className="main content">
        <ScrollToTopOnMount />
        <PageTitle
          type="Indicator"
          name={this.props.indicator.Name}
          tags={this.props.indicator.Tags}
          desc={this.props.indicator.Description}
          toggleBookmark={this.props.toggleBookmark}
          clearfilters={this.props.clearFilters}
          addFilter={this.props.addFilter}
          navigateFilter={this.navigateFilter}
        />
        <div className="subnav">
          <Link to="/indicator" className={currentLoc == "indicator" ? "subnav-item selected" : "subnav-item"}>Overview</Link>
          <Link to={`${path}/dashboards`} className={currentLoc == "dashboards" ? "subnav-item selected" : "subnav-item"}>Dashboards</Link>
          <Link to={`${path}/reports`} className={currentLoc == "reports" ? "subnav-item selected" : "subnav-item"}>Reports</Link>
          <div className="subnav-item">Indicators</div>
          <div className="subnav-item">Media</div>
        </div>
          <Switch>
            <Route path={`${path}/dashboards`}>
              <IndicatorDashboards/>
            </Route>
            <Route path={`${path}/reports`}>
              <h1 style={{textAlign: "center"}}>This is for Reports</h1>
            </Route>
            <Route exact path={`${path}`}>
              <IndicatorOverview 
                indicator = {this.props.indicator}
                toggleMetaHandler={this.props.toggleMetaHandler}
              />
            </Route>
          </Switch>
      </div>
    );
  }
}

export default withRouter(IndicatorBody);
