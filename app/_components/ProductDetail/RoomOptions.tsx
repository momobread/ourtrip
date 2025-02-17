import Image from 'next/image';

const RoomOptions = () => {
  return (
    <div className="flex flex-col items-center bg-slate-300">
      <div className="w-[60%]">
        <span>객실선택</span>

        <div className="flex justify-between gap-[1rem]" id="calender">
          <p className="w-[50%] border border-primary-800">03.02~03.03 / 1박</p>
          <p className="w-[50%] border border-primary-800">성인 2</p>
        </div>
        <div>
          <div className="relative h-[20rem] w-[40%]">
            <Image src="/bg.jpeg" alt="hellio" fill />
          </div>
          <div>
            <span>럭셔리 스위트</span>
            <p>
              <span>입실 13</span>
              <span>퇴실 15</span>
            </p>
            <span>가격 : 1000000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomOptions;
