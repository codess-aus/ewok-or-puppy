<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12">{{ msg }}</h1>
    
    <!-- Main content section -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
      <!-- Left column: Image and predictions (spans 3 columns) -->
      <div class="lg:col-span-3 space-y-4 sm:space-y-6">
        <!-- Image card with elegant loading state -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="flex flex-col items-center">
            <!-- Image container -->
            <div class="relative w-[300px] h-[300px] bg-gray-100 dark:bg-gray-800">
              <!-- Loading overlay -->
              <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center z-10 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm">
                <div class="flex flex-col items-center">
                  <div class="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400 mb-3">
                    <div class="w-full h-full rounded-full border-4 border-transparent border-t-current border-l-current"></div>
                  </div>
                  <span class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Loading image...</span>
                </div>
              </div>
              
              <!-- Fixed-size square image container with strict cropping -->
              <div class="w-[300px] h-[300px] overflow-hidden">
                <img 
                  :key="imageIndex"
                  class="w-full h-full object-cover select-none"
                  ref="imgRef" 
                  :src="currentImageSrc" 
                  @load="onImageLoad" 
                  alt="Detection image" 
                  draggable="false"
                  :style="{
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out'
                  }"
                />
              </div>
            </div>
            
            <!-- Navigation Controls -->
            <div class="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-700 w-full">
              <div class="flex items-center justify-between">
                <button 
                  @click="prev" 
                  :disabled="imageIndex === 1"
                  class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                        hover:bg-primary-200 hover:scale-110 hover:shadow-lg dark:hover:bg-primary-900/40 hover:text-primary-600 
                        dark:hover:text-primary-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                        disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700 disabled:hover:shadow-none
                        transition-all duration-300"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <span class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Image {{ imageIndex }} of {{ numImages }}</span>
                
                <button 
                  @click="next"
                  :disabled="imageIndex === numImages"
                  class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                        hover:bg-primary-200 hover:scale-110 hover:shadow-lg dark:hover:bg-primary-900/40 hover:text-primary-600 
                        dark:hover:text-primary-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                        disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700 disabled:hover:shadow-none
                        transition-all duration-300"
                >
                  <span class="sr-only">Next</span>
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Predictions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-5 transition-all duration-300">
          <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">AI Analysis Results</h2>
          
          <div v-if="isLoading && predictions.length === 0" class="space-y-2 sm:space-y-3 animate-pulse">
            <div v-for="i in 2" :key="i">
              <div class="flex justify-between items-center mb-1 sm:mb-2">
                <div class="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24"></div>
                <div class="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 sm:w-10"></div>
              </div>
              <div class="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div v-else class="space-y-3 sm:space-y-4">
            <div v-for="pred in predictions" :key="pred.index" class="prediction-item group">
              <div class="flex justify-between items-center mb-1 sm:mb-2">
                <span class="font-medium text-gray-900 dark:text-white transition-all group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {{ pred.label }}
                </span>
                <span class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  {{ pred.probability.toFixed(0) }}%
                </span>
              </div>
              <div class="prediction-bar-container">
                <div class="prediction-bar"
                     :style="{
                       width: pred.probability + '%',
                       backgroundColor: getPredictionColor(pred.probability)
                     }"
                ></div>
              </div>
            </div>
            <div v-if="predictions.length === 0 && !isLoading" class="text-center py-3 sm:py-4 text-gray-500 dark:text-gray-400">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p class="text-xs sm:text-sm">No predictions available</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column: Fun fact and AI info (spans 2 columns) -->
      <div class="lg:col-span-2 space-y-4 sm:space-y-6">
        <!-- Fun Fact Card -->
        <div class="rounded-xl shadow-lg overflow-hidden"
             :class="{
               'bg-indigo-50 dark:bg-indigo-900/30': currentFact.type === 'ewok',
               'bg-rose-50 dark:bg-rose-900/30': currentFact.type === 'puppy',
               'bg-amber-50 dark:bg-amber-900/30': currentFact.type === 'similarity'
             }">
          <div class="p-4 sm:p-5">
            <div class="flex items-center gap-x-3 sm:gap-x-4 text-xs sm:text-sm mb-3 sm:mb-4">
              <span class="text-gray-500 dark:text-gray-400">Fun Fact #{{ imageIndex }}</span>
              <span class="relative z-10 rounded-full px-2.5 sm:px-3 py-1.5 font-medium"
                    :class="{
                      'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200': currentFact.type === 'ewok',
                      'bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200': currentFact.type === 'puppy',
                      'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200': currentFact.type === 'similarity'
                    }">
                {{ currentFact.category }}
              </span>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{{ currentFact.title }}</h3>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{{ currentFact.description }}</p>
          </div>
        </div>

        <!-- AI Tool Info -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-5">
          <h2 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">About the AI Tool</h2>
          <div class="space-y-2 sm:space-y-3">
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Our model runs entirely in your browser, ensuring fast results and complete privacy. It is trained to spot subtle differences between Ewoks and puppies, analyzing images for distinctive features with high confidence predictions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { initializeModel, predict as modelPredict } from '../services/modelService';

// Define props
const props = defineProps({
  msg: String
});

// Reactive state
const imgRef = ref(null);
const imageIndex = ref(1);
const numImages = ref(24);
const predictions = ref([]);
const isLoading = ref(true);
const modelInitialized = ref(false);
const nextImageLoaded = ref(false);
const prevImageLoaded = ref(false);
const nextImage = ref(null);
const prevImage = ref(null);

// Fun facts data
const facts = [
  // Ewok facts
  { type: 'ewok', category: 'Star Wars', title: "Forest Moon Warriors", description: "Ewoks are native to the forest moon of Endor, where they live in tree-top villages connected by rope bridges." },
  { type: 'ewok', category: 'Star Wars', title: "Primitive but Effective", description: "Despite their simple appearance, Ewoks are skilled warriors who helped defeat the Empire using primitive weapons and clever tactics." },
  { type: 'ewok', category: 'Star Wars', title: "Height Facts", description: "Ewoks typically stand about 1 meter tall, making them similar in size to many small-to-medium dog breeds." },
  // Puppy facts
  { type: 'puppy', category: 'Dogs', title: "Ancient Partnership", description: "Dogs were the first animals to be domesticated by humans, with evidence suggesting this happened between 15,000 to 40,000 years ago." },
  { type: 'puppy', category: 'Dogs', title: "Intelligence", description: "Puppies can learn basic commands as early as 8 weeks old and can understand over 150 words or signals in adulthood." },
  { type: 'puppy', category: 'Dogs', title: "Social Nature", description: "Like Ewoks, puppies are highly social creatures that form strong bonds with their family groups." },
  // Similarity facts
  { type: 'similarity', category: 'Comparisons', title: "Tribal Nature", description: "Both Ewoks and dogs are pack/tribal animals that work together for the good of their community." },
  { type: 'similarity', category: 'Comparisons', title: "Loyal Defenders", description: "Both are incredibly loyal and will bravely defend their families despite their small size." },
  { type: 'similarity', category: 'Comparisons', title: "Appearance", description: "Many dog breeds, especially teddy bear breeds like Shih Tzus and Ewok Dogs (Brussels Griffon), share a striking resemblance to Ewoks!" },
  // Additional facts to cover all 24 images
  { type: 'ewok', category: 'Star Wars', title: "Resourceful Engineers", description: "Ewoks are known for their ability to create complex traps and weapons from simple forest materials." },
  { type: 'puppy', category: 'Dogs', title: "Emotional Intelligence", description: "Puppies can read human facial expressions and understand emotional tones in human voices." },
  { type: 'similarity', category: 'Comparisons', title: "Problem Solvers", description: "Both species show remarkable ability to solve problems and adapt to new situations." },
  { type: 'ewok', category: 'Star Wars', title: "Cultural Richness", description: "Ewoks have a rich culture including music, ceremonies, and storytelling traditions." },
  { type: 'puppy', category: 'Dogs', title: "Pack Mentality", description: "Puppies naturally form hierarchical social structures, just like Ewok tribes." },
  { type: 'similarity', category: 'Comparisons', title: "Communication Skills", description: "Both use a combination of vocalizations and body language to communicate." },
  { type: 'ewok', category: 'Star Wars', title: "Survival Experts", description: "Ewoks are experts at forest survival and can craft tools from natural materials." },
  { type: 'puppy', category: 'Dogs', title: "Learning Ability", description: "Puppies have the cognitive ability of a 2-year-old human and can learn new skills quickly." },
  { type: 'similarity', category: 'Comparisons', title: "Adaptability", description: "Both species show remarkable ability to adapt to different environments and situations." },
  { type: 'ewok', category: 'Star Wars', title: "Tribal Leadership", description: "Ewok villages are led by tribal chiefs and councils of elders." },
  { type: 'puppy', category: 'Dogs', title: "Social Learning", description: "Puppies learn important skills by observing other dogs and their human family members." },
  { type: 'similarity', category: 'Comparisons', title: "Family Bonds", description: "Both form strong, lasting bonds with their family groups and defend them fiercely." },
  { type: 'ewok', category: 'Star Wars', title: "Forest Dwellers", description: "Ewoks are perfectly adapted to life in the forest canopy of Endor." },
  { type: 'puppy', category: 'Dogs', title: "Human Connection", description: "Puppies have evolved specifically to bond with and understand humans." },
  { type: 'similarity', category: 'Comparisons', title: "Curious Nature", description: "Both Ewoks and puppies share a natural curiosity about their environment." }
];

// Initialize preloaded images object
let preloadedImages = {};

// Computed properties
const currentImageSrc = computed(() => {
  return new URL(`/src/assets/images/${imageIndex.value}.jpg`, import.meta.url).href;
});

const currentFact = computed(() => {
  // Use modulo to cycle through facts if we have more images than facts
  const factIndex = (imageIndex.value - 1) % facts.length;
  return facts[factIndex];
});

// Preload images function
const preloadImages = () => {
  for (let i = 1; i <= numImages.value; i++) {
    if (!preloadedImages[i]) {
      preloadedImages[i] = new Image();
      preloadedImages[i].src = new URL(`/src/assets/images/${i}.jpg`, import.meta.url).href;
    }
  }
};

// Methods
const runPrediction = async () => {
  if (!imgRef.value) {
    console.error('Image reference not available');
    return;
  }
  
  try {
    // Wait for the image to be fully loaded
    if (!imgRef.value.complete) {
      await new Promise(resolve => {
        imgRef.value.onload = resolve;
      });
    }
    
    console.log('Running prediction on image:', imageIndex.value);
    
    // Get predictions using the model service
    const results = await modelPredict(imgRef.value);
    predictions.value = results;
    console.log('Prediction results:', predictions.value);
  } catch (error) {
    console.error('Error during prediction:', error);
  } finally {
    isLoading.value = false;
  }
};

const next = async () => {
  if (imageIndex.value < numImages.value) {
    isLoading.value = true;
    predictions.value = [];
    await nextTick();
    imageIndex.value++;
  }
};

const prev = async () => {
  if (imageIndex.value > 1) {
    isLoading.value = true;
    predictions.value = [];
    await nextTick();
    imageIndex.value--;
  }
};

const onImageLoad = () => {
  console.log('Image loaded, running prediction');
  if (modelInitialized.value) {
    runPrediction();
  } else {
    isLoading.value = false;
    console.warn('Model not yet initialized');
  }
};

const getPredictionColor = (probability) => {
  if (probability > 70) return '#4CAF50'; // Green for high confidence
  if (probability > 40) return '#FFC107'; // Yellow for medium confidence
  return '#F44336'; // Red for low confidence
};

// Watch for image index changes to preload adjacent images
watch(imageIndex, (newIndex) => {
  // Preload next image
  if (newIndex < numImages.value) {
    const nextIdx = newIndex + 1;
    if (!preloadedImages[nextIdx]) {
      preloadedImages[nextIdx] = new Image();
      preloadedImages[nextIdx].src = new URL(`/src/assets/images/${nextIdx}.jpg`, import.meta.url).href;
    }
  }
  
  // Preload previous image
  if (newIndex > 1) {
    const prevIdx = newIndex - 1;
    if (!preloadedImages[prevIdx]) {
      preloadedImages[prevIdx].src = new URL(`/src/assets/images/${prevIdx}.jpg`, import.meta.url).href;
    }
  }
});

// Lifecycle hooks
onMounted(async () => {
  console.log('Component mounted, initializing model');
  isLoading.value = true;
  
  // Start preloading all images
  preloadImages();
  
  try {
    await initializeModel();
    modelInitialized.value = true;
    console.log('Model initialized successfully');
    
    // If the image is already loaded, run prediction
    if (imgRef.value) {
      runPrediction();
    }
  } catch (err) {
    console.error('Error during initialization:', err);
    isLoading.value = false;
  }
});
</script>

<style scoped>
.prediction-bar-container {
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
}

.dark .prediction-bar-container {
  background-color: #374151;
}

.prediction-bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  left: 0;
  top: 0;
}

.prediction-item {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.prediction-item:hover {
  background-color: #f9fafb;
}

.dark .prediction-item:hover {
  background-color: #1f2937;
}

/* Improve mobile touch targets */
@media (max-width: 768px) {
  .prediction-item {
    padding: 0.75rem;
  }
}
</style>
