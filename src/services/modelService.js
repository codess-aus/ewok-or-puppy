import * as cvstfjs from 'customvision-tfjs';

// Store the model instance globally to prevent reloading
let modelInstance = null;
let labelsCache = null;

/**
 * Initialize TensorFlow.js and load the model
 */
export async function initializeModel() {
  console.log('Initializing model');
  
  try {
    if (!modelInstance) {
      console.log('Creating new model instance');
      modelInstance = new cvstfjs.ClassificationModel();
      
      console.log('Loading model from /models/model.json');
      await modelInstance.loadModelAsync('/models/model.json');
      console.log('Model loaded successfully');
    } else {
      console.log('Using cached model instance');
    }
    
    return modelInstance;
  } catch (error) {
    console.error('Error initializing model:', error);
    throw error;
  }
}

/**
 * Load labels from the labels.txt file
 */
export async function loadLabels() {
  if (labelsCache) {
    return labelsCache;
  }
  
  try {
    console.log('Loading labels from /models/labels.txt');
    const response = await fetch('/models/labels.txt');
    
    if (!response.ok) {
      throw new Error(`Error loading labels: ${response.statusText}`);
    }
    
    const text = await response.text();
    labelsCache = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
      
    console.log('Labels loaded:', labelsCache);
    return labelsCache;
  } catch (error) {
    console.error('Failed to load labels:', error);
    // Use fallback labels
    labelsCache = ['Ewok', 'Puppy'];
    return labelsCache;
  }
}

/**
 * Run prediction on an image element
 */
export async function predict(imageElement) {
  if (!imageElement) {
    throw new Error('No image element provided');
  }
  
  try {
    if (!modelInstance) {
      modelInstance = await initializeModel();
    }
    
    const labels = await loadLabels();
    
    console.log('Running prediction on image element');
    const predictions = await modelInstance.executeAsync(imageElement);
    
    if (!predictions || !predictions[0]) {
      throw new Error('No prediction data returned');
    }
    
    const probabilities = predictions[0];
    console.log('Raw prediction probabilities:', probabilities);
    
    // Format the results
    return probabilities.map((probability, index) => ({
      label: index < labels.length ? labels[index] : `Class ${index}`,
      probability: probability * 100,
      index
    })).sort((a, b) => b.probability - a.probability);
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
}