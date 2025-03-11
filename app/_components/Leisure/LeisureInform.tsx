import Image from 'next/image';

interface LeisureInformProps {
  data: string;
}
const LeisureInform = ({ data }: LeisureInformProps) => {
  return (
    <div className="relative h-[500rem] w-screen sm:w-[64%]">
      <Image src={data} fill alt={data} />
    </div>
  );
};
export default LeisureInform;
