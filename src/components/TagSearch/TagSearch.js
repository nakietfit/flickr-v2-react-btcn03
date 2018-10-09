import React, { Component } from 'react';
import { withRouter } from 'react-router'
import JustifiedGallery from './../JustifiedGallery/JustifiedGallery'

class TagSearch extends Component {
  render() {
    return (
      <JustifiedGallery tag={this.props.match.params.tag_search}/>
    );
  }
}

export default withRouter(TagSearch);
