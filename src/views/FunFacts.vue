<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fun Facts</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">Discover interesting tidbits about both Ewoks and puppies!</p>
      </div>
      
      <!-- Fact cards grid -->
      <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <!-- Ewok facts -->
        <article v-for="(fact, index) in ewokFacts" :key="'ewok'+index" class="flex flex-col items-start">
          <div class="rounded-lg bg-indigo-50 p-6 w-full h-full">
            <div class="flex items-center gap-x-4 text-xs mb-4">
              <time class="text-gray-500">Ewok Fact #{{ index + 1 }}</time>
              <span class="relative z-10 rounded-full bg-indigo-200 px-3 py-1.5 font-medium text-gray-600">Star Wars</span>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span>{{ fact.title }}</span>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ fact.description }}</p>
            </div>
          </div>
        </article>

        <!-- Puppy facts -->
        <article v-for="(fact, index) in puppyFacts" :key="'puppy'+index" class="flex flex-col items-start">
          <div class="rounded-lg bg-rose-50 p-6 w-full h-full">
            <div class="flex items-center gap-x-4 text-xs mb-4">
              <time class="text-gray-500">Puppy Fact #{{ index + 1 }}</time>
              <span class="relative z-10 rounded-full bg-rose-200 px-3 py-1.5 font-medium text-gray-600">Dogs</span>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span>{{ fact.title }}</span>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ fact.description }}</p>
            </div>
          </div>
        </article>

        <!-- Similarity facts -->
        <article v-for="(fact, index) in similarityFacts" :key="'sim'+index" class="flex flex-col items-start">
          <div class="rounded-lg bg-amber-50 p-6 w-full h-full">
            <div class="flex items-center gap-x-4 text-xs mb-4">
              <time class="text-gray-500">Similarity #{{ index + 1 }}</time>
              <span class="relative z-10 rounded-full bg-amber-200 px-3 py-1.5 font-medium text-gray-600">Comparisons</span>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span>{{ fact.title }}</span>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ fact.description }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const ewokFacts = [
  {
    title: "Forest Moon Warriors",
    description: "Ewoks are native to the forest moon of Endor, where they live in tree-top villages connected by rope bridges."
  },
  {
    title: "Primitive but Effective",
    description: "Despite their simple appearance, Ewoks are skilled warriors who helped defeat the Empire using primitive weapons and clever tactics."
  },
  {
    title: "Height Facts",
    description: "Ewoks typically stand about 1 meter tall, making them similar in size to many small-to-medium dog breeds."
  }
]

const puppyFacts = [
  {
    title: "Ancient Partnership",
    description: "Dogs were the first animals to be domesticated by humans, with evidence suggesting this happened between 15,000 to 40,000 years ago."
  },
  {
    title: "Intelligence",
    description: "Puppies can learn basic commands as early as 8 weeks old and can understand over 150 words or signals in adulthood."
  },
  {
    title: "Social Nature",
    description: "Like Ewoks, puppies are highly social creatures that form strong bonds with their family groups."
  }
]

const similarityFacts = [
  {
    title: "Tribal Nature",
    description: "Both Ewoks and dogs are pack/tribal animals that work together for the good of their community."
  },
  {
    title: "Loyal Defenders",
    description: "Both are incredibly loyal and will bravely defend their families despite their small size."
  },
  {
    title: "Appearance",
    description: "Many dog breeds, especially teddy bear breeds like Shih Tzus and Ewok Dogs (Brussels Griffon), share a striking resemblance to Ewoks!"
  }
]
</script>