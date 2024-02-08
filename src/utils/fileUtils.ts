// 读取文件内容：JSON、TXT
export const readFile = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		try {
			const reader = new FileReader();
			reader.onload = (evt: ProgressEvent<FileReader>) => {
				if (evt.target) {
					resolve(evt.target.result as string);
				}
			};
			reader.readAsText(file);
		} catch (error) {
			reject(error);
		}
	});
};

export const downloadByLink = (url: string, filename = new Date().getTime(), fileSuffix?: string) => {
	const ele = document.createElement("a"); // 创建下载链接
	ele.download = `${filename}.${fileSuffix}`; //设置下载的名称
	ele.style.display = "none"; // 隐藏的可下载链接
	// 字符内容转变成blob地址
	ele.href = url;
	// 绑定点击时间
	document.body.appendChild(ele);
	ele.click();
	// 然后移除
	document.body.removeChild(ele);
};

export const downloadTextFile = (content: string, filename = new Date().getTime(), fileSuffix?: string) => {
	// 字符内容转变成blob地址
	const blob = new Blob([content]);
	downloadByLink(URL.createObjectURL(blob), filename, fileSuffix);
};
