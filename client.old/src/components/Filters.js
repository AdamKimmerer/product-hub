import React from 'react';
import {withRouter} from 'react-router-dom';

class Filters extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedFilterList: 0,
      filtersList: [
        {
          type: "Topics",
          format: "pills",
          items: ["Access and Wait Times", "Children and Youth", "Community Care", "Emergency Care", "Health Expenditures", "Health Inequality", "Health Spending", "Health System Performance", "Health Workforce", "Hospital Care", "International Comparisons", "Long-term Care", "Mental Health and Addictions", "Organ and Joint Replacements", "Patient Experience", "Patient Outcomes", "Pharmaceuticals", "Population Health", "Quality and Safety", "Residential Care", "Seniors and Aging"]
        },
        {
          type: "Data Sources",
          format: "pills",
          items: ["CANSIM Table 105-0509: Canadian health characteristics","CCHS","CCRS","CORR","DAD","Demography division","HMDB","HMHDB","HWDB","MED-ECHO","NACRS","National Health Expenditure Database","NHEX","NPDB","NPDUIS Database","NRS","OMHRS","ON: STC.","Provincial Wait Times Registry","Statistics Canada"]
        },
        {
          type: "Organizations",
          format: "dropdown",
          items: ["Mount Albert", "Mount Carmel Hospital", "Mount Ida Mews", "Mount Sinai Hospital"]
        }
      ],
      activeBuckets: [
        {
          id: 0,
          count: 2
        }
      ]
    }
  }



  clearFilters = () => {
    this.props.clearFilters();
  }

  renderFilterCount() {
    if (this.props.filters.length > 0) {
      return (
        <div className="filters-count" onClick={this.clearFilters}>
          <span>{this.props.filters.length}</span>
          <i className="fas fa-times"></i>
        </div>
      )
    } else {
      return (
        <div className="filters-icon">
          <i className="fas fa-sliders-h"></i>
        </div>
      )
    }
  }

  handleFilterList = (e) => {
    var key = e.currentTarget.dataset.key;

    this.setState({
      selectedFilterList: key
    })
  }

  renderFilterGroups() {
    var filtersList = this.state.filtersList;
    var selectedFilterList = this.state.selectedFilterList;

    return filtersList.map((item, key) => (
      <div key={key} data-key={key} className={selectedFilterList == key ? "filter-menu active" : "filter-menu"} onClick={this.handleFilterList}>
        <div className="filter-menu-title">
          {item.type}
        </div>
      </div>
    ))
  }

  renderFilters() {
    var filtersList = this.state.filtersList;
    var selectedFilterList = this.state.selectedFilterList;
    var listType = filtersList[selectedFilterList].type;

    if (filtersList[selectedFilterList].items.length > 0) {
      var mapResults = filtersList[selectedFilterList].items.map((item, key) => {
        var name = this.props.filters.find(obj => obj.value == item);

        return (
          <div className="currentFilter">
            <input 
              type="checkbox" 
              data-type={listType} 
              data-bucketid={selectedFilterList}
              id={listType+key} 
              value={item} 
              checked={typeof name!=='undefined' ? "checked" : ""} 
              onChange={this.toggleFilter}
              key={key}
            />
            <label htmlFor={listType+key}>{item}</label>
          </div>
        )
      })

      return mapResults;
    }
  }
  
  toggleFilter = (e) => {
    var type = e.target.dataset.type;
    var value = e.target.value;
    var id = e.target.dataset.bucketid;

    if (type == "Topics") {
      type = "Tags"
    }
    
    if (e.target.checked) {
      this.props.addFilter(type, value, id)
    } else {
      this.props.removeFilter(type, value, id)
    }
  }
  
  render() {
    return (
      <div className="filters">
        <div className="filters-cont">
          {this.renderFilterCount()}
          {this.renderFilterGroups()}
        </div>
        <div className="current-filters-cont">
          {this.renderFilters()}
        </div>
      </div>
    )
  }
}

export default withRouter(Filters)