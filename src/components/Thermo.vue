<template>
	<section v-if="resource">
		<div class="u-mb-sm dd-u-flex dd-u-justify-between">
			<p>
				<span v-if="resource.teamID">We've</span><span v-if="resource.participantID">I've</span> raised <strong>{{ resource.sumDonations | formatMoney }}</strong> for {{ resource.eventName }}
			</p>
			
			<p v-if="resource.fundraisingGoal">
				Goal <strong>{{ resource.fundraisingGoal | formatMoney }}</strong>
			</p>
		</div>
		
		<div
			v-if="resource.fundraisingGoal"
			id="thermo-track"
			class="u-mb-md"
		>
			<div
				id="thermo-progress"
				:style="{
					width: ((resource.sumDonations / resource.fundraisingGoal) * 100) + '%',
				}"
			></div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Thermo',
	props: {
		resource: {
			type: Object,
		},
	},
}
</script>

<style>
	#thermo-track {
		background-color: #1a4c6d;
		border-radius: 10vw;
		height: 2.5vw;
		overflow: hidden;
		width: 100%;
	}

	#thermo-progress {
		background-color: #26c2eb;
		background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.17) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.17) 50%, rgba(255, 255, 255, 0.17) 75%, transparent 75%);
		background-size: 2.5vw;
		height: 2.5vw;
	}	
</style>
