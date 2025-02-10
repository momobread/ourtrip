'use client';

import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="spinner">
      <ClipLoader color="#000" size={150} />
    </div>
  );
}

export default Loader;
