<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Display an image -->
    <div>
      <img class="image" ref="img" :src="require('../assets/images/' + getImgIndex + '.jpg')"/>
    </div>
    <!-- Display a button -->
    <div>
      <button class="button" @click="next()" :disabled="disable">Next</button>
    </div>
    <!--  display the interactions in the UI -->
    <div v-for="pred in predictions" :key="pred.index">{{ pred.label }}: {{ pred.probability.toFixed(0) + '%' }}</div>
    <div v-if="!predictions.length">hmm...</div>
  </div>
</template>

<script>
//integrate the customvision packages
import * as cvstfjs from "customvision-tfjs";
import labels from "raw-loader!../../public/models/labels.txt";
export default {
  name: "DetectImage",
  props: {
    msg: String
  },
// data elements
data() {
    return {
      labels: labels,
      model: null,
      predictions: [],
      image: 0,
      numImages: 25
    };
  },
   // return the index of the image
computed: {
    getImgIndex() {
      return this.image.toString();
    },
    disable() {
      if (this.image == this.numImages) {
        return true;
      } else return false;
    }
  },
  // load the model
async mounted() {
    this.image++;
    //load up a new model
    this.model = new cvstfjs.ClassificationModel();
    await this.model.loadModelAsync("models/model.json");
    //parse labels
    this.labels = labels.split("\n").map(e => {
      return e.trim();
    });
    //run prediction
    this.predict();
  },
methods: {
    async predict() {
      //execute inference
      let prediction = await this.model.executeAsync(this.$refs.img);
      let label = prediction[0];
      //build up a predictions object by parsing details to labels and probability
      this.predictions = label.map((p, i) => {
        return { index: i, label: this.labels[i], probability: p * 100 };
      });
    },
 // capture user interaction
    next() {
      this.image++;
      this.predictions = [];
      //this.predict();
      setTimeout(this.predict, 500);
    }
  }
};
</script>

<!-- bling bling baby -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.image {
  min-height: 500px;
  max-height: 500px;
  max-width: 100%;
}
.button {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: blueviolet;
  color: white;
  font-size: 20pt;
  margin: 10px;
}
.button:disabled,
.button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
