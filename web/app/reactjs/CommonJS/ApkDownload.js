/**
 * Created by 包俊 on 2018/5/18.
 */
import React from 'react';

export default class ApkDownload extends React.Component {
    render() {
        return (
            <div style={Styles.Content}>
                <a style={Styles.Button} href={"http://www.slys.ml/app/slys.apk"}>安卓APP下载</a>
            </div>
        )
    }
}

const Styles = {
    Content: {
        marginTop: 5,
        marginBottom: 15,
    },
    Button: {
        fontSize: 15,
    }
}