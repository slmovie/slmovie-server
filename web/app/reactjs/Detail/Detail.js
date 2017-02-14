/**
 * Created by BaoJun on 2017/2/14.
 */
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Title from '../CommonJS/TitleDiv.js'
export default class Index extends React.Component {
    render() {
        return (
            <div style={Styles.Content}>
                <Title/>
            </div>
        );
    }
}

const Styles = {
    Content: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

render(<Index/>, $('#detail_body')[0])