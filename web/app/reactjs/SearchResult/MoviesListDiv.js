/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';
import MovieItem from './MovieItemDiv.js'
import Config from '../Service/Config.js'

export default class MoviesListDiv extends React.Component {

    render() {
        // console.log(this.props.movies)
        if (this.props.movies != '') {
            let data = this.props.movies
            if (data.status.code == 101) {
                return (
                    <text style={Styles.TextRed}>{data.dyjy.status.error}</text>
                )
            } else if (data.status.code == 1) {
                let movies = {}
                //重组数据
                if (data.status.code == 1) {
                    movies = data.movies
                }
                Config.log('MoviesListDiv' + movies)
                return (
                    <div style={Styles.BorderDiv}>
                        <text style={Styles.TitleText}>{this.props.title}</text>
                        <ul style={Styles.MoviesList}>
                            {this._renderList(movies)}
                        </ul>
                    </div>
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
    BorderDiv: {
        border: 'solid',
        borderWidth: 0.5,
        borderColor: '#d0d0d0',
        paddingLeft: 5,
        paddingTop: 10,
        marginTop: 20,
    },
    TitleText: {
        fontSize: 25,
        color: '#00B3FF'
    },
    MoviesList: {
        listStyleType: 'none',
        padding: 0,
        width: 1000,
        display: 'inline-block',
    },
    Text: {
        fontSize: 25,
    },
    TextRed: {
        fontSize: 25,
        color: 'red',
    }
}