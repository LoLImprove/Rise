import React from 'react';
import _ from 'lodash';

/*
 *  Upload Input Component
 *
 *    A component that allows you to upload files using meteor-slingshot
 *    Using this component requires to have set up a name Slingshot.Directive server-side
 *
 *    Examples:
 *
 *     <UploadInput type="upload" through="ReplayUploader" name="replay_file" required={true} />
 *
 *     <UploadInput type="upload" through="ReplayUploader" allowed={['lpr']} uploadOnChange={true}
 *                  name="replay_file" label="Add a replay file (.lpr, ...)" inputLabel="Upload" />
 *
 */

export default React.createClass({
    propTypes: {
        type:            React.PropTypes.oneOf(["upload"]).isRequired,
        name:            React.PropTypes.string.isRequired,
        through:         React.PropTypes.string.isRequired, // Slingshot.Directive name
        value:           React.PropTypes.string,
        allowed:         React.PropTypes.arrayOf(React.PropTypes.string), // An array of file extensions 
        required:        React.PropTypes.bool,
        inputLabel:      React.PropTypes.string, // The text displayed on the left side of the input
        uploadOnChange:  React.PropTypes.bool,   // If true, will upload when a file is selected
        onChange:        React.PropTypes.func,   
        uploadDidFinish: React.PropTypes.func    // Called after the upload is done
    },

    getInitialState() {
        return { fileName: null, value: null, progress: 0, error: null };
    },

    componentDidMount() {
        if (this.props.value) {
            this.setState({ fileName: this.props.value });
        }
    },

    value() {
        return this.state.value;
    },

    input() {
        return this.refs.input;
    },

    valid() {
        const file = this.refs.input.files[0];

        if (!file && !this.props.required) return true;

        if (this.props.allowed && _.isArray(this.props.allowed)) {
            let extRegexp = new RegExp(`.+\.(${this.props.allowed.join("|")})$`, "i");

            if (file.type != "" && !extRegexp.test(file.name)) {
                this.setState({
                    error: {
                        reason: 'Extension not allowed',
                        message: `file type must be ${this.props.allowed.join(', ')}`
                    }
                });

                return false;
            }
        }

        this.setState({ error: null });
        return true;
    },

    error() {
        return this.state.error;
    },

    uploader() {
        return new Slingshot.Upload(this.props.through);
    },

    upload({ done }) {
        const doneCb   = done || (() => {});
        const uploader = this.uploader();
        const file = this.refs.input.files[0];

        if (!this.valid()) {
            return;
        }

        uploader.send(this.refs.input.files[0], (error, downloadUrl) => {
            var errors = error ? { reason: error, error: uploader.xhr.response } : null;

            if (this.props.uploadDidFinish) {
                this.props.uploadDidFinish(errors, downloadUrl);
            }

            if (error) {
                this.setState({ value: downloadUrl, error: null });
            } else {
                this.setState({ value: null, error: errors });
            }

            doneCb(error, downloadUrl);

            clearInterval(_progressInterval);
        });

        var _progressInterval = setInterval(() => {
            this.setState({progress: Math.ceil((uploader.progress() || 0) * 100)});

            if (this.state.progress === 100) {
                clearInterval(_progressInterval);
            }
        }, 50);

    },

    uploadOnChange(e) {
        if (this.props.uploadOnChange) {
            this.upload();
        } else {
            this.valid();
            this.setState({ fileName: this.refs.input.value });
            this.props.onChange && this.props.onChange(e);
        }
    },

    cancel(e) {
        this.refs.input.value = "";
        this.setState({ fileName: null, value: null, error: null, progress: 0 });
    },

    render() {
        let inputText = '';

        if (this.state.error)  {
            inputText = `Error: ${this.state.error.message}`;
        } else {
            if (this.state.progress === 100) {
                inputText = 'OK.';
            } else if (this.state.progress > 0 ) {
                inputText = `${this.state.progress}%`;
            } 
        }

        return (
            <div className="input-type-upload">
                <div className="NFI-wrapper">
                    <div className="NFI-button">
                        {this.props.inputLabel ? this.props.inputLabel : 'File...'}
                        <input ref="input"
                               type="file"
                               name={_.snakeCase(this.props.name)}
                               id={_.snakeCase(this.props.name)}
                               onChange={this.uploadOnChange}
                               className={`form-control NFI-current ${this.props.className || ''}`} />
                    </div>
                    <span className="NFI-container">
                        <input type="text" readOnly="readonly" className="NFI-filename" value={this.state.progress == 0 ? this.state.fileName : ''} />
                        <span className="NFI-progress-bar" style={ ({ width: `${this.state.progress}%` }) }></span>
                        <span className={`NFI-progress-text ${this.state.error ? 'error' : ''}`}>{inputText}</span>
                        <span onClick={this.cancel} className={`NFI-cancel ${(this.state.progress == 0 && this.state.fileName) ? '' : 'hidden'}`}>x</span>
                    </span>
                </div>
            </div>
        );
    }
});
