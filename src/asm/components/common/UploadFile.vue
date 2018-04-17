<template>
  <div v-if="show" class="shade-box" >
    <i class="el-icon-close close-btn" @click="close"></i>
    <el-carousel ref="carouselBox" class="filesContainer" @change="resetTrans" :autoplay="false" :initial-index="cindex" arrow="always">
    <button class="el-carousel__arrow" @click.stop="transRight" style="right:40%;top:90%"><i class="fa fa-rotate-right"/></button>
    <button class="el-carousel__arrow" @click.stop="transSmall" style="right:45.5%;top:90%"><i class="el-icon-minus"/></button>
    <button class="el-carousel__arrow" @click.stop="transLarge" style="left:45.5%;top:90%"><i class="el-icon-plus"/></button>
    <button class="el-carousel__arrow" @click.stop="transLeft" style="left:40%;top:90%"><i class="fa fa-rotate-left"/></button>
      <el-carousel-item v-for="item,index in fileObjects" v-if="item.type=='img'" :key="index">
        <img draggable="false" :src="item.url" class="upload-imgbox"   :style="'-webkit-transform: rotate('+trans+'deg) scale('+transize+');'" v-drag />
             <p style="font-weight:bolder;color:#fff">{{item.name}}</p>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div v-else>
    <a @click="showImage($event,item)" v-for="item in fileObjects" class='upload-file-link' target='_blank' :href='item.url'><i class='el-icon-document'></i>{{item.sname}}</a>
  </div>
</template>
<script>
    export default{
        name:"UploadFile",
        props:{
            fileslink:String
        },
        data(){
            return{
                fileObjects:[],
                show:false,
                cheight:600,
                cindex:0,
                trans:0,
                transize:1,
            }
        },
        mounted:function(){
            this.convertObject(this.fileslink);
        },
        methods:{
            convertObject(filestr){
                let fileArr = filestr.split(",");
                let fileObjects = [];
                for(let item of fileArr){
                    if(item==""){
                        continue;
                    }else{
                        let suffix =  item.slice(item.lastIndexOf(".")+1);
                        let name = item.substr(item.lastIndexOf("/")+1);
                        let sname = name.split('_')[1];
                        let ispic = "gif,jpg,jpeg,png".indexOf(suffix.toLowerCase());
                        fileObjects.push({
                            url:item,
                            suffix:suffix,
                            name:name,
                            sname:sname,
                            type:ispic!=-1 ? 'img':'file'
                        });
                    }
                }
                this.fileObjects = fileObjects;
            },
            showImage(event,item){
                if(item.type=='img'){
                    event.preventDefault();
                    let index=0;
                    for(let i=0,j=this.fileObjects.length;i<j;i++){
                        if(this.fileObjects[i].url==item.url){
                            break;
                        }else if(this.fileObjects[i].type == 'img'){
                            index++;
                        }
                    }
                    this.show=true;

                    setTimeout(function(){
                        console.log(index);
                        this.$refs.carouselBox.setActiveItem(index);
                    }.bind(this),300);

                    //this.$store.commit('SET_OVER_HIDDEN',true);
                }
            },
            close(){
                this.show=false;
                //this.$store.commit('SET_OVER_HIDDEN',false);
            },
            transRight(){
                this.trans+=90
            },
               transLeft(){
                this.trans-=90
            },
            resetTrans(){
                this.trans = 0
                this.transize = 1
                let imgs = document.getElementsByClassName("upload-imgbox")
                for(let img of imgs){
                    img.style.removeProperty("position");
                }
            },
            transLarge(){
                this.transize*=1.2
            },
            transSmall(){
                this.transize/=1.2
            }
        },
        watch:{
            'fileslink':function(){
                this.convertObject(this.fileslink);
            }
        }
    }
</script>
