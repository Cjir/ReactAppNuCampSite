import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';


class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
        };
    };

    renderCampsite(campsite) {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <Card>
                    <CardImg top width="100%" src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(campsite) {
        if (this.props.campsite.comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>comments</h4>
                    {
                        this.props.campsite.comments.map(comment => <div key={comment.id}><p>{comment.text} <br />--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p></div>)
                    }
                </div>
            )
        }
    }

    render() {
        if (this.props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        {(this.renderCampsite(this.props.campsite))}
                        {(this.renderComments(this.props.campsite.comments))}
                    </div>
                </div>
            )


        };

        return (
            <div />
        )
    }
}

export default CampsiteInfo;