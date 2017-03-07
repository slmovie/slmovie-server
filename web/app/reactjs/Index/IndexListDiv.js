/**
 * Created by BaoJun on 2017/3/7.
 */
import React from 'react';
import {render} from 'react-dom';
import Config from '../Service/Config.js'
import IndexListItem from '../Index/IndexListItemDiv.js'

export default class IndexListDiv extends React.Component {
    render() {
        // Config.Log('IndexListDiv', this.props.movies)
        let data = this.props.movies
        if (data.status.code == 101) {
            return ('')
        } else if (data.status.code == 1) {
            let movies = {}
            //重组数据
            if (data.status.code == 1) {
                movies = data.movies
            }
            Config.Log('movies', movies)


            return (
                <div style={Styles.BorderDiv}>
                    <text style={Styles.TitleText}>{this.props.title}</text>
                    <ul style={Styles.MoviesList}>
                        {this._renderList(movies)}
                    </ul>
                </div>
            )
        } else {
            return ('')
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
            <IndexListItem movie={movie}/>
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
        display: 'inline-block'
    },
    Text: {
        fontSize: 25,
    },
    TextRed: {
        fontSize: 25,
        color: 'red',
    }
}