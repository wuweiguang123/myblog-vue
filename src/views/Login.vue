<template>
	<el-container>
		<el-header>MyBlog - 登录</el-header>
		<el-main>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="userAccount">
					<el-input type="text" v-model="ruleForm.userAccount" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
			
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
			
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				ruleForm: {
					userAccount: '',
					password: ''
				},
				rules: {
					userAccount: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				const _this = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$axios.post('user/login',this.ruleForm).then(res => {
							console.log(res.data)
							if(res.data.code == 200) {
								const token = res.headers['authorization']
								_this.$store.commit('SET_TOKEN', token)
								_this.$store.commit('SET_USERINFO', res.data.data)
								_this.$router.push('/article')
							} else {
								this.$message({
									type: 'error',
									message: res.data.msg
								})
							}
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
		}
	}
</script>

<style scoped>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		color: #333;
		text-align: center;
		line-height: 160px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}
	.demo-ruleForm{
		width: 450px;
		margin: 0 auto;
	}
</style>
