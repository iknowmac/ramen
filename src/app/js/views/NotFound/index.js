import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render () {
    return (
      <div className='container text-center'>
        <h2>This is a demo 404 page!</h2>
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}
