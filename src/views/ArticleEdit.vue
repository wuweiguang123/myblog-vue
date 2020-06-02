<template>
	<div class="contertedit">
		<Header></Header>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="文章标题" prop="articleTitle">
				<el-input v-model="form.articleTitle"></el-input>
			</el-form-item>
			<el-form-item label="文章摘要" prop="articleSummary">
				<el-input type="textarea" v-model="form.articleSummary"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="articleContent">
				<mavon-editor v-model="form.articleContent" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">确认发布</el-button>
				<el-button @click="resetForm('form')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Header from '../components/Header'
	export default {
		name: "ArticleEdit",
		components: {
			Header
		},
		data() {
			return {
				form: {
					articleId:0,
					articleTitle: '',
					articleSummary: '',
					articleContent: ''
				},
				rules: {
					articleTitle: [{
							required: true,
							message: '请输入文章标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 25,
							message: '长度在 3 到 25 个字符',
							trigger: 'blur'
						}
					],
					articleSummary: [{
						required: true,
						message: '请输入文章摘要',
						trigger: 'change'
					}],
					articleContent: [{
						required: true,
						message: '请输入内容',
						trigger: 'change'
					}],

				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					this.$axios.post('article/edit',this.form,{
						headers:{
							"Authorization": sessionStorage.getItem("token")
						}
					}).then(res=>{
						this.$alert('发布成功', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$router.push('/article')
							}
						});
					})
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			  },
			  resetForm(formName) {
				this.$refs[formName].resetFields();
			  }			  
		},
		created() {
			const articleId=this.$route.params.articleId
			if(articleId){
				this.$axios.get('article/detail/'+articleId).then(res=>{
					this.form.articleId=res.data.data.articleId
					this.form.articleTitle=res.data.data.articleTitle
					this.form.articleSummary=res.data.data.articleSummary
					this.form.articleContent=res.data.data.articleContent
				})
			}
		}
	}
</script>
<style scoped>
	.contertedit {

		width: 960px;
		margin: 0 auto;

	}
</style>
