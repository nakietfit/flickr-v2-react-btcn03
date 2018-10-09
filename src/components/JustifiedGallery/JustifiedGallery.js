import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {callAPI} from './../../utils/callAPI'
import Spinner from './../Spinner/Spinner'
import './../../stylesheets/HoverEffect/Julia.css'
import './JustifiedGallery.css' 

class JustifiedGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1,
            hasMore: true,
            images: []
        };
    }

    loadItems = async () => {
        if (this.state.page > 25) {
            this.setState({
                hasMore: false
            })
            return
        }
        const images = await callAPI(this.state.page, this.props.tag)
        this.setState({
            images: this.state.images.concat(images),
            page: this.state.page + 1
        })
    }

    render() {
        const loader = <Spinner />

        const photos = this.state.images.map((image, i) => {
            const ratio = image.width / image.height
            const flexBasis = 100 * ratio + image.height * ratio

            // Src: https://codepen.io/anon/pen/JmoOEE?editors=1100
            // Name: Flex Justified Image Grid
            const FlexElement = styled(Link)`
                flex-grow: ${ratio};
                flex-basis: ${flexBasis}px;
                max-height: ${400}px;
                max-width: ${400 * ratio}px;
                background-image: url(${image.src});
                background-position: center;
                &:before {
                    padding-top: ${100 / ratio}%;
                }
            `
            return (
                <FlexElement 
                    key={i} 
                    className="photo effect-julia" 
                    to={`/photo/${image.photo_id}`}
                    style={{textDecoration: "none"}}
                >
                    <div className="info">
                        <div 
                            className="title" 
                            style={{maxWidth: flexBasis}}
                        >
                            {image.caption}
                        </div>
                        <div 
                            className="owner_name" 
                            style={{maxWidth: flexBasis}}
                        >
                            by {image.ownername}
                        </div>
                        <div className="view">
                            <i className="far fa-eye"></i>
                            {image.views}
                        </div>    
                    </div>
                </FlexElement>
            )
        })

        return (    
            <InfiniteScroll
                pageStart={0}
                loadMore={() => this.loadItems()}
                hasMore={this.state.hasMore}
                loader={loader}
            >
                <div className="tracks">{photos}</div>
            </InfiniteScroll>
        );
    }
}

export default JustifiedGallery;
