/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import SearchInput from '../CommonJS/SearchInputDiv.js'
export default class SearchResult extends React.Component {

    constructor() {
        super()
        this.state = {
            input: window.location.href.split('=')[1]
        }
    }

    componentDidMount() {
        this._getMovies()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <SearchInput/>
            </div>
        );
    }

    _getMovies() {
        console.log(this.state.input)
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    console.log(ajax.responseText);
                } else {
                    console.error(ajax.statusText);
                }
            }
        };
        ajax.onerror = function (e) {
            console.error(ajax.statusText);
        };
        ajax.open('GET', 'http://localhost:3000/search/all?name=' + this.state.input, true);
        ajax.send('name=' + this.state.input)
    }

}

const Styles = {
    Content: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<SearchResult/>, $('#searchResult_body')[0])