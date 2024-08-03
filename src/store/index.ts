import { InferState, combineProducers } from "@rbxts/reflex";
import { pluginSlice } from "./plugin-slice";
import { useProducer, UseProducerHook } from "@rbxts/react-reflex";
import { ioSlice } from "./io-slice";
import { settingsSlice } from "./settings-slice";
import { editorSlice } from "./editor-slice";
import { modalSlice } from "./modal-slice";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	plugin: pluginSlice,
	io: ioSlice,
	settings: settingsSlice,
	editor: editorSlice,
	modal: modalSlice,
});

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
