/**
* 上传凭证
*/
<template>
    <div class="my-progress">
        <el-card>
            <div slot="header"  class="search-head"><span><i class="fa fa-tag"></i>上传凭证</span></div>
            <el-col :span="2" class="my-label">
                <span>凭证</span>
            </el-col>
            <el-col :span="22" class="my-content">
            <el-upload
                    action="/ys-web-asm/upload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    ref="upload"
                    :file-list="fileList"
                    >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="large">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-col>
        </el-card>
    </div>
</template>
<script>
    export default{
        name: 'PhotoUpload',
        props:['value'],
        mounted(){
            this.parse(this.value)
        },
        data(){
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                fileList:[],
            }
        },
        methods: {
            /*图片删除*/
            handleRemove(file, fileList) {
                    this.$http.post('/deletefile',{"path":file.response.data.url})
                        .then((response)=> {
                            console.log(fileList)
                            let photoFileNameList=[]
                            fileList.map((item)=> {
                               photoFileNameList.push(item.response.data.url)
                            })
                            this.$emit("input", [...photoFileNameList])
                        })
                        .catch( (error) =>{
                            console.log(error);
                        });
            },
            /*查看图片*/
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            /*上传回掉*/
            handleSuccess(response, file, fileList){
                let photoFileNameList=[]
                fileList.map((item)=> {
                    photoFileNameList.push(item.response.data.url)
                })
               this.$emit("input", [...photoFileNameList])
                console.log(this.value)
            },
            /*上传前校验*/
            beforeUpload(file){
                var acceptSufstr = "jpeg|jpg|png";
                var suffix = file.name.substr(file.name.lastIndexOf(".")+1).toLowerCase();
                var size = file.size
                if(acceptSufstr.indexOf(suffix)==-1){
                    this.$message({
                        type:"error",
                        message:"上传文件格式错误"
                    });
                    this.$refs.upload.uploadFiles.pop();
                    return false;
                }
            },
            /*传入参数规范*/
            parse(val){
                this.fileList.splice(0,this.fileList.length)
                if(val){
                val.map((item,index)=> {
                    let obj = {response:{data:{url:item}},url:item,uid:index}
                    this.fileList.push(obj)
                })
            }
            }
        },
        watch:{
          value:function(n,o){
              if(this.$refs['upload'].uploadFiles.length<1)
              this.parse(this.value)
          }
        }
    }
</script>
<style>
</style>