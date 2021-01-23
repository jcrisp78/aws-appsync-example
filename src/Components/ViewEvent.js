import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import moment from 'moment';

import QueryGetEvent from "../GraphQL/QueryGetEvent";
import EventComments from "./EventComments";

class ViewEvent extends Component {

  componentDidMount() {
    document.title = 'View Event';
  }

    render() {
        const { event, loading } = this.props;

        return (
          <main>
            <div className={`ui container raised very padded segment ${loading ? 'loading' : ''}`}>
                <Link to="/" className="ui button">Back to events</Link>
                <div className="ui items">
                    <div className="item">
                        {event && <div className="content">
                            <h1>
                              <div className="header">{event.name}</div>
                            </h1>
                            <div className="item"><i className="icon calendar"></i>{moment(event.when).format('LL')}</div>
                            <div className="item"><i className="icon clock"></i>{moment(event.when).format('LT')}</div>
                            <div className="item"><i className="icon marker"></i>{event.where}</div>
                            <div className="description">{event.description}</div>
                            <div className="item">
                                <EventComments eventId={event.id} comments={event.comments} />
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
          </main>
        );
    }

}

const ViewEventWithData = graphql(
    QueryGetEvent,
    {
        options: ({ match: { params: { id } } }) => ({
            variables: { id },
            fetchPolicy: 'cache-and-network',
        }),
        props: ({ data: { getEvent: event, loading} }) => ({
            event,
            loading,
        }),
    },
)(ViewEvent);

export default ViewEventWithData;
