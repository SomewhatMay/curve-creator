import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";
import { NotificationProps } from "ui/components/notification";
import { InputNotificationProps } from "ui/components/notification/input-notification";

interface ModalState {
	Notification: NotificationProps | undefined;
	InputNotification: InputNotificationProps | undefined;
}

export const initialState: ModalState = {
	Notification: undefined,
	InputNotification: undefined,
};

export const selectNotification = (state: RootState) => state.modal.Notification;
export const selectInputNotification = (state: RootState) => state.modal.InputNotification;

export const modalSlice = createProducer(initialState, {
	setNotification: (state, notificationProps: NotificationProps | undefined) => ({
		...state,
		Notification: notificationProps,
	}),
	setInputNotification: (state, notificationProps: InputNotificationProps | undefined) => ({
		...state,
		InputNotification: notificationProps,
	}),
});
