<template>
  <div>
    <p v-html="shortText" class="text"></p>
    <div class="text-center">
      <button class="btn btn-link" @click="showMore">Read {{ moreFlag ? 'less' : 'more' }}</button>
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
      moreFlag: true,
    }
  },

  methods:{
    showMore(){
      this.moreFlag = !this.moreFlag;
      this.shortText = this.moreFlag ? this.text : this.text.substr(0,this.max) + '...';
    }
  },

  watch: {
    text: [{
      handler: 'showMore'
    }]
  },

  mouted(){
    this.moreFlag = true;
    this.showMore()
  }

}
</script>

<style scoped>
  .text{
    transition: all .2s;
  }
</style>