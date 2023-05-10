import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/datatable';

function App() {
  return (
    <div className="App">
      <DataTable columns={[]} dataSource={[]}/>
    </div>
  );
}

export default App;
