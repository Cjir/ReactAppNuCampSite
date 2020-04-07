import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { createPortal } from 'react-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            rating: '',
            author: '',
            comment: '',
            touched: {
                modal: false,
                rating: false,
                author: false
            }
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
        this.toggle();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {

        return (
            <div>
                <Button outline className="fa fa-pencil fa-lg" onClick={this.toggle}>{this.props.buttonLabel}
                    {' '}Submit Comment
            </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name" validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea rows="6" model=".comment" id="comment" name="comment" className="form-control" />

                            </div>

                            <ModalFooter>
                                <Button type="submit" color="primary">Submit</Button>
                            </ModalFooter>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    };
}



function RenderCampsite({ campsite }) {
    return (
        <div key={campsite.id} >
            <Card>
                <CardImg top width="100%" src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments, addComment, campsiteId }) {
    if (comments) {
        return (
            <div>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text} <br />
                            --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        <RenderCampsite campsite={props.campsite} />
                    </div>
                    <div className="col-md-5 m-1">
                        <RenderComments
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;