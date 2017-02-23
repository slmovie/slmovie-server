/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import SearchInput from '../CommonJS/SearchInputDiv.js'
import MoviesList from './MoviesListDiv.js'

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
        console.log(this.state.movies.bttt)
        return (
            <MoviesList movies={this.state.movies}/>
        )
    }

    //获取电影列表
    _getMovies() {
        // let ajax = new XMLHttpRequest();
        // ajax.onreadystatechange = function () {
        //     if (ajax.readyState === 4) {
        //         if (ajax.status === 200) {
        //             console.log(JSON.parse(ajax.responseText));
        //             this.setState({movies: JSON.parse(ajax.responseText)})
        //         } else {
        //             console.error(ajax.statusText);
        //         }
        //     }
        // }.bind(this);
        // ajax.onerror = function (e) {
        //     console.error(ajax.statusText);
        // };
        // ajax.open('GET', 'http://localhost:3000/search/all?name=' + this.state.input, true);
        // ajax.send('name=' + this.state.input)
        let request = $.ajax({
            url: "http://localhost:3000/search/all?name=" + input,
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
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<SearchResult/>, $('#searchResult_body')[0])