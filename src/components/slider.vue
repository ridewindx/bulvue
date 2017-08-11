<template>
  <div class="slider">
    <Input-number
      v-if="!range && showInput"
      :min="min"
      :max="max"
      :step="step"
      :value="currentValue"
      :disabled="disabled"
      @on-change="handleInputChange"></Input-number>
    <div :class="[prefixCls + '-wrap']" ref="slider" @click.self="sliderClick">
      <template v-if="showStops">
        <div :class="[prefixCls + '-stop']" v-for="item in stops" :style="{ 'left': item + '%' }" @click.self="sliderClick"></div>
      </template>
      <div :class="[prefixCls + '-bar']" :style="barStyle" @click.self="sliderClick"></div>
      <template v-if="range">
        <div
          :class="[prefixCls + '-button-wrap']"
          :style="{left: firstPosition + '%'}"
          @mousedown="onFirstButtonDown">
          <Tooltip :controlled="firstDragging" placement="top" :content="tipFormat(currentValue[0])" :disabled="tipDisabled" :always="showTip === 'always'" ref="tooltip">
            <div :class="button1Classes"></div>
          </Tooltip>
        </div>
        <div
          :class="[prefixCls + '-button-wrap']"
          :style="{left: secondPosition + '%'}"
          @mousedown="onSecondButtonDown">
          <Tooltip :controlled="secondDragging" placement="top" :content="tipFormat(currentValue[1])" :disabled="tipDisabled" :always="showTip === 'always'" ref="tooltip2">
            <div :class="button2Classes"></div>
          </Tooltip>
        </div>
      </template>
      <template v-else>
        <div
          :class="[prefixCls + '-button-wrap']"
          :style="{left: singlePosition + '%'}"
          @mousedown="onSingleButtonDown">
          <Tooltip :controlled="dragging" placement="top" :content="tipFormat(currentValue)" :disabled="tipDisabled" :always="showTip === 'always'" ref="tooltip">
            <div :class="buttonClasses"></div>
          </Tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

</script>
