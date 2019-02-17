import React from 'react';

export default function TrackerDashboard(props) {
 return <h1>This is a tracker dashboard for {props.match.params.name}</h1>;
}
