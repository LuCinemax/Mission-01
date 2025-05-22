
import {Routes,Route} from 'react-router-dom';
import VIRT from './pages/VIRT';

function App() {

  return (
    <>
      <Routes>
        <Route path="/VIRT" element={<VIRT />} />
      </Routes>
    </>
  );
}

export default App
