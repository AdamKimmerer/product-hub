import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleTagNav = (e) => {
    var tagVal = e.target.dataset.val;
    
    this.props.navigateFilter(e);
  }

  renderTags() {
    if (this.props.tags && this.props.tags.length > 0) {
      return this.props.tags.map((tag, key) => 
        <Link to="/topic" key={key}>
          <div data-type="Tags" className="tag" data-val={tag}>
            {tag}
          </div>
        </Link>
      )
    }
  }

  render() {
    return (
      <div className="title-cont">
        <div className="buttons-cont">
          <div className="button" onClick={this.props.toggleBookmark}>Add to Library</div>
        </div>
        <div className="page-type">{this.props.type}</div>
        <div className="page-name">{this.props.name}</div>
        <div className="tags-cont">{this.renderTags()}</div>
        <div className="description">{this.props.desc}</div>
      </div>
    );
  }
};

export default withRouter(PageTitle)