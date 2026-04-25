export const enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Notification {
  type: NotificationType;
  message: string;
}
