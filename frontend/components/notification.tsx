'use client';
import { useAuth } from '@/app/provider';
import { NotificationType } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/notification/user/${user?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    };
    fetchData();
  }, [user, token]);
  return (
    <div>
      {notifications ? (
        <div>
          {notifications.map((notif) => (
            <div key={notif._id}>
              <p>{notif.message} </p>{' '}
            </div>
          ))}
        </div>
      ) : (
        <div>No notifications</div>
      )}{' '}
    </div>
  );
}

export default Notifications;
