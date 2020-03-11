import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ScrollToTopOnMount from './ScrollToTopComponent.js';
import "@babel/polyfill";

class Home extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {}
  };
  
  render() {
    return (
      <div className="main home">
        <ScrollToTopOnMount />
        <div className="content">
        <div className="links-cont">
          <Link to="/list">
            <div className="link">
              Access Data and Reports
            </div>
          </Link>
          <div className="link">
            Submit Data and View Standards
          </div>
          <div className="link">
            News, Events and Education
          </div>
          <div className="link">
            About CIHI
          </div>
        </div>
        <div className="main-image">
          <img src="https://www.cihi.ca/sites/default/files/image/21469-docs-home-page-banner.jpg"/>
          <div className="main-image-text">
            Canadian family doctors providing better access to care but lagging in other areas. Find out more.
          </div>
        </div>
        <div className="full-width">
          <div className="headers">
            Featured Story
          </div>
          <div className="featured">
            <div className="content">
              <div className="title">
                Unintended harms: How CIHI is helping Canadians receive safer care
              </div>
              <div className="body">
                Health systems across the country continuously strive to make Canadian health care safer. Learn how we help these efforts through an interview with Yana Gurevich, manager of Health Indicators and Client Support, and Mélanie Josée Davidson, director of Health System Performance.
              </div>
            </div>
            <div className="image">
              <img src="https://www.cihi.ca/sites/default/files/image/featured-story-oct-2019-image_0.jpg"/>
            </div>
          </div>
        </div>
        <div className="two-thirds-width">
          <div className="headers">
            Latest Releases
          </div>
          <div className="release-card">
            <div className="title">
              Giving birth, lung and heart problems among top reasons for hospitalization
            </div>
            <div className="date">
              April 25, 2019
            </div>
            <div className="body">
              New data shows that giving birth, lung and heart problems were among the top reasons for hospitalization in 2017–2018.  Learn more in this media release. 
            </div>
          </div>
          <div className="release-card">
            <div className="title">
              New data highlights importance of communication during hospital stays
            </div>
            <div className="date">
              April 17, 2019
            </div>
            <div className="body">
              For the first time, CIHI has released patient experience survey data, shedding light on how Canadians feel about care received during a hospital stay.
            </div>
          </div>
          <div className="headers">
            Data Submission Deadlines
          </div>
          <table className="views-table cols-4">
         <thead>
      <tr>
                  <th className="views-field views-field-field-data-holding" scope="col">
            <a href="/en/home?order=field_data_holding&amp;sort=asc" title="sort by Data Holding" className="active" aria-label="Sort by Data Holding" aria-labelby="sort by Data Holding">Data Holding</a>          </th>
                  <th className="views-field views-field-field-period" scope="col">
            Reporting Period          </th>
                  <th className="views-field views-field-field-final active" scope="col" aria-sort="ascending">
            <a href="/en/home?order=field_final&amp;sort=desc" title="sort by Deadline" className="active" aria-label="Sort by Deadline" aria-labelby="sort by Deadline">Deadline<img typeof="foaf:Image" src="https://www.cihi.ca/misc/arrow-desc.png" width="13" height="13" alt="sort descending" title="sort descending" role="img"/></a>          </th>
                  <th className="views-field views-field-field-updated" scope="col">
            Data Refreshed          </th>
              </tr>
    </thead>
    <tbody>
          <tr className="odd views-row-first">
                  <td className="views-field views-field-field-data-holding">
            NRS          </td>
                  <td className="views-field views-field-field-period">
            January 1 to March 31, 2019 (Quarter 4)          </td>
                  <td className="views-field views-field-field-final active">
            <span className="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-15T09:00:00-04:00">May 15, 2019</span>          </td>
                  <td className="views-field views-field-field-updated">
            May 27, 2019          </td>
              </tr>
          <tr className="even">
                  <td className="views-field views-field-field-data-holding">
            CJRR          </td>
                  <td className="views-field views-field-field-period">
            January 1 to March 31, 2019 (Quarter 4)          </td>
                  <td className="views-field views-field-field-final active">
            <span className="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-31T00:00:00-04:00">May 31, 2019</span>          </td>
                  <td className="views-field views-field-field-updated">
            Not applicable          </td>
              </tr>
          <tr className="odd">
                  <td className="views-field views-field-field-data-holding">
            NACRS (Ontario)          </td>
                  <td className="views-field views-field-field-period">
            2018–2019          </td>
                  <td className="views-field views-field-field-final active">
            <span className="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-31T09:30:00-04:00">May 31, 2019</span>          </td>
                  <td className="views-field views-field-field-updated">
            Not applicable          </td>
              </tr>
          <tr className="even views-row-last">
                  <td className="views-field views-field-field-data-holding">
            DAD (Ontario)          </td>
                  <td className="views-field views-field-field-period">
            2018–2019          </td>
                  <td className="views-field views-field-field-final active">
            <span className="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2019-05-31T09:30:00-04:00">May 31, 2019</span>          </td>
                  <td className="views-field views-field-field-updated">
            Not applicable          </td>
              </tr>
      </tbody>
</table>
          <div className="button-full">
            See all Deadlines
          </div>
        </div>
        <div className="one-third-width">
          <div className="headers-alt">
            Spotlight
          </div>
          <div className="spotlight-image">
            <img src="https://www.cihi.ca/sites/default/files/image/21160-spotlight_yhs-en.jpg"/>
          </div>
          <div className="featured-card">
            <div className="title">
              Featured Products
            </div>
            <ul>
              <li>CIHI’s Analytical Plan, 2018 to 2020</li>
              <li>CIHI’s Annual Report, 2017–2018: Data Driven, People Powered</li>
              <li>CIHI's Strategic Plan, 2016 to 2021</li>
              <li>National Health Expenditure Trends, 1975 to 2018</li>
              <li>Products and Services Guide, 2019—2020</li>
            </ul>
          </div>
          <div className="featured-card">
            <div className="title">
              Subscribe to News and Upcoming Releases
            </div>
            <div className="button-full">
              Subscribe
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  };

}


export default withRouter(Home)