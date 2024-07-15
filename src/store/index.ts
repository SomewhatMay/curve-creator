import { InferState, combineProducers } from "@rbxts/reflex";
import { pluginSlice } from "./plugin-slice";
import { useProducer, UseProducerHook } from "@rbxts/react-reflex";
import { ioSlice } from "./io-slice";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	plugin: pluginSlice,
	io: ioSlice,
});

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;