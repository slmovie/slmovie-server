/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';
import HtmlCode from '../Service/HtmlCode.js'

const hint = '影片名/ 明星/ 导演/ imdb'

export default class SearchInput extends React.Component {

    constructor() {
        super()
        this.state = {
            input: '影片名/ 明星/ 导演/ imdb'
        }
    }

    render() {
        return (
            <div>
                <text style={Styles.Text}>影视搜索</text>
                <input style={Styles.Input} onChange={(e) => this._inputChanged(e)} value={this.state.input}
                       onFocus={(e) => this._inputValue(e)}
                       onKeyDown={(e) => this._enterPress(e)}/>
                <button style={Styles.Search} onClick={() => this._openSearchResult()}>搜索</button>
            </div>
        )
    }

    //回车
    _enterPress(e) {
        if (e.charCode == 13) {
            this._openSearchResult()
        }
        if (e.keyCode == 13) {
            this._openSearchResult()
        }
    }

    //打开搜索结果界面
    _openSearchResult() {
        let win = window.open(HtmlCode.SearchResult + '?name=' + this.state.input, '_blank');
        win.focus();
    }

    //获取输入结果
    _inputChanged(e) {
        this.setState({input: e.target.value})
    }

    //去除hint
    _inputValue(e) {
        if (e.target.value == hint) {
            e.target.style.color = '#000000'
            this.setState({input: ''})
        }
    }
}

const Styles = {
    Text: {
        fontSize: 20,
        width: '25%',
    },
    Input: {
        fontSize: 20,
        marginLeft: 50,
        width: '50%',
        color: '#d0d0d0',
    },
    Search: {
        fontSize: 20,
        backgroundColor: '#FF0000',
        border: 'null',
        color: '#ffffff',
        marginLeft: 50,
    }
}