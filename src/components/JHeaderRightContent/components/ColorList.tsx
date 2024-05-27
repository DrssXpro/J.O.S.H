import { Col, Divider, Row } from "antd";
import designColorRecommend from "@/theme/DesignColor/recommendColor.json";
import { DesignColorType } from "@/theme/DesignColor/types";

interface ColorListProps {
	colorList: DesignColorType[];
	selectColor: (item: DesignColorType) => void;
}

const ColorCard = (props: { colorDetail: DesignColorType }) => {
	const { colorDetail } = props;
	return (
		<div className="w-full h-20 p-3 bg-[#1E2023] rounded border-[#373739]  border-1  hover:border-solid  cursor-pointer flex items-center gap-2">
			<div className="w-2 h-[80%] rounded" style={{ background: colorDetail.hex }}></div>
			<div>
				<div className="flex items-center gap-1">
					<span style={{ color: colorDetail.hex }}>{colorDetail.name}</span>
					<span className="text-xs">{colorDetail.pinyin.toUpperCase()}</span>
				</div>
				<div className="flex items-center mt-2">
					<div>{colorDetail.hex}</div>
					<Divider type="vertical" />
					<div>
						rgb({colorDetail.RGB[0]}, {colorDetail.RGB[1]}, {colorDetail.RGB[2]})
					</div>
				</div>
			</div>
		</div>
	);
};

const ColorList = (props: ColorListProps) => {
	const { colorList, selectColor } = props;
	return (
		<>
			<Row gutter={[16, 16]}>
				{designColorRecommend.map((detail) => (
					<Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xxl={6} key={detail.name}>
						<div onClick={() => selectColor(detail)}>
							<ColorCard colorDetail={detail} />
						</div>
					</Col>
				))}
			</Row>
			<Divider />
			<Row gutter={[16, 16]}>
				{colorList.map((detail) => (
					<Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xxl={6} key={detail.name}>
						<div onClick={() => selectColor(detail)}>
							<ColorCard colorDetail={detail} />
						</div>
					</Col>
				))}
			</Row>
		</>
	);
};

export default ColorList;
