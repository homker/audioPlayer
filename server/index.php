<?php
	$token = $_GET['token'];
	$filename = "../audio/".$token.".mp3";
	echo $filename;
	if(file_exists($filename)){ 
		echo file_get_contents($filename);
	}else{
		echo "hello";
	}
?>