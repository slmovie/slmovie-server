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
        let win = window.open(HtmlCode.Detail + '?address=' + this.props.movie.id, '_blank');
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
        position: 'absolute',
        overflow: 'hidden',
        color: '#ffffff',
        fontSize: 13,
        textAlign: 'center',
        backgroundColor: '#000000',
        paddingLeft: 5,
        paddingRight: 5,
        left: 4,
        top: 4,
    }, TextDB: {
        position: 'absolute',
        bottom: 4,
        right: 4,
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
