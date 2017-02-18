/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';
import MovieItem from './MovieItemDiv.js'

export default class MoviesListDiv extends React.Component {

    render() {
        console.log('MoviesListDiv 空>>>' + this.props.movies)
        if (this.props.movies.toString() == {}.toString()) {
            return (
                <text>加载中</text>
            )
        } else {
            console.log('MoviesListDiv>>>' + this.props.movies)
            let data = JSON.parse(this.props.movies)
            this._renderList(data)
            let movies = {}
            console.log(data)
            //重组数据
            if (data.dyjy.status.code == 1) {
                movies = data.dyjy.movies
            }
            if (data.bttt.status.code == 1) {
                for (var i = 0, len = data.bttt.movies.length; i < len; i++) {
                    movies.push(data.bttt.movies[i]);
                }
            }
            console.log(movies)
            return (
                <ul style={Styles.MoviesList}>
                    {/*{this._renderList(movies)}*/}
                    {this._renderList(movies)}
                </ul>
            )

        }
    }

    //渲染列表
    _renderList(movies) {
        let lists = []
        for (var i = 0, len = movies.length; i < len; i++) {
            lists.push(this._renderItem(movies[i]))
        }
        return lists
    }

    //渲染Item
    _renderItem(movie) {
        return (
            <MovieItem movie={movie}/>
        )
    }

}

let Styles = {
    MoviesList: {
        listStyleType: 'none',
        padding: 0,
        width: 1000,
    }
}