
<template>
  <div class="offset-lg-2 offset-md-2 offset-1 col-lg-8 col-md-8 col-10">
    <h1>Reviews</h1>
    <p>Please leave a review. Your feedback on how the game can be improved is greatly appreciated!</p>

    <Carousel
      :responsiveOptions="responsiveOptions"
      :value="reviews.items"
      :numScroll="2"
      :numVisible="2"
      :circular="true"
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div>
          <h5>{{slotProps.data.name}}</h5>
          <Rating :modelValue="slotProps.data.rating" :stars="5" :cancel="false" />
          <div>{{slotProps.data.review}}</div>
        </div>
      </template>
    </Carousel>
    <h3>Submit your Review</h3>
    <Rating v-model="ratingStars" :cancel="false" />
    <Textarea v-model="reviewText" :autoResize="true" rows="2" cols="70" maxlength="100" />
    <br />
    <small>Sign in to submit a review</small>
     <br />
    <button
      id="submitBtn"
      type="button"
      class="btn btn-primary"
      @click="submitReview"
      :disabled="Object.keys(user).length === 0 && user.constructor === Object"
    >SUBMIT</button>
  </div>
  <Dialog position="bottom" v-model:visible="modalVisible" :dismissableMask="true" :modal="true">
    <template #header>
      <h5>Thank you for reviewing the game!</h5>
    </template>

    <p>You can change your reviews and ratings anytime by re-submitting a new one.</p>
  </Dialog>
</template>

<script>
import userUsers from "../state/users.js";
import Rating from "primevue/rating";
import Textarea from "primevue/textarea";
import { ref, reactive } from "vue";
import Carousel from "primevue/carousel";
import { API } from "aws-amplify";
export default {
  name: "FeedBack",
  components: {
    Rating,
    Carousel,
    Textarea
  },
  async mounted() {
    this.reviews.items = await API.get("4Pic1Cy", "/players/reviews");
  },
  methods: {
    submitReview: async function() {
      const response = await API.put("4Pic1Cy", "/players/review", {
        body: {
          token: this.user.getAuthResponse().id_token,
          rating: this.ratingStars,
          review: this.reviewText
        }
      });
      if (response.success) {
        this.modalVisible = true;
      } else {
        console.log("An error has occurred.");
      }
      this.reviewText = "";
    }
  },
  setup() {
    const { user, authInfo } = userUsers();
    const ratingStars = ref(5);
    const reviewText = ref("");
    const modalVisible = ref(false);
    const reviews = reactive({
      items: []
    });
    const responsiveOptions = [
      {
        breakpoint: "800px",
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: "480px",
        numVisible: 1,
        numScroll: 1
      }
    ];

    return {
      user,
      authInfo,
      ratingStars,
      reviews,
      reviewText,
      modalVisible,
      responsiveOptions
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game-container {
  text-align: center;
}
#submitBtn {
  min-width: 10em;
  background-color: #250069 !important;
}
/* On screens that are 600px or less, set the background color to olive */
@media screen and (max-width: 600px) {
  .question-pic {
    height: 150px;
    margin-right: 0px;
  }
}
img:before {
  content: " ";
  display: block;
  position: absolute;
  height: 50px;
  width: 50px;
  background-image: url(https://i.redd.it/w3kr4m2fi3111.png);
}
</style>

