/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import SearchInput from '../CommonJS/SearchInputDiv.js'
import ReqUrl from '../Service/ReqUrl.js'
import Config from '../Service/Config.js'
import IndexListDiv from '../Index/IndexListDiv.js'
import ApkDownload from '../CommonJS/ApkDownload.js'

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            hotMovies: '',
            newMovies: '',
            newTVs: ''
        }
    }

    componentDidMount() {
        this._getHotMovies()
        this._getNewMovies()
        this._getNewTVs()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <ApkDownload/>
                <SearchInput/>
                {this._renderRecommend()}
            </div>
        );
    }

    //获取最热电影列表
    _getHotMovies() {
        let request = $.ajax({
            url: ReqUrl.IndexHotMovies,
            method: "GET",
            dataType: "json",
            // timeout: 10000,
            async: true,
        })
        request.done(function (msg) {
            Config.log('_getHotMovies', JSON.stringify(msg))
            this.setState({hotMovies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error(textStatus);
        }.bind(this));
    }

    //获取最新影片
    _getNewMovies() {
        let request = $.ajax({
            url: ReqUrl.IndexNewMovies + 0,
            method: "GET",
            dataType: "json",
            // timeout: 10000,
            async: true,
        })
        request.done(function (msg) {
            Config.log('_getNewMovies', JSON.stringify(msg))
            this.setState({newMovies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error(textStatus);
        }.bind(this));
    }

    //获取最新电视剧
    _getNewTVs() {
        let request = $.ajax({
            url: ReqUrl.IndexNewTVs + 0,
            method: "GET",
            dataType: "json",
            // timeout: 10000,
            async: true,
        })
        request.done(function (msg) {
            Config.log('_getNewTVs', JSON.stringify(msg))
            this.setState({newTVs: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error(textStatus);
        }.bind(this));
    }

    //渲染推荐内容
    _renderRecommend() {
        if (this.state.hotMovies != '' || this.state.newMovies != '' || this.state.newTVs != '') {
            return (
                <div>
                    {this._renderHotMovies()}
                    {this._renderNewMovies()}
                    {this._renderNewTvs()}
                </div>
            )
        } else {
            return (<text style={{fontSize: 25, color: 'red'}}>加载中</text>)
        }
    }

    //渲染热门影片
    _renderHotMovies() {
        // Config.log('_renderHotMovies', this.state.hotMovies)
        if (this.state.hotMovies != '') {
            return (
                <IndexListDiv movies={this.state.hotMovies} title='热门电影'/>
            )
        } else {
            return ''
        }
    }

    //渲染最新影片
    _renderNewMovies() {
        if (this.state.newMovies != '') {
            return (
                <IndexListDiv movies={this.state.newMovies} title='最新电影'/>
            )
        } else {
            return ''
        }
    }

    //渲染最新电视剧
    _renderNewTvs() {
        if (this.state.newTVs != '') {
            return (
                <IndexListDiv movies={this.state.newTVs} title='最新电视剧'/>
            )
        } else {
            return ''
        }
    }
}

const Styles = {
    Content: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<Index/>, $('#content')[0]);