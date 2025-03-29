<template>
  <button
    aria-label="Toggle dark mode"
    class="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
    @click="toggleDarkMode"
  >
    <!-- Sun icon for dark mode (shown when in dark mode) -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 text-yellow-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clip-rule="evenodd"
      />
    </svg>
    <!-- Moon icon for light mode (shown when in light mode) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 text-gray-700"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
    <span v-if="isDark" class="font-medium text-gray-800 dark:text-gray-200">Light Mode</span>
    <span v-else class="font-medium text-gray-800 dark:text-gray-200">Dark Mode</span>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDark = ref(false);

// Toggle between light and dark mode
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

// Update theme based on isDark value
const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};

// Initialize theme based on local storage or system preference
onMounted(() => {
  // Check if user has previously set a theme preference
  if (localStorage.theme === 'dark' || 
     (!('theme' in localStorage) && 
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
  } else {
    isDark.value = false;
  }
  
  updateTheme();
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.theme) { // Only auto-switch if user hasn't manually set preference
      isDark.value = e.matches;
      updateTheme();
    }
  });
});
</script>