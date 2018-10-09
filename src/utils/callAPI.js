import axios from 'axios';

const path = "https://api.flickr.com/services/rest/"
const api_key = "7253fa798ef2e7731b0873e1f4f4522f"
const format = "json&nojsoncallback=1"

export const callAPI = async (page, tag) => {
    let method
    let tag_search
    if (tag === '') {
        method = "flickr.interestingness.getList"
        tag_search = ''
    } else {
        method = "flickr.photos.search"
        tag_search = `&tags=${tag}`
    }
    const extras = "owner_name%2C+views%2C+url_t%2C+url_l"
    const per_page = "20"
    const url = `${path}?method=${method}&api_key=${api_key}${tag_search}&extras=${extras}&per_page=${per_page}&page=${page}&format=${format}`
    let images
    await axios.get(url).then(res => {
        images = res.data.photos.photo.map(item => {
            return {
                photo_id: item.id,
                src: item.url_l,
                caption: item.title,
                ownername: item.ownername,
                views: item.views,
                width: item.width_t,
                height: item.height_t
            }
        })
    })
    return images
}

export const getPhotoInfo = async photo_id => {
    const method = "flickr.photos.getInfo"
    const url = `${path}?method=${method}&api_key=${api_key}&photo_id=${photo_id}&format=${format}`
    let photo_info
    await axios.get(url).then(async res => {
        const {photo} = res.data
        const {owner} = photo
        const {tag} = photo.tags
        const tag_list = tag.map(item => item.raw)
        const faves = await getFavorites(photo_id)
        photo_info = {
            src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
            owner_icon: `http://farm${owner.iconfarm}.staticflickr.com/${owner.iconserver}/buddyicons/${owner.nsid}.jpg`,
            owner_name: owner.realname === "" ? owner.username : owner.realname,
            title: photo.title._content,
            description: photo.description._content,
            views: parseInt(photo.views, 10).toLocaleString('en'),
            faves: parseInt(faves, 10).toLocaleString('en'),
            comments: parseInt(photo.comments._content, 10).toLocaleString('en'),
            datetaken: photo.dates.taken,
            tag_list: tag_list
        }
    })
    return photo_info
}

const getFavorites = async photo_id => {
    const method = "flickr.photos.getFavorites"
    const url = `${path}?method=${method}&api_key=${api_key}&photo_id=${photo_id}&format=${format}`
    let favorites
    await axios.get(url).then(res => {
        favorites = res.data.photo.total
    })
    return favorites
}

export const getPhotoCommentList = async photo_id => {
    const method = "flickr.photos.comments.getList"
    const url = `${path}?method=${method}&api_key=${api_key}&photo_id=${photo_id}&format=${format}`
    let comment_list = []
    await axios.get(url).then(res => {
        if (res.data.comments.comment === undefined) {
            return comment_list
        }
        
        comment_list = res.data.comments.comment.map(item => {
            return {
                author_id: item.author,
                author_name: item.authorname,
                realname: item.realname,
                datecreate: item.datecreate,
                iconfarm: item.iconfarm,
                iconserver: item.iconserver,
                content: item._content
            }
        })
    })
    return comment_list
}