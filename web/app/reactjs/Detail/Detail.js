/**
 * Created by BaoJun on 2017/3/11.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import DyjyDetail from './DyjyDetail.js'
import TtbtDetail from './TtbtDetail.js'

class Detail extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         from: '',
    //         code: '',
    //     }
    // }
    //
    // componentDidMount() {
    //     this.setState({from: window.location.href.split('=')[2]})
    // }

    render() {
        // if (this.state.from == 'dyjy') {
        return (<DyjyDetail/>)
        // } else if (this.state.from == 'ttbt') {
        //     return (<TtbtDetail/>)
        // } else {
        //     return (<text>111</text>)
        // }
    }
}

render(
    <Detail/>, $('#detail_body')[0]
)