import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {getPhotoInfo} from './../../utils/callAPI'
import PhotoInfo from './../PhotoInfo/PhotoInfo'
import PhotoComment from './../PhotoComment/PhotoComment'

class Photo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null
        }
    }

    async componentWillMount()  { 
        const {photo_id} = this.props.match.params
        const photo = await getPhotoInfo(photo_id)    
        this.setState({photo})
    }

    render() {
        const {photo} = this.state
        const defaultPhoto = {
            src: "",
            owner_icon: "",
            owner_name: "",
            title: "",
            description: "",
            views: "",
            faves: "",
            comments: "",
            datetaken: "",
            tag_list: []
        }

        return (
            <div className="photo-page">
                <div className="photo" style={{background: "#212124"}}>
                    <img 
                        alt={photo ? photo.title : ""} 
                        src={photo ? photo.src : ""} 
                    />
                </div>
                <div className="photo-detail" style={{background: "#f3f5f6"}}>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <PhotoInfo photo={photo ? photo : defaultPhoto} />
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <PhotoComment photo_id={this.props.match.params.photo_id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Photo);
