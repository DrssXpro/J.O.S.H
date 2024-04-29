import { memo } from "react";
import { InputNumber, Slider, Switch } from "antd";
import JCollapseBox from "../public/JCollapseBox";
import JSettingBox from "../public/JSettingBox";
import JSettingItem from "../public/JSettingItem";
import { UpdateChartConfigType } from "@/store/chartStore/types";
import { FilterEnum, PublicConfigType } from "@/materials/types";

interface IStylesSettingProps {
	chartIndex: number;
	styles: PublicConfigType["styles"];
	update: UpdateChartConfigType;
}

const JStylesSetting = memo((props: IStylesSettingProps) => {
	const { chartIndex, styles, update } = props;

	return (
		<JCollapseBox
			name="滤镜 / 变换"
			operator={
				<Switch
					checkedChildren="启用"
					unCheckedChildren="关闭"
					value={styles[FilterEnum.FILTERS_SHOW]}
					onChange={(val) => {
						update(chartIndex, "styles", FilterEnum.FILTERS_SHOW, val);
					}}
				/>
			}
		>
			<div>
				<JSettingBox name="色相">
					<JSettingItem text={`值: ${styles[FilterEnum.HUE_ROTATE]}deg`}>
						<Slider
							style={{ margin: "0", marginTop: "5px" }}
							tooltip={{ formatter: (val) => `${val}deg` }}
							step={3}
							min={0}
							max={360}
							value={styles[FilterEnum.HUE_ROTATE]}
							onChange={(val) => {
								update(chartIndex, "styles", FilterEnum.HUE_ROTATE, val);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="饱和度">
					<JSettingItem text={`值: ${(parseFloat(String(styles[FilterEnum.SATURATE])) * 100).toFixed(0)}%`}>
						<Slider
							style={{ margin: "0", marginTop: "5px" }}
							tooltip={{ formatter: (val) => `${(parseFloat(String(val)) * 100).toFixed(0)}%` }}
							step={0.1}
							min={0}
							max={2}
							value={styles[FilterEnum.SATURATE]}
							onChange={(val) => {
								update(chartIndex, "styles", FilterEnum.SATURATE, val);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="对比度">
					<JSettingItem text={`值: ${(parseFloat(String(styles[FilterEnum.CONTRAST])) * 100).toFixed(0)}%`}>
						<Slider
							style={{ margin: "0", marginTop: "5px" }}
							tooltip={{ formatter: (val) => `${(parseFloat(String(val)) * 100).toFixed(0)}%` }}
							step={0.1}
							min={0}
							max={2}
							value={styles[FilterEnum.CONTRAST]}
							onChange={(val) => {
								update(chartIndex, "styles", FilterEnum.CONTRAST, val);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="亮度">
					<JSettingItem text={`值：${(parseFloat(String(styles[FilterEnum.BRIGHTNESS])) * 100).toFixed(0)}%`}>
						<Slider
							style={{ margin: "0", marginTop: "5px" }}
							tooltip={{ formatter: (val) => `${(parseFloat(String(val)) * 100).toFixed(0)}%` }}
							step={0.1}
							min={0}
							max={2}
							value={styles[FilterEnum.BRIGHTNESS]}
							onChange={(val) => {
								update(chartIndex, "styles", FilterEnum.BRIGHTNESS, val);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="透明度">
					<JSettingItem text={`值：${(parseFloat(String(styles[FilterEnum.OPACITY])) * 100).toFixed(0)}%`}>
						<Slider
							style={{ margin: "0", marginTop: "5px" }}
							tooltip={{ formatter: (val) => `${(parseFloat(String(val)) * 100).toFixed(0)}%` }}
							step={0.1}
							min={0}
							max={1}
							value={styles[FilterEnum.OPACITY]}
							onChange={(val) => {
								update(chartIndex, "styles", FilterEnum.OPACITY, val);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="旋转°">
					<div className="config-items-layout">
						<JSettingItem text="Z轴(平面) - 旋转">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								min={0}
								max={360}
								value={styles[FilterEnum.ROTATE_Z]}
								onChange={(val) => {
									update(chartIndex, "styles", FilterEnum.ROTATE_Z, val);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="X轴 - 旋转">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								min={0}
								max={360}
								value={styles[FilterEnum.ROTATE_X]}
								onChange={(val) => {
									update(chartIndex, "styles", FilterEnum.ROTATE_X, val);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="Y轴 - 旋转">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								min={0}
								max={360}
								value={styles[FilterEnum.ROTATE_Y]}
								onChange={(val) => {
									update(chartIndex, "styles", FilterEnum.ROTATE_Y, val);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="倾斜°">
					<div className="config-items-layout">
						<JSettingItem text="X轴 - 倾斜">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								min={0}
								max={360}
								value={styles[FilterEnum.SKEW_X]}
								onChange={(val) => {
									update(chartIndex, "styles", FilterEnum.SKEW_X, val);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="Y轴 - 倾斜">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								min={0}
								max={360}
								value={styles[FilterEnum.SKEW_Y]}
								onChange={(val) => {
									update(chartIndex, "styles", FilterEnum.SKEW_Y, val);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
			</div>
		</JCollapseBox>
	);
});

export default JStylesSetting;
