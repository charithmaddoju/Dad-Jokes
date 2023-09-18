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
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    }

       

    componentDidMount = async() => {
        if(this.state.jokes.length === 0) this.getJokes();
        
    }

    getJokes = async() => {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            console.log("Jokes retrived...", jokes.length)
            let res = await axios.get('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' }
            });

            let newJoke = res.data.joke;
            if(!this.seenJokes.has(newJoke)){
                this.seenJokes.add(newJoke);
                console.log("NEW JOKE")
                jokes.push({id: uuidv4(), text: newJoke, votes: 0});
            }else{
                console.log("FOUND A DUPLICATE");
                console.log(newJoke);
            }
        }
        console.log(jokes);
        this.setState({ jokes: [...this.state.jokes,...jokes] , loading: false});
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
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
        return (
        <div className='JokeList'>
            <div className='JokeList-Sidebar'>
                <h1 className='JokeList-title'>Joke List- <i> DAD JOKES</i></h1>
                <button onClick={this.handleClick}>Add new JOKE</button>
            </div>
            <div className='JokeList-Jokes'>
                {jokes.map((j,index) => (
                    <Joke number={index} key={j.id} text={j.text} votes={j.votes} upVote = {() => this.handleVote(j.id,1)} downVote = {() => this.handleVote(j.id,-1)}/>
                ))}
            </div>
        </div>
        );
    }
}

export default JokeList;
