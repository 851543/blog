import config from '@/config/config'
import axios from 'axios'

export default {
  getTopAndFeaturedArticles: () => {
    return axios.get('/api/blog/article/topAndFeatured')
  },
  getArticles: (params: any) => {
    return axios.get('/api/blog/article/list', { params: params })
  },
  getArticlesByCategoryId: (params: any) => {
    return axios.get('/api/blog/article/categoryId', { params: params })
  },
  getArticeById: (articleId: any) => {
    return axios.get('/api/blog/article/' + articleId)
  },
  getAllCategories: () => {
    return axios.get('/api/blog/category/list')
  },
  getAllTags: () => {
    return axios.get('/api/blog/tag/tags/all')
  },
  getTopTenTags: () => {
    return axios.get('/api/blog/tag/tags/topTen')
  },
  getArticlesByTagId: (params: any) => {
    return axios.get('/api/blog/article/tagId', { params: params })
  },
  getAllArchives: (params: any) => {
    return axios.get('/api/blog/article/archives/list', { params: params })
  },
  login: (params: any) => {
    return axios.post('/api/login', params, )
  },
  getUserInfo(){
    return axios.get('/api/getInfo')
  },
  saveComment: (params: any) => {
    return axios.post('/api/blog/comment/comments/save', params)
  },
  getComments: (params: any) => {
    return axios.get('/api/blog/comment/comments', { params: params })
  },
  getTopSixComments: () => {
    return axios.get('/api/blog/comment/comments/topSix')
  },
  getAbout: () => {
    return axios.get('/api/blog/website/about')
  },
  getFriendLink: () => {
    return axios.get('/api/blog/link/links')
  },
  submitUserInfo: (params: any) => {
    return axios.put('/api/system/user/profile', params)
  },
  updateUserSubscribe: (params: any) => {
    return axios.put('/api/users/subscribe', params)
  },
  sendValidationCode: (username: any) => {
    return axios.get('/api/blog/mailCode', {
      params: {
        username: username
      }
    })
  },
  bindingEmail: (params: any) => {
    return axios.put('api/system/user/profile/blog/bind/email', params)
  },
  register: (params: any) => {
    return axios.post('/api/users/register', params)
  },
  searchArticles: (params: any) => {
    return axios.get('/api/blog/article/search', {
      params: params
    })
  },
  getAlbums: () => {
    return axios.get('/api/blog/photo/photos/albums')
  },
  getPhotosBuAlbumId: (albumId: any, params: any) => {
    return axios.get('/api/blog/photo/albums/' + albumId + '/photos', {
      params: params
    })
  },
  getWebsiteConfig: () => {
    return axios.get('/api/blog/website/')
  },
  qqLogin: (params: any) => {
    return axios.post('/api/users/oauth/qq', params)
  },
  report: () => {
    axios.post('/api/blog/website/report')
  },
  getTalks: (params: any) => {
    return axios.get('/api/blog/talk/talks', {
      params: params
    })
  },
  getTalkById: (id: any) => {
    return axios.get('/api/blog/talk/talks/' + id)
  },
  logout: () => {
    return axios.post('/api/logout')
  },
  getRepliesByCommentId: (commentId: any) => {
    return axios.get(`/api/blog/comment/comments/${commentId}/replies`)
  },
  updatePassword: (params: any) => {
    return axios.put('/api/users/password', params)
  },
  accessArticle: (params: any) => {
    return axios.post('/api/blog/article/access', params)
  }
}
