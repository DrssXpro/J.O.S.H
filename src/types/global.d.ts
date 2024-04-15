import { MessageInstance } from "antd/es/message/interface";
import { NotificationIntance } from "antd/es/notification/interface";

declare global {
	interface Window {
		$message: MessageInstance;
		$notification: NotificationIntance;
	}
}
