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

  const markAsRead = async (id: string) => {
    await axios.patch(
      `http://localhost:3001/notification/${id}/mark-as-read`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setNotifications(
      notifications.map((notif) =>
        notif._id === id ? { ...notif, read: true } : notif
      )
    );
  };
  return (
    <div>
      {notifications ? (
        <div>
          {notifications.map((notif) => (
            <a
              href={notif.link}
              key={notif._id}
              onClick={() => markAsRead(notif._id)}
            >
              <div
                className={`hover:bg-slate-100 text-sm p-2 mb-[2px] rounded ${
                  notif.read ? '' : 'bg-slate-50'
                }`}
              >
                <p>{notif.message} </p>{' '}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div>No notifications</div>
      )}{' '}
    </div>
  );
}

export default Notifications;
