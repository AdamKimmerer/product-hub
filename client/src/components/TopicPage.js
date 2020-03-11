import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Chart from 'chart.js'

import PageTitle from './PageTitle.js';
import ScrollToTopOnMount from './ScrollToTopComponent.js';

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: [],
      currentViz: "0",
      vizTitle: "Median (or 50th percentile) wait in days - Prov vs Canada - 2017"
    }
    
    var myChart = {};
  }
  
  handleToggle = () => {
    this.props.toggleMetaHandler();
  }
  
  toggleBookmark = () => {
    this.props.toggleBookmark();  
  } 
  
  componentDidMount() {    
    axios.get('https://product-hub-cihi.firebaseio.com/Data2.json')
      .then((response) => {
        this.setState({
          data: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })

    // axios.get('./data/data.json')
    //   .then((response) => {
    //     this.setState({
    //       data: response.data
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    
    let canvas = document.getElementById("myChart");
    canvas.style.width ='100%';
    canvas.style.height='75%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.getContext('2d');
    
    this.myChart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: ["Alta.", "B.C.", "Man.", "N.B.", "Nfld.", "N.S.", "Ont.", "P.E.I.", "Que.", "Sask.", "Can"],
        datasets: [
          {
            label: "Median (or 50th percentile) wait in days",
            data: [121, 133, 169, 138, 81, 179, 82, 182, 93, 98, 104],
            backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        responsive: false
      }
    });
  }

  renderProvinces = () => {
    let data = this.state.data;
    
    if (data) {
      return this.state.data.map(set =>
        <option value={set.region}>{set.region}</option>
      )  
    }
    return "";
  }
    
  updateData = (chart, labels, data) => {    
    var newData = [];
    var newLabels = [];

    for (var i = 0; i < 5; i++) {
      newData.push(data[i]);
    }
    for (var j = 0; j < 5; j++) {
      newLabels.push(labels[j]);
    }
    
    chart.data.datasets[0].data = newData.reverse();
    chart.data.labels = newLabels.reverse();

    chart.update();
  }
  
  renderCanada = (chart, labels, data) => {
    chart.data.datasets[0].data = [];
    chart.data.labels = [];

    for (var i = 0; i < this.state.data; i++) {
      chart.data.datasets[0].data.push(data[i]);
    }
    for (var j = 0; j < 5; j++) {
      chart.data.labels.push(labels[j]);
    }

    chart.update();
  }
  
  changeViz = (e) => {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var chart = this.myChart;
    var canvas = document.getElementById("myChart");

    if (id !== this.state.currentViz) {

    this.setState({
      currentViz: id
    })

    var defaultOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false
                  }
                }
              ]
            },
            responsive: false
          }

    var beginZeroOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  }
                }
              ]
            },
            responsive: false
          }

    var percentOptions = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              ]
            },
            responsive: false
          }
    
    switch(id) {
      case "0":
        chart.destroy();
        
        this.myChart = new Chart(canvas, {
          type: "bar",
      data: {
        labels: ["Alta.", "B.C.", "Man.", "N.B.", "Nfld.", "N.S.", "Ont.", "P.E.I.", "Que.", "Sask.", "Can"],
        datasets: [
          {
            label: "Median (or 50th percentile) wait in days",
            data: [121, 133, 169, 138, 81, 179, 82, 182, 93, 98, 104],
            backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1
          }
        ]
      },
      options: beginZeroOptions
    });
        
        this.setState({
          vizTitle: title
        })
        break;
      case "1":
        chart.destroy();
        
        this.myChart = new Chart(canvas, {
          type: "line",
          data: {
            labels: ["2013", "2014", "2015", "2016", "2017"],
            datasets: [
              {
                label: "Hip Replacement Volume - 5-Year Trend",
                data: [1865, 1890, 1895, 2043, 2024],
                backgroundColor: [
                  "rgba(255, 99, 132, 0)"
                ],
                borderColor: [
                  "rgba(255,99,132,1)"
                ],
                borderWidth: 2
              }
            ]
          },
          options: defaultOptions
        });
        
        this.setState({
          vizTitle: title
        })
        break;
      case "2":
        chart.destroy();
        
        this.myChart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Canada", "Chile", "Estonia", "Hungary", "Italy", "Portugal", "Spain", "Sweden"],
            datasets: [
              {
                label: "Waiting times from specialist assessment to treatment: Median (days)",
                data: [104, 240, 286, 55, 50, 110.7, 130, 75],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                  "rgba(68,68,68,.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                  "rgba(68,68,68,1)",
                ],
                borderWidth: 1
              }
            ]
          },
          options: beginZeroOptions
        });
        
        this.setState({
          vizTitle: title
        })
        break;
      case "3":
        chart.destroy();
        
        this.myChart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Alta.", "B.C.", "Man.", "N.B.", "Nfld.", "N.S.", "Ont.", "P.E.I.", "Que.", "Sask.", "Can"],
            datasets: [
              {
                label: "% Meeting Benchmark ",
                data: [73, 62, 53, 61, 84, 51, 83, 50, 83, 76, 76],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255,99,132,1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1
              },
              {
                label: "90% Benchmark",
                data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
                backgroundColor: [
                  "rgba(255, 99, 132, 0)"
                ],
                borderColor: [
                  "rgba(68,68,68,.4)"
                ],
                borderWidth: 2,
                type: "line"
              }
            ]
          },
          options: percentOptions
        });
        
        this.setState({
          vizTitle: title
        })
        break;
      default:
        console.log("error")
        break;
    }
    }
  }
    
  handleRegion = (e) => {
    var newRegion = e.target.value;
    var id = this.state.currentViz;
    
    switch(id) {
      case "1":
        var newData = this.state.data.find(
          set => set.region === newRegion
        );

        this.updateData(this.myChart, newData.labels, newData.data);
        break;
      case "1":
        break;
      default:
        alert("No selection");
        break;
    }
  }

  renderCompare() {
    if (this.state.currentViz === "1") {
      return (
        <div className="viz-compare">
          <label>
            Provinces
            <select onChange={this.handleRegion}>
              {this.renderProvinces()}
            </select>
          </label>
        </div>
      )
    } else {
      return (
        <div className="change-viz-type">
          <div className="change-viz-item active">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="change-viz-item">
            <i className="fas fa-globe-americas"></i>
          </div>
        </div>
      )
    }
   }

  renderDataSources() {
    var dataSources = this.props.indicator["Data Sources"];

    if (dataSources && dataSources.length > 0) {
      return dataSources.map((source, key) => (
        <div className="database" data-type="Data Sources" data-val={source} onClick={this.navigateFilter}>
          <i className="fas fa-database"></i>
            <div>
              <div className="database-name">
                {source}{" "}
              <span className="database-updated">January 13, 2019</span>
            </div>
            <div className="database-sub">
              Next Update: February 7, 2019
            </div>
          </div>
        </div>
      ))
    }
  }

  navigateFilter = (e) => {
    var type = e.currentTarget.dataset.type;
    var val = e.currentTarget.dataset.val;

    if (this.props.history.location.pathname === "/indicator") {
      this.props.clearFilters(type, val);

      this.props.history.push("/list");
    }
  }
  
  render() {
    return (
    <div className="main content">
        <ScrollToTopOnMount />
      <PageTitle
        toggleBookmark={this.props.toggleBookmark}
        type="Topic"
        name="Long-term Care"
        desc="These indicators provide data on wait times for admission to long-term care homes, the quality of resident care, and other measures of long-term care home performance in Ontario."
      />
      <div className="subnav">
        <div className="subnav-item selected">
          Overview
        </div>
        <div className="subnav-item">
          Dashboards
        </div>
        <div className="subnav-item">
          Reports
        </div>
        <div className="subnav-item">
          Indicators
        </div>
        <div className="subnav-item">
          Media
        </div>
      </div>
      <div className="indicator-body content-cont">
        <div className="leftish">
          <div className="rightish-sec">
            <div className="section-header">Visualizations</div>
            
            <div className="related-viz-items-cont">
              <div data-id="0" onClick={this.changeViz} className="related-viz-item" data-title="Median (or 50th percentile) wait in days - Prov vs Canada - 2017">
                <div className="related-viz-item-image" style={{backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/wait-graph-1.png)"}}>
                </div>
                <div className="related-viz-item-title">
                  Median (or 50th percentile) wait in days - Prov vs Canada - 2017
                </div>
              </div>
              <div data-id="1" onClick={this.changeViz} className="related-viz-item" data-title="Hip Replacement Volume - 5-Year Trend">
                <div className="related-viz-item-image" style={{backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/wait-graph-2.png)", backgroundPosition: "bottom"}}>
                </div>
                <div className="related-viz-item-title">
                  Hip Replacement Volume - 5-Year Trend
                </div>
              </div>
              <div data-id="2" onClick={this.changeViz} className="related-viz-item" data-title="Median wait in days - Canada vs International">
                <div className="related-viz-item-image" style={{backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/wait-graph-3.png)", backgroundPosition: "bottom"}}>
                </div>
                <div className="related-viz-item-title">
                  Median wait in days - Canada vs International
                </div>
              </div>
              <div data-id="3" onClick={this.changeViz} className="related-viz-item" data-title="% Meeting Benchmark - Prov vs Canada">
                <div className="related-viz-item-image" style={{backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/wait-graph-4.png)", backgroundPosition: "bottom"}}>
                </div>
                <div className="related-viz-item-title">
                  % Meeting Benchmark - Prov vs Canada
                </div>
              </div>
            </div>
            <div className="related-viz"> 
              <div className="section-header">{this.state.vizTitle}</div>
              <canvas id="myChart" width="100%" height="100%"></canvas>
              <div className="viz-actions">
                <div>
                  {this.renderCompare()}
                </div>
                <div>
                  <div className="viz-button">
                    Export Data
                  </div>
                  <div className="viz-button">
                    Export Graph
                  </div>
                  <div className="viz-button">
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
                <div className="tools-name">
                  Health System Performance  
                </div>
                <div className="tools-desc">
                  These interactive tools will help you learn more about your health system and the...
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
                <div className="tools-name">
                  International Comparisons
                </div>
                <div className="tools-desc">
                  International comparisons provide provincial governments with a broader context for...
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
          <div className="report-list rightish-sec">
            <div className="section-header small">Reports</div>
            <div>
              <div className="report">
                <div className="report-img">
                  <img src="https://unsplash.it/100/100" />
                </div>
                <div>
                  <div className="report-title">
                    Trends in Long Term Care
                  </div>
                  <div className="report-desc">
                    Lorem ipsum dolor sit amet consectitor
                  </div>
                  <div className="report-user">
                    <div className="report-user-img">
                      <img src="https://unsplash.it/30/30" />
                    </div>
                    <div>
                      <div className="report-user-name">
                        Boris Ginsberg
                      </div>
                      <div className="report-user-role">
                        Analyst
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="report">
                <div className="report-img">
                  <img src="https://unsplash.it/100/101" />
                </div>
                <div>
                  <div className="report-title">
                    Onboarding for Long-term Care Research
                  </div>
                  <div className="report-desc">
                    Lorem ipsum dolor sit amet consectitor
                  </div>
                  <div className="report-user">
                    <div className="report-user-img">
                      <img src="https://unsplash.it/30/31" />
                    </div>
                    <div>
                      <div className="report-user-name">
                        Monzer Sinno
                      </div>
                      <div className="report-user-role">
                        Manager
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="report">
                <div className="report-img">
                  <img src="https://unsplash.it/101/100" />
                </div>
                <div>
                  <div className="report-title">
                    Public Release - Long-term Care Performance
                  </div>
                  <div className="report-desc">
                    Lorem ipsum dolor sit amet consectitor
                  </div>
                  <div className="report-user">
                    <div className="report-user-img">
                      <img src="https://unsplash.it/31/30" />
                    </div>
                    <div>
                      <div className="report-user-name">
                        Carrie Morgan
                      </div>
                      <div className="report-user-role">
                        Analyst
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="related-topics rightish-sec">
            <div className="section-header small">Related Topics</div>
            <div>
              <div className="related-topic">
                Access and Wait Times
              </div>
              <div className="related-topic">
                Health Expenditures
              </div>
              <div className="related-topic">
                Health Spending
              </div>
              <div className="related-topic">
                Health System Performance
              </div>
              <div className="related-topic">
                Organ and Joint Replacements
              </div>
              <div className="related-topic">
                Patient Experience
              </div>
              <div className="related-topic">
                Residential Care
              </div>
              <div className="related-topic">
                Seniors and Aging
              </div>
            </div>
          </div>
          <div className="related-ind-list rightish-sec">
            <div className="section-header small">Related Indicators</div>
            <div className="related-ind">
              <div className="related-ind-name">
                Hip Fracture Surgery within 48 Hours
              </div>
              <div className="related-ind-desc">
                The risk-adjusted proportion of hip fractures that were surgically treated...
              </div>
            </div>
            <div className="related-ind">
              <div className="related-ind-name">
                Patient Flow for Hip Replacement
              </div>
              <div className="related-ind-desc">
                This indicator is a ratio, calculated as the number of separations (discharges and deaths) from acute...
              </div>
            </div>
            <div className="related-ind">
              <div className="related-ind-name">
                Hip Replacement Rate
              </div>
              <div className="related-ind-desc">
                This indicator measures the age-standardized hospitalization rate for hip replacement procedures...
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
                <div className="media-item-type">
                  Report
                </div>
                <div className="media-item-name">
                  Hip and Knee Replacements in Canada: CJRR Annual Report
                </div>
                <div className="media-item-desc">
                  The number of Canadians having joint replacement and revision surgeries has increased over the past...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/a34-home-banner-20c.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">
                  Media Release
                </div>
                <div className="media-item-name">
                  Repeat Hip and Knee Replacements in Canada cost $130 Million...
                </div>
                <div className="media-item-desc">
                  While the demand for hip and knee replacement surgeries continues to...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/2019-01-23_14-46-02.png" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">
                  PDF
                </div>
                <div className="media-item-name">
                  CJRR Information Sheets
                </div>
                <div className="media-item-desc">
                  The Canadian Joint Replacement Registry (CJRR) is a panCanadian information system held by...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/photo-1478476868527-002ae3f3e159.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">
                  Data Set
                </div>
                <div className="media-item-name">
                  CJRR AIBs
                </div>
                <div className="media-item-desc">
                  Analysis in Brief provide preliminary descriptive analysis of surgical and implant data submitted...
                </div>
              </div>
            </div>
            <div className="media-item">
              <div className="media-item-image">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/photo-1533612608997-212b06408bb9.jpg" />
              </div>
              <div className="media-item-content">
                <div className="media-item-type">
                  Media Release
                </div>
                <div className="media-item-name">
                  Media Release on wait times for priority areas
                </div>
                <div className="media-item-desc">
                   Fewer Canadians received surgery for cataracts and hip and knee replacements within the recomme...
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
  }
};

export default withRouter(TopicPage)