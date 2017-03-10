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

class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            movies: '',
        }
    }

    componentDidMount() {
        this._getMovies()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <SearchInput/>
                {this._renderHotMovies()}
                {this._renderNewMovies()}
                {this._renderNewTvs()}
            </div>
        );
    }

    //获取电影列表
    _getMovies() {
        let request = $.ajax({
            url: ReqUrl.IndexRecommend,
            method: "GET",
            dataType: "json",
            // timeout: 10000,
            async: true,
        })
        request.done(function (msg) {
            Config.log('IndexReq', JSON.parse(JSON.stringify(msg)))
            this.setState({movies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error(textStatus);
        }.bind(this));
    }

    //渲染热门影片
    _renderHotMovies() {
        Config.log('_renderHotMovies', this.state.movies.hotMovies)
        if (this.state.movies != '' && this.state.movies.hotMovies != '') {
            return (
                <IndexListDiv movies={this.state.movies.hotMovies} title='热门电影'/>
            )
        } else {
            return (<text style={{fontSize: 25, color: 'red'}}>加载中</text>)
        }
    }

    //渲染最新影片
    _renderNewMovies() {
        if (this.state.movies != '' && this.state.movies.newMovies != '') {
            return (
                <IndexListDiv movies={this.state.movies.newMovies} title='最新电影'/>
            )
        } else {
            return ''
        }
    }

    //渲染最新电视剧
    _renderNewTvs() {
        if (this.state.movies != '' && this.state.movies.newTVs != '') {
            return (
                <IndexListDiv movies={this.state.movies.newTVs} title='最新电视剧'/>
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

render(<Index />, $('#content')[0]);