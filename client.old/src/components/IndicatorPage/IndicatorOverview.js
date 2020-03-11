import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class IndicatorOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      selected: "0"
    }
  }

  componentDidMount() {
    //this.renderTViz();
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
          key={key}
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

  renderQViz() {
    var selected = this.state.selected;

    switch(selected) {
      case "0":
        return "https://cihi.us.qlikcloud.com/single/?appid=067b97d8-24da-408a-b115-b606fcf934eb&sheet=9d14d748-f9a8-4cf0-a7e8-0af6147e6d02&theme=tableau&opt=ctxmenu,currsel&select=$::Data%20year,2016%E2%80%932017";
        break;
      case "1":
        return "https://cihi.us.qlikcloud.com/single/?appid=067b97d8-24da-408a-b115-b606fcf934eb&sheet=e6eea8ae-1213-4dd8-a811-ee7116da42ac&opt=ctxmenu,currsel&select=clearall";
        break;
      default:
        return "No Selection";
    }
  }

  changeTViz = e => {
    var selected = e.currentTarget.attributes.getNamedItem("data-id").value;

    this.setState({
      selected
    });
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
            src={`https://cihi.us.qlikcloud.com/sense/app/067b97d8-24da-408a-b115-b606fcf934eb/sheet/9d14d748-f9a8-4cf0-a7e8-0af6147e6d02/state/analysis`}
          ></iframe>
        </div>
      );
    } else {
      return "";
    }
  };

  // renderTViz = () => {
  //   var containerDiv = document.getElementById("vizContainer"),
  //     url = `https://10ax.online.tableau.com/t/producthubdev142028/views/test1/Dashboard1`,
  //     options = {
  //       width: "100%",
  //       height: "100%",
  //       hideTabs: false
  //     };

  //   this.setState({
  //     currentViz: "Sheet2"
  //   });
  //   this.tableauChart = new tableau.Viz(containerDiv, url, options);
  // };

  handleToggle = () => {
    this.props.toggleMetaHandler();
  };

  render() {
    return (
        <div>
        <div className="indicator-body content-cont">
        {this.showEdit()}
        <div className="leftish">
          <div className="rightish-sec">
            <div className="section-header">Visualizations</div>

            <div className="related-viz-items-cont">
              <div
                data-id="0"
                onClick={this.changeTViz}
                className="related-viz-item"
              >
                <div
                  className="related-viz-item-image"
                  style={{
                    backgroundImage: "url(https://imgur.com/4LSsU7V.png)",
                    backgroundPosition: "bottom"
                  }}
                ></div>
                <div className="related-viz-item-title">
                  Hospital Deaths by Province/Territory
                </div>
              </div>
              <div
                data-id="1"
                onClick={this.changeTViz}
                className="related-viz-item"
              >
                <div
                  className="related-viz-item-image"
                  style={{
                    backgroundImage: "url(https://imgur.com/eOYjl7n.png)",
                    backgroundPosition: "bottom"
                  }}
                ></div>
                <div className="related-viz-item-title">
                  Hospital Deaths by Province/Territory - 5 Year
                </div>
              </div>
            </div>
            <div className="related-viz">
              <div
                id="vizContainer"
                style={{ width: "100%", height: "700px" }}
              >
                <iframe 
                  src={this.renderQViz()} 
                  style={{"border":"none","width":"100%","height":"100%"}}
                ></iframe>
              </div>
              <div className="viz-actions">
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
};

export default withRouter(IndicatorOverview)