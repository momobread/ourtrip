'use client';

import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="flex w-full justify-center">
      <ClipLoader color="#000" size={150} />
    </div>
  );
}

export default Loader;
