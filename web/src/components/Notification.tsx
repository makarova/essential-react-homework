import { Snackbar } from '@mui/material';
import { type Notification, NotificationType } from '../types/notification.ts';

interface NotificationProps {
  notification: Notification;
  onClose: () => void;
  open: boolean;
}
export default function ActionNotification({
  notification,
  open,
  onClose,
}: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      color={notification.type == NotificationType.SUCCESS ? 'info' : 'warning'}
      message={notification.message}
    />
  );
}
