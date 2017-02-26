/**
 * Created by BaoJun on 2017/2/14.
 */
import React from 'react';
import {render} from 'react-dom';

export  default  class Title extends React.Component {
    render() {
        return (
            <div>
                <div style={Styles.Title}>
                    <text>双龙影视</text>
                </div>
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