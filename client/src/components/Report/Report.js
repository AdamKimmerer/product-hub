import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import tableau from "tableau-api";

import "./styles.scss"

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    }
  }

  componentDidMount() {
    this.renderTViz();
  }

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
            src={`https://10ax.online.tableau.com/t/producthubdev142028/authoring/test1/Dashboard1`}
          ></iframe>
        </div>
      );
    } else {
      return "";
    }
  };

  renderTViz = () => {
    var containerDiv = document.getElementById("vizContainer"),
      url = `https://10ax.online.tableau.com/t/producthubdev142028/views/test1/Dashboard1`,
      options = {
        width: "100%",
        height: "100%"
      };

    this.setState({
      currentViz: "Sheet2"
    });
    this.tableauChart = new tableau.Viz(containerDiv, url, options);
  };

  render() {
    return (
      <div className="main">
        {this.showEdit()}
        <div className="report-cont">
          <div className="report-header">
              <img src="https://www.cihi.ca/sites/default/files/image/a34-home-banner-20c.jpg" />
          </div>
          <div className="report-main">
          <div className="report-sections">
              <ul>
                  <li>How dementia impacts Canadians</li>
                  <li>Dementia care across the health system</li>
                  <li>Spotlight on dementia issues</li>
                  <li>Unpaid caregiver challenges and supports</li>
                  <li>Summary</li>
                  <li>Acknowledgements</li>
              </ul>
          </div>
          <div className="report-body">
            <h1 className="report-title">
                How dementia impacts Canadians
            </h1>
                <div className="report-contents">
                    <h2>Growing population of seniors driving up national numbers</h2>
                    <p>The number of Canadian seniors living with Alzheimer’s disease and other forms of dementia is rising steadily, and so is the demand on their caregivers and health care systems across the country.
                    <br/><br/>    
                    The Public Health Agency of Canada (PHAC), which collaborated closely with CIHI and provided key data to help prepare this report, estimates that more than 402,000 seniors, or 7.1% of all people 65 and older, were living with dementia in 2013–2014; two-thirds of those were women. The case definition used to identify Canadian seniors with diagnosed dementia and the underlying methodology were selected to maximize the validity and national comparability of data.
                    <div className="related-viz">
                      <div
                        id="vizContainer"
                        style={{ width: "100%", height: "480px" }}
                      ></div>
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
                    The number of seniors living with dementia is more than 2.5 times the population of Prince Edward Island, and it increased 83% between 2002 and 2013. Over 20 years, it is estimated that the number of Canadians living with dementia would almost double due to the aging population and population growth. Approximately 76,000 new cases of dementia are diagnosed in Canada every year — which is about 14.3 new cases per 1,000 people 65 and older.</p>
                    <p className="quote">There is no cure for Alzheimer’s disease — a disease that has a profound impact on those living with it, as well as their families and friends. … As our population ages, the number of Canadians with Alzheimer’s disease and other forms of dementia is expected to increase. … Together, we can discover ways to help people living with dementia as well as those who care for them.<span>— Ginette Petitpas Taylor, Minister of Health</span></p>
                    <p>The Alzheimer Society of Canada and PHAC estimate that the total health care system costs and out-of-pocket costs of caring for people with dementia are 5.5 times greater than the costs for those without dementia. By 2031, the National Population Health Study of Neurological Conditions projects that the total annual health care costs for Canadians with dementia will be double what it was 2 decades earlier, from $8.3 billion to $16.6 billion.</p>
                    <h3>What is dementia?</h3>
                    <p>Dementia refers to a set of symptoms and signs associated with a progressive deterioration of cognitive functions that affects daily activities. It is caused by various brain diseases and injuries. Alzheimer’s disease is a common cause of dementia, and vascular dementia, frontotemporal dementia and Lewy body dementia are other common types. Among seniors, some studies indicate that mixed dementia is a common cause.
                    <br/><br/>
                    Symptoms of dementia interfere with activities of daily living and may include
                    <ul>
                        <li>Memory loss</li>
                        <li>Judgment and reasoning problems</li>
                        <li>Changes in communication abilities</li>
                        <li>Changes in mood and behaviour</li>
                        <li>Altered visual perception</li>
                    </ul>
                    For example, people living with dementia may have problems keeping track of their belongings, become disoriented, forget to pay bills, have difficulties planning, have difficulties preparing meals, etc.</p>
                    <h3>Who is affected?</h3>
                    <p>Dementia rates are very low among those younger than 65 but increase dramatically with age. The prevalence of dementia more than doubles every 5 years among seniors (from less than 1% in those age 65 to 69 to about 25% in those age 85 and older). Dementia is as prevalent among those 80 and older as heart failure (a chronic condition that develops after the heart becomes damaged or weakened), and is more prevalent than stroke.
                    People in every region of the country are impacted by dementia, though there is provincial and territorial variation in the prevalence of the diagnosed disorder. While the data captures differences in population health status, geographical variations may also reflect differences in drug database coverage and access to dementia drugs across jurisdictions, as well as other differences in data collection methods, coding and classification systems, or clinical and billing practices.</p>
                    <br/><br/>
                    <h2>Related Resources</h2>
                    <hr/>
                    <ul>
                      <li>Public Health Agency of Canada: Dementia</li>
                      <li>Alzheimer Society of Canada</li>
                      <li>Young-onset dementia</li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Report)