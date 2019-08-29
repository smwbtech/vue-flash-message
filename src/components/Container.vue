<template lang="html">
	<transition-group tag="div" :name="positionClass">
		<VueMessageBlock
			v-for="(message, index) in messages"
			:key="`${message.id}-fm`"
			:index="index"
			:messageObj="message"
			:positionString="position"
		/>
	</transition-group>
</template>

<script>
export default {};
</script>

<style lang="css">

/* FlashMessage animations of appear */
._vue-flash-msg-container_right-bottom-enter-active,
._vue-flash-msg-container_left-bottom-enter-active {
    animation: fromBottom .5s forwards;
}

._vue-flash-msg-container_right-top-enter-active,
._vue-flash-msg-container_left-top-enter-active {
    animation: fromTop .5s forwards;
}

._vue-flash-msg-container_right-bottom-leave-active,
._vue-flash-msg-container_right-top-leave-active {
    transform-origin: center center;
    animation: toRight .8s forwards;
}

._vue-flash-msg-container_left-bottom-leave-active,
._vue-flash-msg-container_left-top-leave-active {
    transform-origin: center center;
    animation: toLeft .8s forwards;
}


.flash-message-move {
    transition: transform .2s;
}

@keyframes fromBottom {
  0% {
      transform: translateY(240px);
      opacity: 0;
  }
  70% {
      transform: translateY(-20px);
      opacity: 0.8;
  }
  100% {
      transform: translateY(0);
      opacity: 1;
  }
}

@keyframes fromTop {
  0% {
      transform: translateY(-240px);
      opacity: 0;
  }
  70% {
      transform: translateY(20px);
      opacity: 0.8;
  }
  100% {
      transform: translateY(0);
      opacity: 1;
  }
}

@keyframes toRight {
  0% {
      transform: translateX(0);
      opacity: 1;
      max-height: 20vh;
  }
  30% {
      transform: translateX(-20px);
      opacity: 0.8;
      max-height: 20vh;
  }
  70% {
      transform: translateX(240px);
      opacity: 0;
      max-height: 20vh;
  }
  100% {
      transform: translateX(240px);
      opacity: 0;
      max-height: 0vh;
  }
}

@keyframes toLeft {
  0% {
      transform: translateX(0);
      opacity: 1;
      max-height: 20vh;
  }
  30% {
      transform: translateX(20px);
      opacity: 0.8;
      max-height: 20vh;
  }
  70% {
      transform: translateX(-240px);
      opacity: 0;
      max-height: 20vh;
  }
  100% {
      transform: translateX(-240px);
      opacity: 0;
      max-height: 0vh;
  }
}
</style>
