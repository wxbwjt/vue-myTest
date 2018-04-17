/**
* 导入excel
*/
<template>
    <el-dialog v-model="show" @close="closeDialog" title="导入配件详细列表" size="tiny"  :close-on-click-modal="false">
        <el-upload
                action="/ys-web-asm/upload"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                ref="upload"
                :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="display: inline">&nbsp;&nbsp;上传xls/xlsx文件</div>
        </el-upload>
    </el-dialog>
</template>
<script>
    export default{
        name: 'ImportExcel',
        props:{
            value:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return{
                show:this.value,
            }
        },
        methods:{
            closeDialog(){
                this.show = false
                this.$emit('input', this.show)
            },
            handleSuccess(response, file, fileList){
                this.$message({
                    'type':'success',
                    message:"导入成功",
                    'showClose':true
                });
                this.$emit("getParts",response)
                this.closeDialog();
            },
            beforeUpload(file){
                var acceptSufstr = "xls|xlsx";
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
            }
        },
        watch:{
            'value'(n){
                this.show=n
            }
        }
    }
</script>
<style>
</style>