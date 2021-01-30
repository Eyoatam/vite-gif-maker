<template>
	<HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
	name: "App",
	components: {
		HelloWorld,
	},
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

<!--
<template>
	<video src="/flame.mp4" controls></video>
	<br />
	<button @click="transcode">Start</button>
	<p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default defineComponent({
	name: "App",
	setup() {
		// app state
		const ffmpeg = createFFmpeg({
			log: true,
		});
		const message = ref("Click Start to Transcode");
		let video = ref(null);
		const file =
			process.env.NODE_ENV === "production"
				? "/vue-app/flame.mp4"
				: "/flame.mp4";
		// methods
		async function transcode() {
			message.value = "Loading ffmeg-core.js";
			await ffmpeg.load();
			message.value = "Start transcoding";
			ffmpeg.FS("writeFile", "test.mp4", await fetchFile(file));
			await ffmpeg.run(
				"-i",
				"test.mp4",
				"-t",
				"2.5",
				"-ss",
				"2.0",
				"-f",
				"gif",
				"test.gif"
			);
			message.value = "Complete transcoding";
			const data = ffmpeg.FS("readFile", "test.gif");
			video.value = URL.createObjectURL(
				new Blob([data.buffer], { type: "image/gif" })
			);
		}
		return {
			video,
			message,
			transcode,
		};
	},
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
-->