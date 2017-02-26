/**
 * Created by BaoJun on 2017/2/26.
 */
import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery'

export default class DeclareDiv extends React.Component {
    render() {
        return (
            <div style={Styles.Content}>
                <text style={Styles.Text}>
                    免责声明:本站所有视频均来自互联网收集而来，版权归原创者所有，如果侵犯了你的权益，请通知我们，我们会及时删除侵权内容，谢谢合作！Copyright @2017 双龙影视
                </text>
            </div>
        )
    }
}

const Styles = {
    Content: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        backgroundColor: '#000000'
    },
    Text: {
        fontSize: 15,
        color: '#ffffff',
    }
}

render(<DeclareDiv/>, $('#declare')[0])