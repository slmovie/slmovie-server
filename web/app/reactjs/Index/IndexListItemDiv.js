/**
 * Created by BaoJun on 2017/3/7.
 */
import React from 'react';
import {render} from 'react-dom';
import HtmlCode from '../Service/HtmlCode.js'

const width = 120
let movie = {};

export default class IndexListItemDiv extends React.Component {
    render() {
        movie = this.props.movie
        return (
            <li style={Styles.Item}>
                <a style={Styles.A} onClick={(e) => this._detail(e)}>
                    <img src={movie.post} style={Styles.Image} alt={movie.name}/>
                    <text style={Styles.TextYear}>
                        {movie.year}
                    </text>
                    <text style={Styles.TextDB}>
                        {movie.douban}
                    </text>
                </a>
                <div style={Styles.NameDiv}>
                    <a style={Styles.TextName} onClick={(e) => this._detail(e)}>{movie.name}</a>
                </div>
            </li>
        )
    }

    //进入详情页
    _detail() {
        let win = window.open(HtmlCode.Detail + '?address=' + this.props.movie.address, '_blank');
        win.focus();
    }

}

const Styles = {
    Item: {
        textAlign: 'center',
        float: 'left',
        width: width,
        height: width * 5 / 3,
        paddingRight: 17,
    },
    A: {
        width: width,
        height: width * 180 / 130,
        position: 'relative',
        display: 'flex',
    },
    Image: {
        width: width,
        height: width * 180 / 130,
        display: 'block',
        overflow: 'hidden',
    },
    TextYear: {
        position: 'absolute',
        overflow: 'hidden',
        color: '#ffffff',
        fontSize: 13,
        textAlign: 'center',
        backgroundColor: '#000000',
        paddingLeft: 5,
        paddingRight: 5,
        left: 0,
    },
    TextDB: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        color: '#ffffff',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: '#000000',
        paddingLeft: 5,
        paddingRight: 5,
    },
    NameDiv: {
        width: width,
        align: 'center',
    },
    TextName: {
        fontSize: 14,
        color: '#05d',
        textAlign: 'center',
    }
}