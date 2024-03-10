'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/utils/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const [value, setValue] = useState('');
  const [itemDisplay, setItemDisplay] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  // custom hook
  const { setItem, getItem, removeItem } = useLocalStorage('value');

  // useEffect(() => {
  //   const updateData = async () => {
  //     const updatedData = await getItem();
  //     setItemDisplay(updatedData);
  //   };
  //   updateData();
  //   //  eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isUpdated]);

  const updateData = async () => {
    const updatedData = await getItem();
    setItemDisplay(updatedData);
  };

  useEffect(() => {
    updateData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = async () => {
    try {
      if (value.trim() !== '') {
        const generateId = Math.floor(Math.random() * 1000);
        const payload = {
          id: generateId,
          comment: value,
          missionId: 'your_mission_id',
        };
        setItem(payload);
        // setIsUpdated(true);
        updateData();
        setValue('');
      } else return;
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

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleAddItem}>Set</Button>
      <Button onClick={removeItem}>Remove</Button>
      <div>
        {itemDisplay.map((item: any) => (
          <div key={item.id} onClick={() => handleRemoveComment(item.id)}>
            {item.comment}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
