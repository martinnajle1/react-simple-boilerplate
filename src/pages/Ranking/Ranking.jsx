import React from 'react';

const data = [
  {'name': 'Martin', 'score': 1000},
  {'name': 'Sabrina', 'score': 900},
  {'name': 'Juan', 'score': 800},
  {'name': 'Jose', 'score': 700},
  {'name': 'Luisa', 'score': 600},
  {'name': 'Carlos', 'score': 500},
  {'name': 'Pablo', 'score': 400},
  {'name': 'Marina', 'score': 300}
];

const ranking = () => {
  return (
    <div style={{ 'background-color': 'rgba(227, 242, 255, 0.6)',
      'padding': '20px',
      'border': '1px solid lightblue',
      'border-radius': '10px'}}
    >
      <h1>RANKING:</h1>
      { data.map((person, index) =>
        <h1
          style={{
            'text-align': 'center',
            'padding': '5px',
            'display': 'block',
            'margin': 'auto'}}
          key={person.name + index}
        >
          <strong>({index + 1})</strong> {person.name} -- {person.score}
        </h1>)
      }
    </div>
  );
};
export default ranking;
