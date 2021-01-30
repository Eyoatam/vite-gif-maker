<template>
	<!-- This example requires Tailwind CSS v2.0+ -->
	<div class="py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<p
					class="mt-2 lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900 md:text-6xl sm:text-5xl"
				>
					Vite-Gif-Maker
				</p>
				<p class="mt-4 max-w-2xl lg:text-2xl text-gray-700 lg:mx-auto">
					A simple vite and FFmpeg example
				</p>
			</div>
			<div class="flex justify-center text-center mt-7">
				<video controls width="250" :src="video"></video>
			</div>
			<div class="mt-3 sm:mt-0 sm:ml-3 flex items-center justify-center">
				<button
					@click="convertToGif"
					class="flex items-center justify-center px-8 py-3 border mt-5 border-transparent text-base font-medium rounded-md text-gray-200 bg-gray-900 bg-gray-100 hover:bg-gray-900 md:py-4 md:text-lg md:px-10"
				>
					convert
				</button>
			</div>
			<div class="flex justify-center text-center mt-7">
				<img controls width="250" :src="gif" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export default defineComponent({
	name: "App",
	setup() {
		const ffmpeg = createFFmpeg({
			log: true,
		});
		const message = ref("Click Start to Transcode");
		let gif = ref();
		let video = ref();
		const file =
			process.env.NODE_ENV === "production"
				? "/vite-gif-maker/video.mp4"
				: "/video.mp4";

		// convert to gif
		async function convertToGif() {
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
			const data = ffmpeg.FS("readFile", "test.gif");
			gif.value = URL.createObjectURL(
				new Blob([data.buffer], { type: "image/gif" })
			);
		}
		onMounted(async () => {
			await ffmpeg.load();
		});
		return {
			video,
			gif,
			message,
			convertToGif,
		};
	},
});
</script>

<style scoped>
body {
	outline: none;
}
</style>
