<template>
  <div class="icon">
    <svg v-if="name === 'no face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'very happy face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
      <line x1="-18" y1="-10" x2="-8" y2="-18" stroke-linecap="round" stroke-width="5"/>
      <line x1="18" y1="-10" x2="8" y2="-18" stroke-linecap="round" stroke-width="5"/>
      <path d="M -18 10 C -15 25 15 25 18 10" stroke-linecap="round"  fill="transparent" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'happy face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
      <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <path d="M -15 15 C 0 20 0 20 15 15" stroke-linecap="round" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'uncertain face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
      <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <line x1="-10" x2="10" y1="18" y2="18" stroke-linecap="round" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'unhappy face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
      <circle cx="-15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <circle cx="15" cy="-8" r="2"  fill="transparent" stroke-width="5"/>
      <path d="M -15 15 C 0 10 0 10 15 15" stroke-linecap="round" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'very unhappy face'" width="100%" height="100%" viewBox="-50 -50 100 100"  xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="40"  fill="transparent" stroke-width="5"/>
      <line x1="-15" y1="-7" x2="-8" y2="-15" stroke-linecap="round" stroke-width="5"/>
      <line x1="-8" y1="-15" x2="-15" y2="-18" stroke-linecap="round" stroke-width="5"/>
      <line x1="15" y1="-7" x2="8" y2="-15" stroke-linecap="round" stroke-width="5"/>
      <line x1="8" y1="-15" x2="15" y2="-18" stroke-linecap="round" stroke-width="5"/>
      <path d="M -18 20 C -15 5 15 5 18 20" stroke-linecap="round" fill="transparent" stroke-width="5"/>
    </svg>
    <svg v-if="name === 'chevron'" width="100%" height="100%" viewBox="-10 -20 20 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M -7 -17 L 7 0 L -7 17" stroke-linecap="butt" stroke-width="3"/>
    </svg>
  </div>
</template>
<script>
export default {
  props: ['name']
}
</script>
