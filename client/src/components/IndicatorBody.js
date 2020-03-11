import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import PageTitle from "./PageTitle.js";
import ScrollToTopOnMount from "./ScrollToTopComponent.js";

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

  handleToggle = () => {
    this.props.toggleMetaHandler();
  };

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

    this.renderTViz();

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

  renderDataSources() {
    var dataSources = this.props.indicator["Data Sources"];

    if (dataSources && dataSources.length > 0) {
      return dataSources.map((source, key) => (
        <div
          className="database"
          data-type="Data Sources"
          data-val={source}
          onClick={this.navigateFilter}
        >
          <i className="fas fa-database"></i>
          <div>
            <div className="database-name">
              {source}{" "}
              <span className="database-updated">January 13, 2019</span>
            </div>
            <div className="database-sub">Next Update: February 7, 2019</div>
          </div>
        </div>
      ));
    }
  }

  navigateFilter = e => {
    var type = e.currentTarget.dataset.type;
    var val = e.currentTarget.dataset.val;

    if (this.props.history.location.pathname === "/indicator") {
      this.props.clearFilters(type, val);

      this.props.history.push("/list");
    }
  };

  renderTViz = () => {
    var containerDiv = document.getElementById("vizContainer"),
      url = `https://10ax.online.tableau.com/t/producthubdev142028/views/test1/Sheet2`,
      options = {
        width: "100%",
        height: "100%"
      };

    this.setState({
      currentViz: "Sheet2"
    });
    this.tableauChart = new tableau.Viz(containerDiv, url, options);
  };

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

  toggleEdit = () => {
    this.setState(
      {
        editing: !this.state.editing
      },
      () => {
        console.log(this.state.editing);
      }
    );
  };

  showEdit = () => {
    if (this.state.editing) {
      return (
        <div className="edit-cont">
          <div onClick={this.toggleEdit} className="edit-cont-close">
            <i className="fas fa-times"></i>
          </div>
          <iframe
            src={`https://10ax.online.tableau.com/t/producthubdev142028/authoring/test1/${this.state.currentViz}`}
          ></iframe>
        </div>
      );
    } else {
      return "";
    }
  };

  render() {
    const { path } = this.props.match;
    console.log(path);

    return (
      <div className="main content">
        <ScrollToTopOnMount />
        {this.showEdit()}
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
          <div className="subnav-item selected">Overview</div>
          <div className="subnav-item">Dashboards</div>
          <div className="subnav-item">Reports</div>
          <div className="subnav-item">Indicators</div>
          <div className="subnav-item">Media</div>
        </div>
        <div className="indicator-body content-cont">
          <div className="leftish">
            <div className="rightish-sec">
              <div className="section-header">Visualizations</div>

              <div className="related-viz-items-cont">
                <div
                  data-id="1"
                  onClick={this.changeTViz}
                  data-name="Sheet2"
                  className="related-viz-item"
                  data-title="Hip Replacement Volume - 5-Year Trend"
                >
                  <div
                    className="related-viz-item-image"
                    style={{
                      backgroundImage: "url(https://imgur.com/nb8Uss1.png)",
                      backgroundPosition: "bottom"
                    }}
                  ></div>
                  <div className="related-viz-item-title">
                    Hip Replacement Volume - 5-Year Trend
                  </div>
                </div>
                <div
                  data-id="2"
                  onClick={this.changeTViz}
                  data-name="Sheet3"
                  className="related-viz-item"
                  data-title="Median wait in days - Canada vs International"
                >
                  <div
                    className="related-viz-item-image"
                    style={{
                      backgroundImage: "url(https://imgur.com/ehZXh03.png)",
                      backgroundPosition: "bottom"
                    }}
                  ></div>
                  <div className="related-viz-item-title">
                    Median wait in days - Canada vs International
                  </div>
                </div>
              </div>
              <div className="related-viz">
                <div
                  id="vizContainer"
                  style={{ width: "100%", height: "480px" }}
                ></div>
                <div className="viz-actions">
                  <div>
                    <div className="viz-button" onClick={this.downloadTViz}>
                      Export Data
                    </div>
                    <div className="viz-button" onClick={this.exportTViz}>
                      Export Graph
                    </div>
                    <div className="viz-button" onClick={this.toggleEdit}>
                      Go Deep <i className="fas fa-lock"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightish-sec">
              <div className="section-header">Tools</div>
              <div className="tools-item">
                <div className="tools-logo">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/HSP_Landing_Icons_green.png" />
                </div>
                <div className="tools-content">
                  <div className="tools-name">Health System Performance</div>
                  <div className="tools-desc">
                    These interactive tools will help you learn more about your
                    health system and the...
                  </div>
                </div>
                <div className="tools-images">
                  <div className="tools-image">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-22-50.png" />
                  </div>
                  <div className="tools-image">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-23-04.png" />
                  </div>
                </div>
              </div>
              <div className="tools-item">
                <div className="tools-logo">
                  <img src="images/oecd-logo.png" />
                </div>
                <div className="tools-content">
                  <div className="tools-name">International Comparisons</div>
                  <div className="tools-desc">
                    International comparisons provide provincial governments
                    with a broader context for...
                  </div>
                </div>
                <div className="tools-images">
                  <div className="tools-image">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-22-50.png" />
                  </div>
                  <div className="tools-image">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-23-04.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightish">
            <div className="meta-cta rightish-sec" onClick={this.handleToggle}>
              View Metadata
            </div>
            <div className="database-list rightish-sec">
              <div className="section-header small">Data Sources</div>
              <div>{this.renderDataSources()}</div>
              <div className="see-more">See More...</div>
            </div>
            <div className="related-ind-list rightish-sec">
              <div className="section-header small">Related Indicators</div>
              <div className="related-ind">
                <div className="related-ind-name">
                  Hip Fracture Surgery within 48 Hours
                </div>
                <div className="related-ind-desc">
                  The risk-adjusted proportion of hip fractures that were
                  surgically treated...
                </div>
              </div>
              <div className="related-ind">
                <div className="related-ind-name">
                  Patient Flow for Hip Replacement
                </div>
                <div className="related-ind-desc">
                  This indicator is a ratio, calculated as the number of
                  separations (discharges and deaths) from acute...
                </div>
              </div>
              <div className="related-ind">
                <div className="related-ind-name">Hip Replacement Rate</div>
                <div className="related-ind-desc">
                  This indicator measures the age-standardized hospitalization
                  rate for hip replacement procedures...
                </div>
              </div>
              <div className="see-more">See More...</div>
            </div>
          </div>
        </div>
        <div className="full-width content-cont">
          <div className="section-header">Media</div>
          <div className="media-items">
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-43-19.png" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">Report</div>
                <div className="media-item-name">
                  Hip and Knee Replacements in Canada: CJRR Annual Report
                </div>
                <div className="media-item-desc">
                  The number of Canadians having joint replacement and revision
                  surgeries has increased over the past...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/a34-home-banner-20c.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">Media Release</div>
                <div className="media-item-name">
                  Repeat Hip and Knee Replacements in Canada cost $130
                  Million...
                </div>
                <div className="media-item-desc">
                  While the demand for hip and knee replacement surgeries
                  continues to...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-46-02.png" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">PDF</div>
                <div className="media-item-name">CJRR Information Sheets</div>
                <div className="media-item-desc">
                  The Canadian Joint Replacement Registry (CJRR) is a
                  panCanadian information system held by...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/photo-1478476868527-002ae3f3e159.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">Data Set</div>
                <div className="media-item-name">CJRR AIBs</div>
                <div className="media-item-desc">
                  Analysis in Brief provide preliminary descriptive analysis of
                  surgical and implant data submitted...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/photo-1533612608997-212b06408bb9.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">Media Release</div>
                <div className="media-item-name">
                  Media Release on wait times for priority areas
                </div>
                <div className="media-item-desc">
                  Fewer Canadians received surgery for cataracts and hip and
                  knee replacements within the recomme...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(IndicatorBody);
