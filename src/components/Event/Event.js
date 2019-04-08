import React from 'react';

const event = (props) => {
  const styles = {
    backgroundColor: props.event.backgroundColor,
    padding: '5px'
  }
  return (
    <div>
      <div style={styles}>{props.event.title}</div>
    </div>
  );
}

export default event;