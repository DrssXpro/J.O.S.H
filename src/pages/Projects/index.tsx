import JProjectCard from "@/components/JProjectCard";
import { Pagination, Row, type PaginationProps, Col } from "antd";

const Projects = () => {
	const arr = [1, 2, 3, 4, 5, 6];

	const onShowSizeChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
		console.log(current, pageSize);
	};
	return (
		<>
			<div style={{ minHeight: `calc(100vh - 150px)` }}>
				<Row gutter={[16, 16]}>
					{arr.map(() => (
						<Col md={12} lg={8} xxl={6}>
							<JProjectCard />
						</Col>
					))}
				</Row>
			</div>
			<div className="w-full flex flex-row-reverse mt-4">
				<Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
			</div>
		</>
	);
};

export default Projects;
