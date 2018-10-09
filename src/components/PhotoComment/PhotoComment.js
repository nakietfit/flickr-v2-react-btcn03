import React, { Component } from 'react';
import {getPhotoCommentList} from './../../utils/callAPI'
import './PhotoComment.css'

class PhotoComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment_list: []
        }
    }

    async componentWillMount()  { 
        const {photo_id} = this.props
        const comment_list = await getPhotoCommentList(photo_id)    
        this.setState({comment_list})
    }

    showCommentList = () => {
        return (
            this.state.comment_list.map((comment, i) => {
                return (
                    <div key={i} className="photo-comment">
                        <div 
                            className="author-icon"
                            style={{
                                backgroundImage:`url(http://farm${comment.iconfarm}.staticflickr.com/${comment.iconserver}/buddyicons/${comment.author_id}.jpg)`,
                                backgroundSize: "cover"
                            }}
                        >
                        </div>
                        <div className="text">
                            <div className="author-name">{comment.realname === '' ? comment.author_name : comment.realname}</div>
                            <div className="isPro"></div>
                            <div className="datecreate"></div>
                            <div className="content">{comment.content}</div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="photo-comment-container">
                <p>Comments</p>
                {this.showCommentList()}
            </div>
        );
    }
}

export default PhotoComment;
