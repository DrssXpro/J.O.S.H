import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";

declare global {
	interface Window {
		$message: MessageInstance;
		$notification: NotificationInstance;
	}
}
