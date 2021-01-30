const fs = require("fs");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });
(async () => {
	await ffmpeg.load();
	ffmpeg.FS("writeFile", "out.mp4", await fetchFile("./out.mp4"));
	await ffmpeg.run("-i", "out.mp4", "test.gif");
	await fs.promises.writeFile("./test.gif", ffmpeg.FS("readFile", "test.gif"));
	process.exit(0);
})();
