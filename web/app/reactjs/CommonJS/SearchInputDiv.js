/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';

export default class SearchInput extends React.Component {

    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <div>
                <text>影视搜索</text>
                <input style={Styles.Input} onChange={(e) => this._inputChanged(e)}/>
                <button style={Styles.Search} onClick={() => this._openSearchResult()}>搜索</button>
            </div>
        )
    }

    //打开搜索结果界面
    _openSearchResult() {
        let win = window.open('http://localhost:9080/app/html/SearchResult.html?name=' + this.state.input, '_blank');
        win.focus();
    }

    //获取输入结果
    _inputChanged(e) {
        this.setState({input: e.target.value})
    }
}

const Styles = {
    Text: {
        fontSize: 22,
    },
    Input: {
        fontSize: 20,
        marginLeft: 20,
        width: '50%'
    },
    Search: {
        fontSize: 20,
        marginLeft: 20,
    }
}