'use client';
import { useAuth } from '@/app/provider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function NotificationCount() {
  const [count, setCount] = useState<number>(0);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/notification/user/${user?._id}/count`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [user, token]);

  return count === 0 ? null : (
    <div className="absolute top-0 right-0 flex items-center justify-center rounded-full bg-red-600 size-4 text-xs text-white">
      {count}
    </div>
  );
}

export default NotificationCount;
