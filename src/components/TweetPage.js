import React from "react";
import { connect } from "react-redux";

import NewTweet from "./NewTweet";
import Tweet from "./Tweet";

class TweetPage extends React.Component {
    render() {
        const { id, replies } = this.props;

        return (
            <div>
                <Tweet id={id} />

                <NewTweet id={id} />

                {
                    replies.length !== 0
                    &&
                    <h3 className="center">Replies</h3>
                }

                <ul>
                    {
                        replies.map((replyId) => (
                            <li key={replyId}>
                                <Tweet id={replyId} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps =
    ({ authedUser, tweets, users }, props) => {
        const { id } = props.match.params;

        const replies = !tweets[id]
            ?
            []
            :
            tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp);

        return {
            id,
            replies
        };
    };

export default connect(mapStateToProps)(TweetPage);
