import Ruler from "@scena/react-ruler";

interface JRulerContainerProps {
	children: JSX.Element;
}

const JRulerContainer = (props: JRulerContainerProps) => {
	const { children } = props;
	return (
		<div className="w-full  flex">
			<div className="w-5" style={{ height: "calc(100vh - 64px)" }}>
				<div className="w-5 h-5 bg-[#1F1F1F] text-[#a6a6a6] flex items-center justify-center">px</div>
				<Ruler
					type="vertical"
					lineColor={"#444b4d"}
					textColor={"#a6a6a6"}
					negativeRuler={true}
					segment={2}
					textOffset={[10, 0]}
					backgroundColor={"#1f1f1f"}
				/>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="w-full h-5">
					<Ruler
						type="horizontal"
						height={20}
						lineColor={"#444b4d"}
						textColor={"#a6a6a6"}
						negativeRuler={true}
						segment={2}
						textOffset={[0, 10]}
						backgroundColor={"#1f1f1f"}
					/>
				</div>
				<div
					className="flex-1 relative"
					style={{
						backgroundImage:
							"linear-gradient(#18181c 14px,transparent 0),linear-gradient(90deg,transparent 14px,#86909c 0)",
						backgroundSize: "15px 15px , 15px 15px"
					}}
				>
					<div className="absolute w-full h-full overflow-auto">
						<div className="absolute top-0 left-0 w-[2000px] h-[1000px]">
							<div className="absolute top-[5%] left-[5%] ml-[100px]">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JRulerContainer;
