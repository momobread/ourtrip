const Tootip = ({ children, text }) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute translate-y-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-2 group-hover:opacity-100">
        {text}
      </div>
    </div>
  );
};
export default Tootip;
