import React, { Component } from "react";
import ReactImages from "react-images";
import PropTypes from 'prop-types';

class Lightbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0
        };
    }
    openLightbox = currentImage => {
        this.setState({
            currentImage: currentImage,
            lightboxIsOpen: true
        });
    };
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
        this.props.callbackFromParent(false);
    };
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    };
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    };
    componentDidMount() {
        this.openLightbox(this.props.currentImage);
    }
    render() {
        return (
            <ReactImages
                currentImage={this.state.currentImage}
                images={this.props.images}
                isOpen={this.state.lightboxIsOpen}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                onClose={this.closeLightbox}
            />
        );
    }
}

const propTypes = {
    currentImage: PropTypes.number.isRequire,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequire,
            caption: PropTypes.string.isRequire,
            ownername: PropTypes.string,
            views: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number
        })
    ).isRequire,
    callbackFromParent: PropTypes.func.isRequire
}

Lightbox.propTypes = propTypes

export default Lightbox;
