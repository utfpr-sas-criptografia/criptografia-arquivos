<?php if(!class_exists('Rain\Tpl')){exit;}?><!DOCTYPE html>
<html>
  <head>
		<meta charset="utf-8">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script type="text/javascript" src="./views/js/js.js"></script>
    <title>Login</title>
	<style>
	   .box{
          width:290px;
          height:180px;
	  top: 200px;
          position:relative;
          margin: auto auto auto auto;
          background-color: invisible
	}	
	  .box2{
	  width:70px;
          height:30px;
          position:relative;
          margin: auto auto auto 50px;
	  top: 30px;
          background-color: invisible
	}
	 .box3{
	  width:80px;
          height:30px;
          position:relative;
          margin: auto auto auto 120px;
          background-color: invisible
	}
	body{
	  background-color: #e6e6e6
	}
	</style>

  </head>
  <body>
		<div class = box>
    			<h1>Login</h1>
			<fieldset>
				<div class="login-user">
					<label for="userLogin">Usuario</label>
					<input class="userLogin" id="userLogin" aria-label="Usuario" placeholder="Usuario">
				</div>
				<div class="password">
					<label for="userPassword">Senha</label>
					<input class="userPassword" id="userPassword" type="password" aria-label="Senha" placeholder="Senha">
			<div class = box2>
				<input type="submit" value="Entrar" class="btn">
				<p class="Entrar"></p>
			</div>
		       <div class = box3>
				<input type="submit" value="Cadastrar" class="btn">
				<p class="Cadastrar"></p>
			</div>	
			</fieldset>
  		</div>
  </body>
</html>