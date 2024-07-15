import { InferState, combineProducers } from "@rbxts/reflex";
import { pluginSlice } from "./plugin-slice";

export type RootProducer = typeof producer;

export type RootState = InferState<RootProducer>;

export const producer = combineProducers({
	plugin: pluginSlice,
});