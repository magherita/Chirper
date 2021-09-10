import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { handleAddTweet } from "../actions/tweets";

class NewTweet extends React.Component {
    state = {
        text: "",
        toHome: false
    };

    handleChange = (evt) => {
        const text = evt.target.value;

        this.setState(() => ({
            text
        }));
    };

    handleSubmit = (evt) => {
        evt.preventDefault();

        const { text } = this.state;
        const { dispatch, id } = this.props;

        dispatch(handleAddTweet(text, id));

        this.setState(() => ({
            text: "",
            toHome: id ? false : true
        }));
    };

    render() {
        const { text, toHome } = this.state;

        if (toHome === true) {
            return <Redirect to="/" />
        }

        const maxLength = 280;
        const tweetLeft = maxLength - text.length;

        return (
            <div>
                <h3 className="center">Compose new Tweet</h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <textarea
                        className="textarea"
                        maxLength={maxLength}
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                    />
                    {
                        tweetLeft <= 100
                        &&
                        (
                            <div className="tweet-length">
                                {tweetLeft}
                            </div>
                        )
                    }
                    <button
                        className="btn"
                        type="submit"
                        disabled={text === ""}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(NewTweet);