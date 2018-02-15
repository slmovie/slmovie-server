/**
 * Created by BaoJun on 2017/3/11.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import DyjyDetail from './DyjyDetail.js'
import TtbtDetail from './TtbtDetail.js'

class Detail extends React.Component {

    render() {
        return (<DyjyDetail/>)
    }
}

render(
    <Detail/>, $('#detail_body')[0]
)