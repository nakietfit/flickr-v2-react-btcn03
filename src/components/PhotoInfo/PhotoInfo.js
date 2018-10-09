import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './PhotoInfo.css'

class PhotoInfo extends Component {
    showTagList = tag_list => {
        return tag_list.map((item, i) => {
            return (
                <Link
                    key={i} 
                    to={`/tag/${item}`}
                >
                    <button className="btn tag-btn">{item}</button>
                </Link>
            )
        }) 
    }

    render() {
        const {photo} = this.props
        return (
            <div className="photo-info">
                <div className="owner">
                    <div 
                        className="owner-icon" 
                        style={{
                            backgroundImage:`url(${photo.owner_icon})`,
                            backgroundSize: "cover"
                        }}
                    >
                    </div>
                    <div className="photo-info-owner-name">{photo.owner_name}</div>
                </div>
                <div className="photo-info-title">{photo.title}</div>
                <div className="description">{photo.description}</div>
                <div className="row interaction-container">
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 views">
                        <i className="far fa-eye" title="views"></i>
                        <p>{photo.views}</p>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 faves">
                        <i className="far fa-star" title="faves"></i>
                        <p>{photo.faves}</p>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 comments">
                        <i className="far fa-comment-alt" title="comments"></i>
                        <p>{photo.comments}</p>
                    </div>
                </div>
                <div className="datetaken">
                    <i className="far fa-clock" title="Taken on"></i>
                    {photo.datetaken}
                </div>
                <div className="tags">
                    <p>Tags</p>
                    {this.showTagList(photo.tag_list)}
                </div>
            </div>            
        );
    }
}

const propTypes = {
    photo: PropTypes.objectOf(
        PropTypes.shape({
            src: PropTypes.string,
            owner_icon: PropTypes.string.isRequire,
            owner_name: PropTypes.string.isRequire,
            title: PropTypes.string.isRequire,
            description: PropTypes.string.isRequire,
            views: PropTypes.string.isRequire,
            comments: PropTypes.string.isRequire,
            datetaken: PropTypes.string.isRequire
        })
    )
}

const defaultProps = {
    photo: {
        src: "",
        owner_icon: "",
        owner_name: "",
        title: "",
        description: "",
        views: "",
        comments: "",
        datetaken: ""
    }
}

PhotoInfo.propTypes = propTypes
PhotoInfo.defaultProps = defaultProps

export default PhotoInfo;
