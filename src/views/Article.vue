<template>
    <div>
        <Header></Header>
		<div class="block" >
		  <el-timeline>
		    <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in articles">
		      <el-card shadow="hover">
		        <h4>
					<router-link :to="{name: 'ArticleDetail', params: {articleId: item.articleId}}">{{item.articleTitle}}</router-link>
				</h4>
		        <p>{{item.articleSummary}}</p>
		      </el-card>
		    </el-timeline-item>   
		  </el-timeline>
		</div>
		<el-pagination class="pagecontent"
		  layout="prev, pager, next"
		  :current-page="currentPage"
		  :page-size="pageSize"
		  :total="total"
		  @current-change="page">
		</el-pagination>
    </div>
	 
</template>

<script>
import Header from '../components/Header'
 
	export default {
		name:'Article',
		components:{
			Header
		},
		data(){
			return {
				articles:[],
				currentPage:1,
				total:0,
				pageSize:5
			}
		},
		methods:{
			page(currentPage){
				this.$axios.get("article/list?currentPage="+currentPage).then((res)=>{
					this.articles=	res.data.data.records
					this.currentPage=res.data.data.current
					this.total=res.data.data.total
					this.pageSize=res.data.data.size
				})
			}
		},
		created() {
			this.page(1)
		}
	} 
</script>
<style scoped>
	.block {
		width: 960px;
		margin: 0 auto;
	}
	.pagecontent {
		margin: 0 auto;
		text-align: center;
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