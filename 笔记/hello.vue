
<template>
	<div class="hello"
	    @click="onClick">
		<p @click="abc">Hello, world! My name is</p>
	</div>
</template>

<style>
div {
  background: red;
  border-radius: 30px;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  width: 300px;
  margin: 0 auto;
}
</style>

<script>
export default {
  // 1
  name: "hello-world", // 2
  method: {
    onClick() {
      // 3
      alert(`Don't touch me!`);
	},
	abc(){
		alert(111)
	}
  }
};
</script>