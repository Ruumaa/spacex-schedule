'use client';

import { LaunchesUpcoming } from '@/utils/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Clock, Rocket, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocalStorage } from '@/utils/useLocalStorage';

type Props = {
  data: LaunchesUpcoming[];
};

function CardSchedule({ data }: Props) {
  const [value, setValue] = useState('');
  const [itemDisplay, setItemDisplay] = useState([]);
  const [comments, setComments] = useState<Record<string, string>>({});

  // custom hook
  const { setItem, getItem, removeItem } = useLocalStorage('comment');

  const updateData = async () => {
    const updatedData = await getItem();
    setItemDisplay(updatedData);
  };

  useEffect(() => {
    updateData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddComment = async (missionId: string) => {
    try {
      const generateId = Math.floor(Math.random() * 1000);
      const payload = {
        id: generateId,
        comment: comments[missionId],
        missionId: missionId,
      };
      setItem(payload);
      updateData();
      setComments({});
    } catch (error) {
      console.error('error at handleAddItem', error);
    }
  };

  const handleRemoveComment = async (idComment: number) => {
    try {
      const currentComments = await getItem();
      const updatedComments = currentComments.filter(
        (comment: any) => comment.id !== idComment
      );
      window.localStorage.setItem('comment', JSON.stringify(updatedComments));
      // setIsUpdated(true);
      updateData();
    } catch (error) {
      console.error('Error at handlRemoveComment', error);
    }
  };

  const parsedDate = (launchDate: string) => {
    const date = parseISO(launchDate);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedTime = format(date, 'HH:mm');
    return { formattedDate, formattedTime };
  };

  const filteredComment = (missionId: string) => {
    return itemDisplay.filter(
      (comment: any) => comment.missionId === missionId
    );
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    setComments((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <div>
      {' '}
      <div className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Upcoming Launches
        </h1>
        {/* Grid */}
        <div className="grid mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {/* Card */}
          {data.map((data: LaunchesUpcoming) => (
            <div className="relative" key={data.id}>
              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <CardTitle className="">{data.mission_name}</CardTitle>
                  <div className="py-1.5 md:py-3 flex flex-col gap-y-1.5 md:gap-y-3">
                    <h1 className="font-semibold md:text-lg text-gray-600 dark:text-gray-300">
                      Launches Schedule
                    </h1>
                    <CardDescription className="flex items-center gap-x-1.5 ">
                      <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      {parsedDate(data.launch_date_utc).formattedDate}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-x-1.5">
                      <Clock className="w-5 h-5 text-primary text-gray-700 dark:text-gray-300" />
                      {parsedDate(data.launch_date_utc).formattedTime}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-4 -mt-3">
                  <h1 className="font-semibold md:text-lg text-gray-600 dark:text-gray-300">
                    Rocket Overview
                  </h1>
                  <Link
                    href={data.rocket.rocket.wikipedia}
                    className="hover:bg-secondary/80 transition-all duration-200 ease-in-out"
                  >
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <Rocket className=" w-7 h-7" />
                      <div className="flex-1 space-y-0.5">
                        <p className="text-sm font-medium leading-none">
                          {data.rocket.rocket.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.rocket.rocket.country}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Success Rate : {data.rocket.rocket.success_rate_pct}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Launch Cost : $
                          {data.rocket.rocket.cost_per_launch.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="relative w-full flex items-center justify-between">
                    <Input
                      value={comments[data.id] || ''}
                      onChange={(e) => handleChangeInput(e, data.id)}
                      type="text"
                      placeholder="What are your thoughts?"
                      className="w-3/4"
                    />
                    <Button onClick={() => handleAddComment(data.id)}>
                      Add
                    </Button>

                    {/* Comment Section */}
                  </div>
                  <div className=" w-full text-start my-3 md:my-4 flex flex-col gap-y-1">
                    {!filteredComment(data.id).length ? (
                      ''
                    ) : (
                      <>
                        {' '}
                        <h1 className="font-semibold md:text-lg text-gray-600 dark:text-gray-300 mb-3">
                          Notes
                        </h1>
                        {filteredComment(data.id).map((item: any) => (
                          <div
                            key={item.id}
                            className="bg-secondary  rounded p-1 lg:p-2 hover:bg-secondary/80 transition-all ease-in-out duration-150 mx-2"
                          >
                            <div className="flex items-center justify-between px-2 group">
                              {item.comment}{' '}
                              <Trash2
                                className="cursor-pointer w-4 h-4 lg:w-5 lg:h-5 hover:text-red-500 transition-colors ease-in duration-150 md:scale-0 md:group-hover:scale-100"
                                onClick={() => handleRemoveComment(item.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardSchedule;
