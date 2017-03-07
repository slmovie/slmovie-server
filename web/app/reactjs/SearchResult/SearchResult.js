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
                <div style={{marginTop: 30}}>
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
            // console.log(JSON.parse(JSON.stringify(msg)).bttt.movies[0].name)
            this.setState({movies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            let error = '{"dyjy":{"status":{"code":0}}}'
            this.setState({movies: error})
        }.bind(this));
    }

}

const Styles = {
    Content: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<SearchResult/>, $('#searchResult_body')[0])