/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
import SearchInput from '../CommonJS/SearchInputDiv.js'
import MoviesList from './MoviesListDiv.js'
import ReqUrl from '../Service/ReqUrl.js'
import Config from '../Service/Config'

let input
let dyjyMovies
const everyPage = 24
let lastPage = 0
class SearchResult extends React.Component {

    constructor() {
        super()
        this.state = {
            // dyjyMovies: '',
            // ttbtMovies: '',
            showMovies: '',
            index: 1,
            PageMoreEnd: {},
        }
    }

    componentDidMount() {
        input = window.location.href.split('=')[1]
        document.title = '双龙影视 ' + decodeURI(input)
        this._getDyjyMovies()
        // this._getTTBTMovies()
    }

    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
                <SearchInput/>
                <div style={{marginTop: 30, overflow: 'hidden'}}>
                    {this._renderMovies()}
                    {this._getPageList()}
                </div>
            </div>
        );
    }

    //渲染电影列表
    _renderMovies() {
        return (
            <div>
                <MoviesList movies={this.state.showMovies} title=''/>
                {/*<MoviesList movies={this.state.ttbtMovies} title='天堂BT'/>*/}
            </div>
        )
    }

    //获取电影列表
    _getDyjyMovies() {
        let request = $.ajax({
            url: ReqUrl.SearchDYJY + '?name=' + input,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            async: false,
        })
        request.done(function (msg) {
            // Config.log('_getDyjyMovies', JSON.stringify(msg))
            dyjyMovies = JSON.parse(JSON.stringify(msg))
            // this.setState({dyjyMovies: JSON.parse(JSON.stringify(msg))})
            this._getShowMovies()
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error('_getMovies', textStatus);
            let error = '{"dyjy":{"status":{"code":0}}}'
            this.setState({showMovies: error})
        }.bind(this));
    }

    //获取电影列表
    _getTTBTMovies() {
        let request = $.ajax({
            url: ReqUrl.SearchTTBT + '?name=' + input,
            method: "GET",
            dataType: "json",
            timeout: 10000,
            async: false,
        })
        request.done(function (msg) {
            Config.log('_getMovies', JSON.parse(JSON.stringify(msg)))
            this.setState({ttbtMovies: JSON.parse(JSON.stringify(msg))})
        }.bind(this));

        request.fail(function (jqXHR, textStatus) {
            Config.error('_getMovies', textStatus);
            let error = '{"dyjy":{"status":{"code":0}}}'
            this.setState({ttbtMovies: error})
        }.bind(this));
    }

    //分组显示
    _getShowMovies() {
        if (dyjyMovies != '' && dyjyMovies.status.code == 1 && dyjyMovies.movies.length > everyPage) {
            let allMovies = dyjyMovies.movies.slice()
            lastPage = Math.ceil(allMovies.length / everyPage)
            let temp = {}
            for (let key in dyjyMovies) {
                temp[key] = dyjyMovies[key]
            }
            let tempMovies = []
            let start = (this.state.index - 1) * everyPage
            for (start; start < this.state.index * everyPage; start++) {
                if (start < allMovies.length) {
                    tempMovies.push(allMovies[start])
                }
            }
            temp.movies = tempMovies
            if (lastPage < 5) {
                this.setState({showMovies: temp})
                this.setState({PageMoreEnd: {display: 'none'}})
            } else {
                this.setState({showMovies: temp})
            }
            // Config.log('_getShowMovies length', tempMovies.length)
        } else {
            this.setState({showMovies: dyjyMovies})
        }
    }

    //页数按钮列表
    _getPageList() {
        if (lastPage != 0) {
            return (
                <div style={{marginTop: 20, marginLeft: 'auto', marginRight: 'auto', width: 380}}>
                    <button style={Styles.PageButton} onClick={() => this._prePage()}>上一页</button>
                    {this._getPage()}
                    <text style={this.state.PageMoreEnd}>......</text>
                    <button style={Styles.PageButton} onClick={() => this._nextPage()}>下一页</button>
                </div>
            )
        }
    }

    //页数按钮
    _getPage() {
        let list = []
        let temp = this.state.index;
        let totlePage = lastPage < 5 ? lastPage : 5
        if (totlePage == 5) {
            if (temp > lastPage - 5) {
                temp = lastPage - 4
            }
            for (let i = 0; i < 5; i++) {
                list.push(<button style={this._chosenPage(temp)} onClick={(e) => this._toPage(e)}
                                  value={temp}>{temp}</button>)
                temp++
            }
        } else {
            temp = 1
            for (let i = 0; i < totlePage; i++) {
                list.push(<button style={this._chosenPage(temp)} onClick={(e) => this._toPage(e)}
                                  value={temp}>{temp}</button>)
                temp++
            }
        }
        return list
    }

    //上一页
    _prePage() {
        if (this.state.index > 1) {
            this.setState({index: this.state.index - 1}, () => {
                if (this.state.index <= lastPage - 4) {
                    this.setState({PageMoreEnd: {}})
                }
                this._getShowMovies()
            })
        }

    }

    //下一页
    _nextPage() {
        if (this.state.index < lastPage) {
            this.setState({index: this.state.index + 1}, () => {
                this._getShowMovies()
                if (this.state.index >= lastPage - 4) {
                    this.setState({PageMoreEnd: {display: 'none'}})
                }
            })

        }
    }

    //具体页数
    _toPage(e) {
        this.setState({index: e.target.value}, () => {
            this._getShowMovies()
            if (this.state.index >= lastPage - 4) {
                this.setState({PageMoreEnd: {display: 'none'}})
            } else {
                this.setState({PageMoreEnd: {}})
            }
        })
    }

    //当前页变色
    _chosenPage(temp) {
        let style = {}
        for (let key in Styles.PageButton) {
            style[key] = Styles.PageButton[key]
        }
        if (this.state.index == temp) {
            style['backgroundColor'] = 'skyblue'
        } else {
            style['backgroundColor'] = 'white'
        }
        return style
    }

}

const Styles = {
    Content: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    PageButton: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
    }
}

render(<SearchResult/>, $('#searchResult_body')[0])