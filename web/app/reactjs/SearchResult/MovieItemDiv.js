/**
 * Created by BaoJun on 2017/2/15.
 */
import React from 'react';
import {render} from 'react-dom';
import HtmlCode from '../Service/HtmlCode.js'

const width = 200
let movie = {};
export default class MovieItemDiv extends React.Component {

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
                        {movie.db}
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
        let win = window.open(HtmlCode.Detail + '?address=' + this.props.movie.address + '&from=' + this.props.movie.from, '_blank');
        win.focus();
    }

}

const Styles = {
    Item: {
        textAlign: 'center',
        margin: 'auto',
        float: 'left',
        width: '25%',
    },
    A: {
        width: width,
        height: width * 180 / 130,
        position: 'relative',
        display: 'flex',
        padding: 3,
        border: 1,
        borderColor: '#F2F2F2',
        borderStyle: 'solid'
    },

    Image: {
        width: width,
        height: width * 180 / 130,
        display: 'block',
        overflow: 'hidden',
    },
    TextYear: {
        height: 20,
        width: 35,
        position: 'absolute',
        top: 4,
        left: 4,
        overflow: 'hidden',
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: '#d0d0d0'
    }, TextDB: {
        height: 20,
        width: 45,
        position: 'absolute',
        bottom: 4,
        right: 4,
        overflow: 'hidden',
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: '#d0d0d0'
    },
    NameDiv: {
        width: width,
        height: 35,
        align: 'center',
        marginTop: 5,
    },
    TextName: {
        fontSize: 16,
        color: '#05d',
        textAlign: 'center',
    }
}
