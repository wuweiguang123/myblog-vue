<template>
	<div class="article_header">
		<h3>欢迎来到我的博客</h3>
		<div class="block"><el-avatar :size="50" :src="imgUrl"></el-avatar></div>
		<div>{{user.username}}</div>
		<div class="header-nav">
		    <span><el-link href="/" type="primary">主页</el-link></span>
		    <el-divider direction="vertical"></el-divider>
		    <span><el-link href="/article/add" type="success">写文章</el-link></span>
		    <el-divider direction="vertical"></el-divider>
			<span v-if="logined"><el-link @click="logout" type="danger">退出</el-link></span>
		    <span v-else><el-link href="/login" type="warning">登录</el-link></span>
		</div>
	</div>
</template>

<script>
	export default {
	    data () {
	      return {
			  user:{
				  username:'请先登录'
			  },
	          imgUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			  logined: false
	      }
	    },
		created() {
			if(this.$store.getters.getUser) {
				this.user.username = this.$store.getters.getUser.username
				this.imgUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
				this.logined = true
			}
		},
		methods:{
			logout(){
				this.$axios.get('user/logout',{
					headers:{
						"Authorization": sessionStorage.getItem("token")
					}
				}).then(res => {
					this.$store.commit('REMOVE_INFO')
					this.$router.push('/login')
				})
			}
		}
	  }
</script>
	
<style>
	.article_header{
		margin: 0 auto;
		text-align: center;
		margin-bottom: 15px;
	}
	.header-nav {
		margin-top: 5px;
	}
</style>
