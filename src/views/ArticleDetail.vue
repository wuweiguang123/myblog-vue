<template>
	<div>
		<Header></Header>

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="article-title">{{article.title}}</span>
				<router-link v-if="own" :to="{name: 'ArticleEdit', params: {articleId: article.articleId}}" style="float: right; padding: 3px 0">
					<i class="el-icon-edit"></i> 编辑
				</router-link>
			</div>
			
			<div class="markdown-body" v-html="article.content"></div>
		</el-card>
	</div>
</template>

<script>
	import Header from '../components/Header'
	import 'github-markdown-css'
	
	export default {
		name: 'ArticleDetail',
		components: {
			Header
		},
		data(){
			return {
				article:{
					userId:null,
					title:'',
					content:'',
					articleId: ''
				},
				own:false
			}
		},
		methods:{
			getArticle(){
				const articleId=this.$route.params.articleId			
				this.$axios.get('article/detail/'+articleId).then(res=>{
					// console.log(res.data.data)
					this.article.articleId = res.data.data.articleId
					this.article.title=res.data.data.articleTitle
					this.article.userId=res.data.data.userId
					this.article.content=res.data.data.articleContent
					
					//解析markdown语法
					var MarkdownIt = require('markdown-it'),
					md = new MarkdownIt()
					var contentHtml = md.render(this.article.content)
					this.article.content=contentHtml
					//判断是否是自己的文章，能否编辑
					// console.log(this.$store.getters.getUser)
					this.own=(this.article.userId=== this.$store.getters.getUser.id)
				})
			}
		},
		created() {
			this.getArticle()
		}
	}
</script>

<style scoped="scoped">
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 960px;
		margin: 0 auto;
		min-height: 600px;
		padding: 10px 10px;
	}
	
	.article-title {
		line-height: 27px;
		font-weight: 700;
		font-size: 18px;
	}
	
	a {
		text-decoration: none;
		color: #303133;
	}
	a:hover {
		text-decoration: underline;
		color: #409EFF;
	}
</style>
