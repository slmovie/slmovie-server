/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';
import MovieItem from './MovieItemDiv.js'

export default class MoviesListDiv extends React.Component {

    render() {
        // console.log(this.props.movies)
        if (this.props.movies != '') {
            let data = this.props.movies
            if (data.dyjy.status.code == 101 && data.dyjy.status.code == 101) {
                return (
                    <text style={Styles.TextRed}>{data.dyjy.status.error}</text>
                )
            } else if (data.dyjy.status.code == 1 || data.dyjy.status.code == 1) {
                let movies = {}
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
                        {this._renderList(movies)}
                    </ul>
                )
            } else {
                return (
                    <text style={Styles.TextRed}>请求失败，请重试</text>
                )
            }
        } else {
            return (
                <text style={Styles.Text}>加载中</text>
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
    },
    Text: {
        fontSize: 25,
    },
    TextRed: {
        fontSize: 25,
        color: 'red',
    }
}