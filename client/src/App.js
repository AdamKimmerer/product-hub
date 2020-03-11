import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import "@babel/polyfill";

import './utility/find.js';

import Header from './components/Header.js';
import IndicatorBody from './components/IndicatorPage/IndicatorBody.js';
import IndicatorList from './components/IndicatorList.js';
import UserLibrary from './components/UserLibrary.js';
import PageTitle from './components/PageTitle.js';
import MetaData from './components/Metadata.js';
import ScrollToTopOnMount from './components/ScrollToTopComponent.js';
import Login from './components/Login.js';
import Setup from './components/Setup.js';
import Home from './components/Home.js';
import TopicPage from './components/TopicPage.js';
import Tester from './components/Tester.js';
import Report from './components/Report/Report.js';

import './App.scss';

let Router = BrowserRouter;

class AddFolder extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      newName: ''
    }
  }
  
  handleChange = e => {
    this.setState({
      newName: e.target.value
    })
  }
  
  handleSubmit = () => {
    var newName = this.state.newName;
    
    if (newName.length > 0) {
      this.props.addFolder(newName);
      this.props.toggleAddHandler();
      this.props.toggleToast("Folder added!")
    } else {
      alert("no text!")
    }
  }
  
  handleClose = () => {
    this.props.toggleAddHandler();
  }
  
  render() {
    return (
      <div className="add-folder-cont">
        <div className="add-folder-modal">
          <div className="add-folder-title">
            Add Folder to {this.props.selectedFolder.name}
          </div>
          <input onChange={this.handleChange} type="text" placeholder="Add name" ref="addFolderInput"/>
          <div className="add-folder-submit-cont" >
            <button className="add-folder-cancel" onClick={this.handleClose}>Cancel</button>
            <button className="add-folder-submit" onClick={this.handleSubmit}>Add Folder</button>
          </div>
        </div>
      </div>
    )
  }
}

class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {selectedFolder: '0'}
  }
  
  renderFolders() {
    var folders = this.props.folders;
    
    folders = folders.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );
    
    return folders.map(folder =>
      <option value={folder.id}>{folder.name}</option>
    )
  }
                       
  toggleBookmark = () => {
      this.props.toggleBookmark();
    }
                       
  selectFolder = (e) => {
    this.setState({
      selectedFolder: e.target.value
    })    
  }
                       
  handleAddFile = () => {
    var folder = this.state.selectedFolder;
      
    this.props.addFile(folder);  
    this.props.toggleToast("Added to Library!");
  }
  
  render() {
    return (
      <div className="bookmark-modal">
        <div className="bookmark-top">
          <div className="bookmark-type">
            {this.props.indicator.type}
          </div>
          <div className="bookmark-name">
            {this.props.indicator.Name}
          </div>
          <i className="fas fa-times" onClick={this.toggleBookmark}></i>
        </div>
        <hr/>
        <div className="bookmark-folders-cont">
          <label for="bookmark-folders">Save to Folder<br/>
            <select id="bookmark-folders" onChange={this.selectFolder}>
              {this.renderFolders()}
            </select>
          </label>
          
        </div>
        <div className="bookmark-actions">
          <button className='bookmark-submit' onClick={this.handleAddFile}>
            Save
          </button>
          <button className="bookmark-cancel" onClick={this.toggleBookmark}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: "Adam Kimmerer",
        profilePhoto: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/photo-1511019621063-1bd36feaece2.jpg",
        organization: "Mount Albert"
      },
      initialIndicators: [],
      profileSet: false,
      indicators: [],
      setIndicator: {},
      showMeta: false,
      showAddFolder: false,
      showBookmark: false,
      toast: false,
      message: "",
      loggedIn: false,
      showLogin: false,
      org: false,
      library: {
        folderCounter: 1,
        fileCounter: 0,
        folders: [
          {
            id: 0,
            parentId: null,
            name: "My Library",
            type: "folder",
            files: []
          }
        ],
        files: [],
        selectedFolder: {
          id: 0,
          parentId: null,
          name: "My Library",
          type: "folder",
          files: []
        }
      },
      filters: [],
      tokens: {
        token: "",
        site: "",
        user: ""
      }
    };
  }

  toggleOrg = () => {
    var orgFilterExists = false;

    if (this.state.filters.length > 0) {
      
      this.state.filters.forEach(filter => {
        if (filter.type === "Organizations") {
          orgFilterExists = true
        }
      })

      if (orgFilterExists) {
        this.setState({
          org: true
        })
      } else {
        this.setState({
          org: false
        })
      }
    } else {
      this.setState({
        org: false
      })
    }

  }

  filterIndicators = () => {
    console.log("filters:")
    console.log(this.state.filters)
    var filteredIndicators = [];

    if (this.state.filters.length > 0) {
      this.state.filters.forEach(filter => {
        filteredIndicators = this.state.initialIndicators.filter(obj => {
          var filterType = filter.type;
          var filterVal = filter.value;

          if (obj[filterType]) {
            return obj[filterType].indexOf(filterVal) > -1
          }
        })
      })
      this.setState({
        indicators: filteredIndicators,
        setIndicator: filteredIndicators[0]
      }, () => {
        console.log("indicators:")
        console.log(this.state.indicators)
      })
    } else {
      this.setState({
        indicators: this.state.initialIndicators,
        setIndicator: this.state.initialIndicators[0]
      }, () => {
        console.log("indicators:")
        console.log(this.state.indicators)
      })
    }

    this.toggleOrg();
  }
  
  addFilter = (type, value, id) => {
    var oldFilters = this.state.filters;
    
    var newFilter = {
      id: id,
      type: type,
      value: value
    }
    
    if (oldFilters.indexOf(newFilter) === -1) {
      var newFilters = oldFilters.concat(newFilter)
      
      this.setState({
        filters: newFilters
      }, () => {
        this.filterIndicators();
      })
    }
  }
  
  removeFilter = (type, value) => {
    var oldFilters = this.state.filters;
    
    var newFilters = oldFilters.filter(function(el) {
      return el.value !== value
    })
    
    this.setState({
      filters: newFilters
    }, () => {
      this.filterIndicators()
    })
  }
  
  clearFilters = (type, value) => {
    this.setState({
      filters: []
    },
      () => {
        if (type) {
          setTimeout(() => {
            this.addFilter(type, value);
          }, 1)
        } else {
          this.filterIndicators();
        }
      }
    )
  }

  componentWillMount() {
    this.navigateFolder("0");
  }
  
  componentDidMount() { 
    axios.get('https://product-hub-cihi.firebaseio.com/indicators.json')
      .then((response) => {
        function compare(a,b) {
          if (a.Name < b.Name)
            return -1;
          if (a.Name > b.Name)
            return 1;
          return 0;
        }

        var indicators = response.data.sort(compare);

        this.setState({
           initialIndicators: response.data,
           indicators: response.data,
           setIndicator: response.data[0]
         })
      })
      .catch((error) => {
        console.log(error);
      })

    // axios.get('./data/indicators.json')
    //   .then((response) => {
    //     function compare(a,b) {
    //       if (a.Name < b.Name)
    //         return -1;
    //       if (a.Name > b.Name)
    //         return 1;
    //       return 0;
    //     }

    //     var indicators = response.data.sort(compare);

    //     this.setState({
    //        indicators: response.data,
    //        setIndicator: response.data[0]
    //      })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }

  addFile = folder => {
    var library = this.state.library;
    var selectedFile = this.state.setIndicator;
    var folders = library.folders;
    var counter = this.state.library.fileCounter + 1;

    var newFile = {
      id: counter,
      type: "page",
      name: selectedFile.Name,
      desc: selectedFile.Desc
    };

    var selectedFolder = this.state.library.folders.find(
      selected => selected.id == folder
    );

    var folderIndex = folders.indexOf(selectedFolder);
    folders.splice(folderIndex, 1);
    selectedFolder.files.push(newFile.name);
    folders.push(selectedFolder);

    library.fileCounter = counter + 1;
    library.folders = folders;
    library.files = library.files.concat(newFile);

    this.setState({
      library: library
    });

    this.toggleBookmark();
  };

  setIndicator = abc => {
    let indicatorList = this.state.indicators;

    let setIndicator = indicatorList.find(obj => {
      return obj.Name === abc;
    });

    setIndicator.type = "page";

    this.setState({
      setIndicator: setIndicator
    });
  };

  addFolder = name => {
    var library = this.state.library;

    var newFolder = {
      id: this.state.library.fileCounter + 1,
      parentId: this.state.library.selectedFolder.id,
      type: "folder",
      name: name,
      files: []
    };

    var newFolders = library.folders.concat(newFolder);

    library.folders = newFolders;
    library.fileCounter++;

    this.setState({
      library: library
    },
      () => {
        console.log(this.state.library)
      }
    );
  };

  navigateFolder = id => {
    id = parseInt(id);

    var library = this.state.library;

    var newSelected = this.state.library.folders.find(x => x.id === id);

    library.selectedFolder = newSelected;

    this.setState({
      library: library
    });
  };

  toggleBookmark = () => {
    this.setState({ showBookmark: !this.state.showBookmark });
  };

  toggleMeta = () => {
    this.setState({ showMeta: !this.state.showMeta });
  };

  toggleAddFolder = () => {
    this.setState({ showAddFolder: !this.state.showAddFolder });
  };

  renderBookmark() {
    if (this.state.showBookmark) {
      return (
        <Bookmark
          folders={this.state.library.folders}
          indicator={this.state.setIndicator}
          addFile={this.addFile}
          toggleBookmark={this.toggleBookmark}
          toggleToast={this.toggleToast}
        />
      );
    }
  }

  renderMeta() {
    if (this.state.showMeta) {
      return (
        <MetaData
          indicator={this.state.setIndicator}
          show={this.state.showMeta}
          toggleMetaHandler={this.toggleMeta}
        />
      );
    }
  }

  renderAddFolder() {
    if (this.state.showAddFolder) {
      return (
        <AddFolder
          selectedFolder={this.state.library.selectedFolder}
          addFolder={this.addFolder}
          toggleAddHandler={this.toggleAddFolder}
          toggleToast={this.toggleToast}
        />
      );
    }
  }

  setLogin = (apiResponse) => {

    if (!this.state.loggedIn) {
      var filters = this.state.filters.concat({
        type: "Organization",
        value: "Mount Albert"
      })
      this.toggleOrg();
      this.setState({ 
        loggedIn: true,
        filters: filters,
        tokens: apiResponse
      }, function() {
        console.log(this.state.tokens.token)
      });  
    } else {
      this.setState({ loggedIn: false });
    }
    
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  renderLogin() {
    if (this.state.showLogin) {
      return (
        <Login toggleLogin={this.toggleLogin} setLogin={this.setLogin} toggleSetup={this.toggleSetup}/>
      )
    }
  }

  toggleToast = message => {
    this.setState({
      toast: true,
      message: message
    });

    setTimeout(() => {
      this.setState({
        toast: false,
        message: message
      });
    }, 2000);
  };

  renderToast() {
    if (this.state.toast) {
      return <div className="toast">{this.state.message}</div>;
    }
  }

  renderSetup() {
    if (this.state.profileSet) {
      return (
        <Setup toggleSetup={this.toggleSetup}/>
      )
    }
  }

  toggleSetup = () => {
    this.setState({
      profileSet: !this.state.profileSet
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            loggedIn={this.state.loggedIn}
            toggleLogin={this.toggleLogin}
          />
          {this.renderSetup()}
          {this.renderLogin()}
          {this.renderMeta()}
          {this.renderAddFolder()}
          {this.renderBookmark()}
          {this.renderToast()}
          <Switch>
            <Route
              path="/indicator"
              render={(props) => (
                <IndicatorBody
                  indicator={this.state.setIndicator}
                  toggleMetaHandler={this.toggleMeta}
                  toggleBookmark={this.toggleBookmark}
                  toggleLogin={this.toggleLogin}
                  loggedIn={this.state.loggedIn}
                  clearFilters={this.clearFilters}
                  addFilter={this.addFilter}
                  token={this.state.tokens.token}
                />
              )}
            />
            <Route
              path="/topic"
              render={(props) => (
                <TopicPage
                  toggleBookmark={this.toggleBookmark}
                  toggleLogin={this.toggleLogin}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              path="/library"
              render={() => (
                <UserLibrary
                  library={this.state.library}
                  toggleAddHandler={this.toggleAddFolder}
                  navigateFolder={this.navigateFolder}
                  setIndicator={this.setIndicator}
                  toggleToast={this.toggleToast}
                />
              )}
            />
            <Route
              path="/tester"
              render={() => (
                <Tester
                  
                />
              )}
            />
            <Route 
              path="/list" 
              render= {() =><IndicatorList
                indicators={this.state.indicators}
                setIndicator={this.state.setIndicator}
                handleSetIndicator={this.setIndicator}
                toggleMetaHandler={this.toggleMeta}
                addFilter={this.addFilter}
                removeFilter={this.removeFilter}
                filters={this.state.filters}
                clearFilters={this.clearFilters}
                loggedIn={this.state.loggedIn}
                org={this.state.org}
              />} />
            <Route
              path="/report"
              render={() => <Report/>}
            />
            <Route
              path="*"
              render= {() => <Home/>}
              />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
