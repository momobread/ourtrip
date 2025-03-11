'use client';

import { addDays, format, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CustomDate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  useEffect(() => {
    if (range === undefined || range.from === undefined || range.to === undefined) return;
    const params = new URLSearchParams(searchParams);
    params.set('checkIn', `${format(range?.from, 'yyyy-MM-dd')}`);
    params.set('checkOut', `${format(range?.to, 'yyyy-MM-dd')}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, []);

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!newRange) return;
    if (!newRange.from) return;

    setRange({
      from: newRange.from,
      to: newRange.to ?? addDays(newRange.from, 1),
    });
  };

  const handleClick = () => {
    if (range === undefined || range.from === undefined || range.to === undefined) return;
    const params = new URLSearchParams(searchParams);
    params.set('checkIn', `${format(range?.from, 'yyyy-MM-dd')}`);
    params.set('checkOut', `${format(range?.to, 'yyyy-MM-dd')}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  // console.log(range);
  return (
    <div className="mb-[3rem] flex flex-col items-center justify-center rounded-xl bg-primary-50 px-[3rem] py-[2rem] sm:px-0 sm:py-[3rem]">
      <DayPicker
        locale={ko}
        mode="range"
        selected={range}
        style={{ borderRadius: '0.7rem', padding: '2rem', backgroundColor: 'white' }}
        numberOfMonths={2}
        onSelect={handleSelect}
        min={1}
        classNames={{
          today: ' font-bold text-sky-400 ', //
          selected: '',
          range_start: 'bg-amber-200 text-amber-500 font-bold rounded-l-full',
          range_middle: 'bg-amber-200 ',
          range_end: 'bg-amber-200 text-amber-500 font-bold rounded-r-full',
        }}
        disabled={(date) => date < subDays(new Date(), 1)}
      />
      <div className="flex flex-col">
        <span className="text-[1.5rem] sm:text-[2rem]">선택된날짜</span>
        <span className="text-[1.5rem] sm:text-[2rem]">
          {format(`${range?.from}`, 'yyyy-MM-dd')} ~ {format(`${range?.to}`, 'yyyy-MM-dd')}
        </span>
        <button className="rounded-lg bg-primary-300 p-[1rem] text-white" onClick={handleClick}>
          검색하기
        </button>
      </div>
    </div>
  );
};
export default CustomDate;
