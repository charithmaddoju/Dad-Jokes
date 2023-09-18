import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    

    render() {
        return (
            <div className='Joke'>
                <div className='Joke-number'>
                    {this.props.number + 1}
                </div>
                <div className='Joke-buttons'>
                    <i
                    onClick={this.props.upVote} 
                    className='fas fa-arrow-up' />
                    <span>{this.props.votes}</span>
                    <i
                    onClick={this.props.downVote}
                    className='fas fa-arrow-down' />
                </div>
                
                <div className='Joke-text'>{this.props.text}
                </div>
            </div>
        );
    }
}

export default Joke;