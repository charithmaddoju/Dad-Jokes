import React, { Component } from 'react';
import Joke from './Joke';

import './JokeList.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

class JokeList extends Component {

    static defaultProps = {
        numJokesToGet: 10
    };

    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes')) || [] };
    }

    componentDidMount = async() => {
        if(this.state.jokes.length === 0) this.getJokes();
        
    }

    getJokes = async() => {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' }
            });
            jokes.push({id : uuidv4(), text : res.data.joke, votes: 0});
        }
        console.log(jokes);
        this.setState({ jokes: jokes });
        window.localStorage.setItem('jokes', JSON.stringify(jokes));
    }

    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        }));
    }

    render() {
        return (
        <div className='JokeList'>
            <div className='JokeList-Sidebar'>
                <h1 className='JokeList-title'>Joke List</h1>
                <b><span>Dad</span> Jokes</b>
                

            </div>
            <div className='JokeList-Jokes'>
                {this.state.jokes.map((j,index) => (
                    <Joke number={index} key={j.id} text={j.text} votes={j.votes} upVote = {() => this.handleVote(j.id,1)} downVote = {() => this.handleVote(j.id,-1)}/>
                ))}
            </div>
        </div>
        );
    }
}

export default JokeList;
