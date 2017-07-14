<template>
	<div id="loginTopnav">
		<ul>
			<li class="logo-icon"><a href="/#/entrar"></a></li>
			<li style="float: right">
				<button v-if="this.page == 'signup'" type="button" onClick="location.href='#/entrar'"class="btn btn-red">Entrar</button>
				<button v-else type="button" onClick="location.href='#/cadastrar'"class="btn btn-green">Cadastrar</button>
			</li>
		
		</ul>
	</div>
</template>

<script>
export default {
  name: 'loginTopnav',
  props: ['page']
}
</script>

<style scoped lang="sass">
	@import './../../assets/bases.sass'

	ul
		position: relative;
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: $blue-lightier;

	li
		float: left; 

		a
			display: block;
			width: 90%;
			height: 100%;
			color: white;
			text-align: center;
			text-decoration: none;

		.btn
			width: 10em;
			outline: none;
			
	.logo-icon
		display: inline-block;
		margin: 1.5em;
		text-align: center;
		background: url('../../assets/img/logo.png') no-repeat;
		background-size: 80%;
		width: 20rem;
		height: 5rem;

</style>