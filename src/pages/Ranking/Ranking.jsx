import React from 'react';

const data = [
  { name: 'Martin', score: 1000 },
  { name: 'Sabrina', score: 900 },
  { name: 'Juan', score: 800 },
  { name: 'Jose', score: 700 },
  { name: 'Luisa', score: 600 },
  { name: 'Carlos', score: 500 },
  { name: 'Pablo', score: 400 },
  { name: 'Marina', score: 300 },
];

const ranking = (props) => {
  return <div>
	  { data.map((person, index) => <span key={person.name+index}>{person.name} -- {person.score}</span>) }
	</div>;
};
export default ranking;