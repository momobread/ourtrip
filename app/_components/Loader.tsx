'use client';

import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="mt-[15rem] flex h-[80vh] w-full justify-center">
      <ClipLoader color="#000" size={150} />
    </div>
  );
}

export default Loader;
