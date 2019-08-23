import React, {Component} from 'react';
import './com.css';

export default class Message extends Component{
    render(){
        return(
        <div className='message'>
            <span className = 'massage_author'>
               <h4 className='textUserName'> {this.props.message.userName} :</h4>
            </span>

            {this.props.message.message}
        </div>
        );
    };
}
