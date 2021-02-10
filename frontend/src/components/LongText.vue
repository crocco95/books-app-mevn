<template>
  <div>
    <p v-html="shortText" class="text"></p>
    <div class="text-center">
      <button class="btn btn-link" @click="showMore(!moreFlag)" v-if="text.length > max">Show {{ moreFlag ? 'less' : 'more' }}</button>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    text: String,
    max: Number,
  },

  data(){
    return {
      shortText: '',
      moreFlag: false,
    }
  },

  methods:{
    showMore(moreFlag){
      this.moreFlag = moreFlag;
      this.shortText = this.moreFlag ? this.text : this.text.substr(0,this.max) + '...';
    }
  },

  mounted(){
    this.showMore(false);
  },
}
</script>

<style scoped>
  .text{
    transition: all .2s;
  }
</style>