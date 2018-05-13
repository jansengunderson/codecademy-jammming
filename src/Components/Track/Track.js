import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }

addTrack() {
  this.props.onAdd(this.props.track);
}

removeTrack() {
  this.props.onRemove(this.props.track);
}

// method to change + and - symbols
renderAction() {
  if (this.props.isRemoval) {
    return  (<a className="Track-action" onClick={this.removeTrack}>-</a>);
  } else {
    return (<a className="Track-action" onClick={this.addTrack}>+</a>);
    }
}

  render() {
    console.log('In Tracklist: ', this.props.track);
    return (
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.Name}</h3>
    <p>{this.props.track.Artist} | {this.props.track.Album}</p>
  </div>
  {this.renderAction()}
</div>

    );
  }
}

export default Track;
