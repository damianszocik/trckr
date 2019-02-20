import React from 'react';

export default function CategoryDashboard(props) {
 return <h1>Category dashboard for: {props.match.params.name}</h1>;
}
