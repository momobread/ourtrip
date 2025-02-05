'use client';

import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="spinner">
      <ClipLoader color="#ffffff" />
    </div>
  );
}

export default Loader;
