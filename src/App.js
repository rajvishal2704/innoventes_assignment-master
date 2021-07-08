import './App.css';
import Counter from './Components/counterComponent';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Counter />
      <ToastContainer
        position="top-center"
        style={{ top: '0px', padding: '0' }}
        autoClose={3000}
        className={"toaster"}
      />
    </div>
  );
}

export default App;
