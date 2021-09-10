import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { handleToggleTweet } from "../actions/tweets";

import { formatTweet, formatDate } from "../utils/helpers";

import {
    TiArrowBackOutline,
    TiHeartOutline,
    TiHeartFullOutline
} from "react-icons/ti";


class Tweet extends React.Component {
    toParent = (evt, id) => {
        evt.preventDefault();

        this.props.history.push(`/tweet/${id}`);
    };

    handleLike = (evt) => {
        evt.preventDefault();

        const { dispatch, tweet, authedUser } = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }));
    }

    render() {
        if (this.props.tweet === null) {
            return <p>This Tweet does not exist.</p>
        }

        const {
            id,
            name,
            avatar,
            timestamp,
            text,
            hasLiked,
            likes,
            replies,
            parent
        } = this.props.tweet;

        return (
            <Link to={`/tweet/${id}`} className="tweet">
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className="avatar"
                />
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {
                            parent && (
                                <button
                                    className="replying-to"
                                    onClick={(evt) => this.toParent(evt, parent.id)}
                                >
                                    Replying to @{parent.author}
                                </button>
                            )
                        }
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies !== 0 && replies}</span>
                        <button
                            className="heart-button"
                            onClick={this.handleLike}
                        >
                            {
                                hasLiked === true
                                    ?
                                    <TiHeartFullOutline className="tweet-icon" color="#e0245e" />
                                    :
                                    <TiHeartOutline className="tweet-icon" />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    const formattedTweet = tweet ?
        formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null;

    return {
        authedUser,
        tweet: formattedTweet
    };
};

export default withRouter(connect(mapStateToProps)(Tweet));