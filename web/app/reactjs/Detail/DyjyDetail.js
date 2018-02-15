/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import ReqUrl from '../Service/ReqUrl.js'
import Config from '../Service/Config.js'

let code, from
const width = 200

export default class DyjyDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            movie: ''
        }
    }

    componentDidMount() {
        from = window.location.href.split('=')[2]
        code = window.location.href.split('=')[1].split('&')[0]
        document.title = '双龙影视 ' + decodeURI(code)
        this._showDetail()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <div style={{marginTop: 30}}>
                    {this._renderDetail()}
                </div>
            </div>
        );
    }

    //获取详情数据
    _showDetail() {
        let request = $.ajax({
            url: ReqUrl.Detail + '?code=' + code,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            async: true,
        })
        request.done(function (msg) {
            this.setState({movie: msg})
            Config.log('_showDetail', JSON.stringify(msg));
        }.bind(this));
        request.fail(function (jqXHR, textStatus) {
            Config.error('_showDetail', textStatus);
        }.bind(this));
    }

    //渲染详情页面
    _renderDetail() {
        if (this.state.movie != '') {
            if (this.state.movie.status.code == 0) {
                return (<text style={{fontSize: 25, color: 'red'}}>对不起，请刷新网页重试</text>)
            } else {
                return (
                    <div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={this.state.movie.movies.post} style={Styles.PostImg}/>
                            <ul style={Styles.InfoUl}>
                                {this._renderInfo()}
                            </ul>
                        </div>
                        {this._getDescribe(this.state.movie.movies.describe)}
                        <ul style={Styles.UrlsUl}>
                            {this._renderUrls()}
                        </ul>
                    </div>
                )
            }
        } else {
            return ('')
        }
    }

    //渲染电影信息
    _renderInfo() {
        let info = []
        for (let i = 0; i < this.state.movie.movies.detail.length; i++) {
            if (this.state.movie.movies.detail[i] != '详情:')
                info.push(this._getInfo(this.state.movie.movies.detail[i]))
        }
        return info;
    }

    //电影信息样式
    _getInfo(info) {
        return (
            <li style={Styles.InfoLi}>{info}</li>
        )
    }

    _getDescribe(describe) {
        if (describe != '') {
            return (
                <ul style={Styles.DescribeUl}>
                    <li style={Styles.DescribeTitle}>剧情简介</li>
                    <li style={Styles.DescribeText}>{describe}</li>
                </ul>
            )
        } else {
            return null
        }
    }

    //渲染下载链接
    _renderUrls() {
        let urls = []
        for (let i = 0; i < this.state.movie.movies.files.length; i++) {
            urls.push(this._getUrl(this.state.movie.movies.files[i]))
        }
        return urls;
    }

    //下载地址样式
    _getUrl(url) {
        let name = ''
        if (url.fileSize != '') {
            name = '[' + url.fileSize + ']'
        }
        name = name + url.name
        return (
            <li style={Styles.UrlLi}>
                <a href={url.download} style={{textDecoration: 'none'}}>{name}</a>
                <div>
                    <input style={Styles.UrlInput}
                           value={url.download} onClick={(e) => e.target.select()}/>
                </div>
            </li>
        )
    }
}

const
    Styles = {
        Content: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        PostImg: {
            width: width,
            height: width * 180 / 130,
        },
        InfoUl: {
            listStyleType: 'none',
            padding: 0,
            marginLeft: 40,
            width: '50%'
        },
        InfoLi: {
            fontSize: 17,
            marginTop: 6,
        },
        UrlsUl: {
            listStyleType: 'none',
            padding: 0,
            marginTop: 30,
        },
        UrlLi: {
            fontSize: 20,
            marginTop: 15,
        },
        UrlInput: {
            fontSize: 18,
            width: '100%',
            backgroundColor: '#f9f9f9',
            border: 'solid',
            borderColor: '#e4e4e4',
            borderWidth: 1,
            textOverflow: 'ellipsis'
        },
        DescribeUl: {
            listStyleType: 'none',
            padding: 0,
            marginTop: 30,
        },
        DescribeTitle: {
            fontSize: 20,
        },
        DescribeText: {
            fontSize: 16,
            width: '100%',
            marginTop: 20,
        }
    }