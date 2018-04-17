<template>
  <div ref="slideBar" @click="slideHandler" class="slide-box">
  </div>
</template>
<script>
    export default {
      name:'SlideBar',
      props:{
        leftEl:{
          type:String,
          required:true
        },
        rightEl:{
          type:String,
          required:true
        },
      },
      data(){
        return {
          leftBox:null,
          leftBoxWidth:0,
          rightBox:null,
          hiddenFlag:false,
          transitionendHandler:null,
          resizeHandler:null,
          scrollHandler:null
        }
      },
      mounted(){
        this.leftBox = document.querySelector(this.leftEl);
        this.rightBox = document.querySelector(this.rightEl);
        this.init();
      },
      methods:{
        init(){
          this.setStyle(this.leftBox,{'position':'absolute','transition':'left .5s','left':'0px','top':'0px','zIndex':'99'});
          this.setStyle(this.rightBox,{'position':'absolute','right':'0px','top':'0px','transition':'width .5s'});
          this.leftBoxWidth = this.leftBox.offsetWidth;
          this.eventBind();
        },
        slideHandler(){
          
          if(!this.hiddenFlag){
            this.setStyle(this.leftBox,{'left':-this.leftBoxWidth+'px'});
            this.setStyle(this.rightBox,{'width':'100%'});
            this.hiddenFlag = true;
          }else{
            this.setStyle(this.leftBox,{'visibility':'visible'});
            this.setStyle(this.leftBox,{'left':'0px'});
            this.setStyle(this.rightBox,{'width':'66.66667%'});
            this.hiddenFlag = false;
          }
          this.$store.commit('SET_SLIDE_FLAG');
        },
        setStyle(el,styleObj){
          if(!el) return;
          let styleKeys = Object.keys(styleObj);
          styleKeys.forEach(function(name){
            el.style[name] = styleObj[name];
          })
        },
        eventBind(){
          this.transitionendHandler=function(){
            if(this.hiddenFlag){
              this.setStyle(this.leftBox,{'visibility':'hidden'});
            } 
          }.bind(this);

          this.resizeHandler=function(event){
              this.leftBoxWidth = this.leftBox.offsetWidth;
              if(this.hiddenFlag){
                this.setStyle(this.leftBox,{'left':-this.leftBoxWidth+'px'});
              }
          }.bind(this);

          this.scrollHandler=function(event){
            let stop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            this.setStyle(this.$refs['slideBar'],{top:stop+100+'px'})
          }.bind(this);

          this.leftBox.addEventListener('transitionend',this.transitionendHandler,true);
          window.addEventListener('resize',this.resizeHandler);
          window.addEventListener('scroll',this.scrollHandler);
        }
      },
      beforeDestroy(){
        this.leftBox.addEventListener('transitionend',this.transitionendHandler,true);
          window.addEventListener('resize',this.resizeHandler);
          window.addEventListener('scroll',this.scrollHandler);
      }
    }
</script>
<style scoped>
  .slide-box{
    display: -moz-box;
    position: absolute;
    z-index: 99;
    width: 14px;
    height: 368px;
    background: url(../../../assets/img/fold.png) no-repeat 0 0;
    cursor: pointer;
  }
</style>