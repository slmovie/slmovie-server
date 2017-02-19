/**
 * Created by BaoJun on 2017/2/15.
 */
import React from 'react';
import {render} from 'react-dom';

const width = 200

export default class MovieItemDiv extends React.Component {
    render() {
        console.log('MovieItemDiv>>>>>' + this.props.movie)
        return (
            <li style={Styles.Item}>
                <a style={Styles.A} onClick={(e) => this._detail(e)}>
                    <img src={this.props.movie.post} style={Styles.Image} alt={this.props.movie.name}/>
                    <text style={Styles.TextYear}>
                        {this.props.movie.year}
                    </text>
                    <text style={Styles.TextDB}>
                        {this.props.movie.db}
                    </text>
                </a>
                <div style={Styles.NameDiv}>
                    <a style={Styles.TextName} onClick={(e) => this._detail(e)}>{this.props.movie.name}</a>
                </div>
            </li>
        )
    }

    //进入详情页
    _detail() {
        console.log(this.props.movie.address)
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
        fontSize: 17,
        color: '#05d',
        textAlign: 'center',
    }
}
