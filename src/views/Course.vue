<template>
	<div class="container">
		<h1 class="title">SELECT COURSE</h1>
		<div class="course-list">
			<CourseItem course="beginner">
				<template #icon>
					<span class="icon material-icons-outlined is-huge">directions_walk</span>
				</template>
				<template #title>初級コース</template>
				<template #caption>
					TOEIC500点台/英検3級を目指すコース <br>
				</template>
			</CourseItem>
			<CourseItem course="intermediate">
				<template #icon>
					<span class="icon material-icons-outlined is-huge">directions_run</span>
				</template>
				<template #title>中級コース</template>
				<template #caption>
					TOEIC700点台/英検2級を目指すコース<br>
				</template>
			</CourseItem>
			<CourseItem course="professional">
				<template #icon>
					<span class="icon material-icons-outlined is-huge">directions_bike</span>
				</template>
				<template #title>上級コース</template>
				<template #caption>
					TOEIC900点台/英検1級～準1級を目指すコース<br>
				</template>
			</CourseItem>
		</div>
	</div>
</template>

<script lang="ts" setup>
import CourseItem from "@/components/CourseItem.vue"

</script>

<style lang="sass" scoped>
.container
	width: 100%
	
	.title
		width: 100%
		text-align: center

	.course-list
		width: 100%
		display: flex
		flex-direction: row
		justify-content: space-evenly

</style>

