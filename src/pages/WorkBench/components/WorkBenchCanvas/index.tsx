import JRulerContainer from "@/components/JRulerContainer";

const WorkBenchCanvas = () => {
	return (
		<div className="flex-1">
			<JRulerContainer>
				<div className="w-[800px] h-[600px] bg-[#232324] rounded-xl"></div>
			</JRulerContainer>
		</div>
	);
};

export default WorkBenchCanvas;
