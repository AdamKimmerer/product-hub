import {Link} from 'react-router-dom';
import React from 'react';

import PageTitle from './PageTitle.js';
import ScrollToTopOnMount from './ScrollToTopComponent.js';

class FolderOptions extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleAddToggle = () => {
    this.props.addFolder();
  }
  
  render() {
    return (
      <div className="folder-options" data-id={this.props.folderId}>
        <div className="folder-options-item" onClick={this.handleAddToggle}>
          New Folder
        </div>
        <div className="folder-options-item">
          Move to...
        </div>
        <div className="folder-options-item">
          Rename
        </div>
        <div className="folder-options-item">
          Delete
        </div>
      </div>
      )
    }
  }

class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  renderFolderExtra() {
    if (this.props.type === "folder") {
      return (
        <div className="library-item-icon">
          <i className="fas fa-folder"></i>
        </div>
      )
    }
    return ""
  }
  
  renderFileExtra() {
    if (this.props.type !== "folder") {
      return (
        <div className="library-item-preview">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/0-Long-term-Car-Topic-Page-102079728-1548279475.png"/>
        </div>
      )
    }
  }
  
  handleFolderNav = (e) => {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var type = e.currentTarget.dataset.type;

    this.props.navigateFolder(id, name, type)
  }
  
  render() {
    return (
      <div className="library-item" data-id={this.props.id} data-name={this.props.name} data-type={this.props.type} onClick={this.handleFolderNav}>
        {this.renderFileExtra()}
                  <div className="library-item-desc">
                    {this.renderFolderExtra()}
                    <div>
                      <div className="library-item-type">
                        {this.props.type}
                      </div>
                      <div className="library-item-name">
                        {this.props.name}
                      </div>
                    </div>
                  </div>
                </div>
    )
  }
}

export default class UserLibrary extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displayOptions: false
    };
  }
  
  renderBreadcrumb() {
    var selected = this.props.library.selectedFolder;
    var parent = selected.parentId;
    var breadCrumb = []
      
      var currentParentId = parent;
      
      breadCrumb.push({
        name: selected.name,
        id: selected.id
      })
      
      while (currentParentId !== null) {
        var parentFolder = this.props.library.folders.filter(function(obj) {
          return obj.id === currentParentId;
        });
        
        var data = parentFolder[0]
        
        breadCrumb.push({
          name: data.name,
          id: data.id
        })
        
        currentParentId = data.parentId;
      }
      
       return breadCrumb.reverse().map(folder => 
        <span className="crumb-cont">
          <span onClick={this.breadcrumbClickHandler} data-id={folder.id} className="crumb">
            {folder.name}
            <FolderOptions 
              folderId={folder.id}
              addFolder={this.toggleAddFolder}
            />
          </span>
          <span className="bread-caret">></span>
        </span>
       )
    }

  renderTitle() {
    return this.props.library.selectedFolder.name;
  }
  
  renderLeft() {
    var oldFolders = this.props.library.folders;
    var newArray = []
    
    while (oldFolders.length > 0) {
      oldFolders.forEach(function(el) {
        console.log(el)
        if (el.parentId === null) {
          newArray.push({
            id: el.id,
            name: el.name,
            folders: []
          })
          
          var elIndex = oldFolders.indexOf(el)
          oldFolders.splice(elIndex, 1)
        } else {
          //console.log("each")
          var parentIndex = newArray.findIndex(p => p.id == el.parentId)
          
          //console.log("parentIndex: " + parentIndex)
          
          if (parentIndex > -1) {
            newArray[parentIndex].folders.push({
              id: el.id,
              name: el.name,
              folders: []
            })
            
            var elIndex = oldFolders.indexOf(el)
            oldFolders.splice(elIndex, 1)
          }  
        }  
      })
    }
    
    console.log(oldFolders)
    console.log(newArray)
  }
    
  displayOptions = e => {
    this.setState({
      displayOptions: !this.state.displayOptions
    })
  }
    
  breadcrumbClickHandler = e => {
    var id = e.currentTarget.dataset.id;
    
    if (this.props.library.selectedFolder.id == id) {
      this.displayOptions()
    } else {
      this.props.navigateFolder(id)
    }
  }
  
  
  handleFolderNav = (id, name, type) => {
    if (type !== "folder") {
      this.props.setIndicator(name)
    } else {
      this.props.navigateFolder(id)
    }
    
  }

  renderFolders() {
    var parent = this.props.library.selectedFolder.id;
    var folderDisplay = [];

    folderDisplay = this.props.library.folders.filter(function(obj) {
      return obj.parentId === parent;
    });

    if (folderDisplay.length > 0) {
      return folderDisplay.map(note => 
        <LibraryItem 
          name={note.name} 
          type={note.type} 
          id={note.id} 
          navigateFolder={this.handleFolderNav}
        />);
    }
    return (
        <div className="create-folder" onClick={this.toggleAddFolder}>
          <span><i className="fas fa-plus"></i> Add Folder</span>
        </div>
    );
  }
  
  renderFiles() {
    var folder = this.props.library.selectedFolder;
    
    if (folder.files.length > 0) {
      return folder.files.map(file => {
        
        var result = this.props.library.files.find(x => x.name === file)
        
        return (
          <Link to="/indicator">
            <LibraryItem 
              name={result.name} 
              type={result.type} 
              id={result.id} 
              navigateFolder={this.handleFolderNav}
            />
          </Link>
        )
      });
    } else {
      return (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="far fa-sad-tear"></i>
          </div>
          <br/>
          <div className="empty-text">
            <div className="empty-text-main">Nothing saved here... yet.    </div>
          <div className="empty-text-secondary">Add content from around CIHI to your library so you can quickly access it
          </div>
        </div>
      </div>
      );
    }
  }
  
  toggleAddFolder = () => {
    this.props.toggleAddHandler();
  }

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <div className="main">
        <div className="library-main">
          <div className="library-cont">
            <div className="library-left-side">
              <div className="new-folder" onClick={this.toggleAddFolder}>
                Create New Folder
              </div>
              <div className="library-folder-cont">
                <div className="library-folder">
                    <i className=" library-folder-caret fas fa-caret-right"></i>
                    <i className="library-folder-icon fas fa-folder"></i>
                  <span className="library-folder-name">
                    My Library
                  </span>
                </div>
              </div>
            </div>
            <div className="library-right-side">
              <div className="library-top-bar">
                <div className="library-breadcrumb">
                  {this.renderBreadcrumb()}
                </div>
                <div className="search">
                  <input placeholder="Search My Library" type="text" />
                  <button>Search</button>
                </div>
              </div>
              <div className="library-section">
                <div className="section-header small">
                  Folders
                </div>
                <div className="library-items-cont">
                  {this.renderFolders()}
                </div>
              </div>
              <div className="library-section">
                <div className="section-header small">
                  Files
                </div>
                <div className="library-items-cont">
                  {this.renderFiles()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}