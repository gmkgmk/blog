<script>
  export default {
    mounted() {

      console.log(this.$store);
    },
    data() {
      return {};
    },
    methods: {
      addAge() {
        this.$store.commit('addAge', {
          age: 20
        });
      },
      asyncDeleteName() {
        this.$store.dispatch('asyncDeleteAge', {
          age: 10
        });
      }
    },
    render() {
      return (
        <div>
          <h1>this.$store.state.age : {this.$store.state.age}</h1>
          <h1>this.$store.getters.myAge: {this.$store.getters.myAge}</h1>
          <div>
            <button onClick={this.addAge}>增加年龄</button>
            <button onClick={this.asyncDeleteName}>异步减少年龄</button>
          </div>
        </div>
      );
    }
  };
</script>
