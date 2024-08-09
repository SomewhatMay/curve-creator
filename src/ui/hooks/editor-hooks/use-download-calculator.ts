import { ReplicatedStorage, Selection } from "@rbxts/services";
import { useRootProducer } from "store";

const CurveCalculator = script
	.Parent!.Parent!.Parent!.Parent!.FindFirstChild("io")!
	.FindFirstChild("curve-calculator")!;

export function useDownloadCalculator() {
	const { setTutorialNotification } = useRootProducer();

	return () => {
		const existingCalculatorFile = ReplicatedStorage.FindFirstChild("CurveCalculator");

		if (existingCalculatorFile) {
			Selection.Set([existingCalculatorFile]);
			setTutorialNotification({
				message:
					"The 'CurveCalculator file already exists in <font color='rgb(33,144,255)'><u>ReplicatedStorage</u></font>. To use it, follow these steps:",
				displayCode: true,
				options: [
					{
						message: "OK",
						handler: () => {
							setTutorialNotification(undefined);
						},
					},
				],
			});
		} else {
			const newCurveCreator = CurveCalculator.Clone();
			newCurveCreator.Name = "CurveCalculator";
			newCurveCreator.Parent = ReplicatedStorage;
			Selection.Set([newCurveCreator]);

			setTutorialNotification({
				message:
					"The 'CurveCalculator' Module Script can be used to calculate the y position of any curve you create, given the x position. The file has been created and stored in <font color='rgb(33,144,255)'><u>ReplicatedStorage</u></font>. To use it, follow these steps:",
				displayCode: true,
				options: [
					{
						message: "OK",
						handler: () => {
							setTutorialNotification(undefined);
						},
					},
				],
			});
		}
	};
}
