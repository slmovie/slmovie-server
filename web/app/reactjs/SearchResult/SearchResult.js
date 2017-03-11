/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import SearchInput from '../CommonJS/SearchInputDiv.js'
import MoviesList from './MoviesListDiv.js'
import ReqUrl from '../Service/ReqUrl.js'
import Config from '../Service/Config'

let input
class SearchResult extends React.Component {

    constructor() {
        super()
        this.state = {
            movies: '',
        }
    }

    componentDidMount() {
        input = window.location.href.split('=')[1]
        document.title = '双龙影视 ' + decodeURI(input)
        this._getMovies()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <SearchInput/>
                <div style={{marginTop: 30, overflow: 'hidden'}}>
                    {this._renderMovies()}
                </div>
            </div>
        );
    }

    //渲染电影列表
    _renderMovies() {
        return (
            <MoviesList movies={this.state.movies}/>
        )
    }

    //获取电影列表
    _getMovies() {
        let request = $.ajax({
            url: ReqUrl.SearchAll + '?name=' + input,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            async: false,
        })
        request.done(function (msg) {
            Config.log('_getMovies', JSON.parse(JSON.stringify(msg)))
            this.setState({movies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error('_getMovies', textStatus);
            let error = '{"dyjy":{"status":{"code":0}}}'
            this.setState({movies: error})
        }.bind(this));
    }

}

const Styles = {
    Content: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<SearchResult/>, $('#searchResult_body')[0])