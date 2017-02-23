/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'

let code, from
const width = 200

class Detail extends React.Component {

    constructor() {
        super()
        this.state = {
            movie: ''
        }
    }

    componentDidMount() {
        from = window.location.href.split('=')[2]
        code = window.location.href.split('=')[1].split('&')[0]
        document.title = '双龙影视 ' + decodeURI(code)
        this._showDetail()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <div style={{marginTop: 30}}>
                    {this._renderDetail()}
                </div>
            </div>
        );
    }

    //获取详情数据
    _showDetail() {
        let request = $.ajax({
            url: 'http://localhost:3000/detail/' + from + '?code=' + code,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            async: false,
        })
        request.done(function (msg) {
            console.log(msg.detail[0])
            this.setState({movie: msg})
        }.bind(this));
        request.fail(function (jqXHR, textStatus) {
            console.error(textStatus);
        }.bind(this));
    }

    //渲染详情页面
    _renderDetail() {
        if (this.state.movie != '') {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={this.state.movie.post} style={Styles.PostImg}/>
                    <ul style={Styles.InfoUl}>
                        {this._renderInfo()}
                    </ul>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    //渲染电影信息
    _renderInfo() {
        let info = []
        for (let i = 0; i < this.state.movie.detail.length; i++) {
            if (this.state.movie.detail[i] != '详情:')
                info.push(this._getInfo(this.state.movie.detail[i]))
        }
        return info;
    }

    //电影信息样式
    _getInfo(info) {
        return (
            <li style={Styles.InfoLi}>{info}</li>
        )
    }
}

const Styles = {
    Content: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    PostImg: {
        width: width,
        height: width * 180 / 130,
    },
    InfoUl: {
        listStyleType: 'none',
        padding: 0,
        marginLeft: 40,
        width: '50%'
    },
    InfoLi: {
        fontSize: 17,
        marginTop: 6,
    }
}


render(<Detail/>, $('#detail_body')[0])