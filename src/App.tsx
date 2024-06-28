// src/App.tsx
import React from 'react';
import EditorComponent from './components/EditorComponent';

const App: React.FC = () => {
  const handleSave = (data: any) => {
    console.log('Saved data:', data);
  };

  return (
    <div className="App">
      <EditorComponent onSave={handleSave} />
    </div>
  );
};

export default App;
