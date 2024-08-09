import { createProducer } from "@rbxts/reflex";
import { RootState } from "store";
import { NotificationProps } from "ui/components/notification";
import { InputNotificationProps } from "ui/components/notification/input-notification";
import { TutorialNotificationProps } from "ui/components/notification/tutorial-notification";

interface ModalState {
	Notification: NotificationProps | undefined;
	InputNotification: InputNotificationProps | undefined;
	TutorialNotification: TutorialNotificationProps | undefined;
}

export const initialState: ModalState = {
	Notification: undefined,
	InputNotification: undefined,
	TutorialNotification: undefined,
};

export const selectNotification = (state: RootState) => state.modal.Notification;
export const selectInputNotification = (state: RootState) => state.modal.InputNotification;
export const selectTutorialNotification = (state: RootState) => state.modal.TutorialNotification;

export const modalSlice = createProducer(initialState, {
	setNotification: (state, notificationProps: NotificationProps | undefined) => ({
		...state,
		Notification: notificationProps,
	}),
	setInputNotification: (state, notificationProps: InputNotificationProps | undefined) => ({
		...state,
		InputNotification: notificationProps,
	}),
	setTutorialNotification: (state, notificationProps: TutorialNotificationProps | undefined) => ({
		...state,
		TutorialNotification: notificationProps,
	}),
});
