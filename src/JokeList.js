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
        this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes')) || [] ,
        loading: false
    };
    }

    componentDidMount = async() => {
        if(this.state.jokes.length === 0) this.getJokes();
        
    }

    getJokes = async() => {
        let jokes = this.state.jokes;
        let n = this.props.numJokesToGet;
        while (n-- > 0) {
            console.log("waiting time ...", n, "seconds");
            let res = await axios.get('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' }
            });
            jokes.push({id : uuidv4(), text : res.data.joke, votes: 0});
        }
        console.log(jokes);
        this.setState({ jokes: jokes , loading: false});
        window.localStorage.setItem('jokes', JSON.stringify(jokes));
    }

    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        }),
        () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)) 
        );
    }

    handleClick = () => {
        this.setState({loading: true}, this.getJokes);
    }

    render() {
        if(this.state.loading || !this.state.jokes.length){
            return (
                <div className='JokeList-spinner'>
                    <i className='far fa-8x fa-laugh fa-spin' />
                    <h1 className='JokeList-title'>Loading...</h1>
                </div>
            )
        }

        console.log(this.state.jokes)
        return (
        <div className='JokeList'>
            <div className='JokeList-Sidebar'>
                <h1 className='JokeList-title'>Joke List- <i> DAD JOKES</i></h1>
                <button onClick={this.handleClick}>Add new JOKE</button>
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
