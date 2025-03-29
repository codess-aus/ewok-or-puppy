<template>
  <div class="relative isolate overflow-hidden bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About the Project</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          This fun project uses TensorFlow.js and Custom Vision to determine whether an image contains an Ewok or a puppy. 
          It's a playful nod to the striking resemblance between our furry Earth companions and the fierce warriors of Endor.
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
        <div class="relative lg:order-last lg:col-span-5">
          <figure class="border-l border-indigo-600 pl-8">
            <blockquote class="text-xl font-semibold leading-8 tracking-tight text-gray-900">
              <p>"Many of the truths we cling to depend greatly on our own point of view. From a certain angle, every puppy could be an Ewok."</p>
            </blockquote>
            <figcaption class="mt-8 flex gap-x-4">
              <div class="text-sm leading-6">
                <div class="font-semibold text-gray-900">Obi-Wan Kenobi*</div>
                <div class="text-gray-600">*May not be an actual quote</div>
              </div>
            </figcaption>
          </figure>
        </div>
        <div class="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
          <p>
            Our AI model was trained on a diverse dataset of both Ewok and puppy images, learning to distinguish between 
            the distinctive features of each. While Ewoks are fictional creatures from the Star Wars universe, their 
            resemblance to certain dog breeds is uncanny!
          </p>
          <ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600">
            <li class="flex gap-x-3">
              <span class="mt-1 h-5 w-5 flex-none text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
              </span>
              <span><strong class="font-semibold text-gray-900">Browser-based AI.</strong> All processing happens right in your browser using TensorFlow.js, ensuring fast results and privacy.</span>
            </li>
            <li class="flex gap-x-3">
              <span class="mt-1 h-5 w-5 flex-none text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
              </span>
              <span><strong class="font-semibold text-gray-900">Modern web technologies.</strong> Built with Vue 3, Vite, and TailwindCSS for a smooth user experience.</span>
            </li>
            <li class="flex gap-x-3">
              <span class="mt-1 h-5 w-5 flex-none text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
              </span>
              <span><strong class="font-semibold text-gray-900">Open source.</strong> Feel free to contribute and help improve the detection capabilities!</span>
            </li>
          </ul>
          <p class="mt-8">
            Whether you're a Star Wars fan, a dog lover, or just curious about AI, we hope you enjoy using this 
            playful tool to explore the amusing similarity between our furry friends and the brave warriors of Endor.
          </p>
          <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">How accurate is it?</h2>
          <p class="mt-6">
            While our model has been trained on numerous images, it's important to remember that this is a fun project 
            and shouldn't be used for any serious Ewok detection purposes. After all, if the Empire couldn't properly 
            identify Ewoks, we can't guarantee our AI will do any better!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>