/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';

export  default  class Title extends React.Component {
    render() {
        return (
            <div style={Styles.Content}>
                <text style={Styles.Title}>双龙影视</text>
            </div>
        )
    }
}

const Styles = {
    Content: {
        marginTop: 20,
        marginBottom: 20,
    },
    Title: {
        fontSize: 49,
        fontWeight: 'bolder',
    }
}