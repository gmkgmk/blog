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
      },
      asyncDeleteAge() {
        this.$store.dispatch('asyncDeleteAge', {
          age: 10
        });
      },
      addOrderAge() {
        this.$store.commit('addOrderAge', {
          age: 100
        });
      }
    },
    render() {
      return (
        <div>
          <h1>this.$store.state.age : {this.$store.state.age}</h1>
          <h1>this.$store.getters.myAge: {this.$store.getters.myAge}</h1>
          <h1>this.$store.state.order.age: {this.$store.state.order.age}</h1>
          <h1>this.$store.getters.orderAge: {this.$store.getters.orderAge}</h1>
          <div>
            <button onClick={this.addAge}>增加年龄</button>
            <button onClick={this.asyncDeleteName}>异步减少年龄</button>
            <button onClick={this.addOrderAge}>增加order年龄</button>
            <button onClick={this.asyncDeleteAge}>减少order年龄</button>
          </div>
        </div>
      );
    }
  };
</script>
