// Prompt options data
export const promptOptions = {
  photographyType: [
    'Interior Design Photography',
    'Portrait Photography',
    'Architectural Photography',
    'Editorial Photography',
    'Food Photography',
    'Product Photography',
    'Travel Photography',
    'Still Life Photography',
    'Street Photography',
    'Landscape Photography'
  ],
  place: [
    'Café',
    'Kitchen showroom',
    'Art gallery',
    'Industrial loft',
    'Library',
    'Ramen bar',
    'Office lobby',
    'Greenhouse',
    'Castle',
    'Co-working space'
  ],
  weather: [
    'Sunny',
    'Cloudy',
    'Rainy',
    'Foggy',
    'Windy',
    'Clear',
    'Snowy',
    'Warm',
    'Cold',
    'Mild'
  ],
  timeOfDay: [
    'Morning',
    'Noon',
    'Afternoon',
    'Evening',
    'Night',
    'Golden Hour',
    'Blue Hour',
    'Sunrise',
    'Sunset',
    'Late Night'
  ],
  month: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  geographicalLocation: [
    'Germany',
    'Italy',
    'France',
    'Spain',
    'United Kingdom',
    'United States of America',
    'Japan',
    'Morocco',
    'Brazil',
    'India'
  ],
  artStyle: [
    'Minimalism',
    'Scandinavian',
    'Japandi',
    'Art Deco',
    'Bauhaus',
    'Modernism',
    'Mid-Century Modern',
    'Industrial',
    'Coastal Style',
    'Moroccan Modern'
  ],
  colors: [
    'Azure-Blue',
    'Sage-Green',
    'Canary-Yellow',
    'Tangerine-Orange',
    'Cherry-Red',
    'Blush-Pink',
    'Amethyst-Purple',
    'Coal-Black',
    'Alabaster-White',
    'Granite-Grey'
  ],
  materials: [
    'oak',
    'walnut',
    'linen',
    'wool',
    'rattan',
    'concrete',
    'glass',
    'steel',
    'terracotta',
    'marble'
  ],
  patterns: [
    'striped',
    'herringbone',
    'chevron',
    'grid',
    'polka dot',
    'floral',
    'geometric',
    'mosaic tiles',
    'wooden grain',
    'brick'
  ],
  decorElements: [
    'framed paintings',
    'hanging plants',
    'ceramic vases',
    'wall mirrors',
    'throw pillows',
    'table lamps',
    'bookshelves',
    'area rugs',
    'chandeliers',
    'vintage cameras'
  ],
  photographyAngle: [
    'Eye-Level Shot',
    'High Angle Shot',
    'Low Angle Shot',
    'Wide Angle',
    'Close-Up',
    'Top-Down Shot',
    'Three-Quarter View',
    'Front View',
    'Overhead Shot',
    'Wide Shot'
  ],
  lightConditions: [
    'Natural Light',
    'Soft Light',
    'Window Light',
    'Golden Hour',
    'Backlighting',
    'Diffused Light',
    'Overcast Light',
    'Side Lighting',
    'Cinematic Lighting',
    'Neon Light'
  ]
}

// Generate the final prompt
export function generatePrompt(formData) {
  const {
    photographyType,
    focalPoint,
    place,
    weather,
    timeOfDay,
    month,
    geographicalLocation,
    artStyle,
    color1,
    color2,
    color3,
    material1,
    patternDescription,
    decorElement,
    photographyAngle,
    lightConditions
  } = formData

  // Build the main description
  let prompt = `${photographyType} of a ${focalPoint} inside of a ${place} on a ${weather} ${timeOfDay} in ${month} in ${geographicalLocation}.`

  // Add style and design details
  if (artStyle && color1 && color2 && patternDescription && color3 && decorElement) {
    prompt += ` The ${artStyle}-inspired ${place} features ${color1} walls with ${color2} ${patternDescription} details, complemented by ${color3} accents and decorated with ${decorElement}.`
  }

  // Add composition and technical details
  prompt += ` The composition emphasizes a ${focalPoint}. Captured with ${photographyAngle} under ${lightConditions}.`

  // Add tags
  const tags = [
    photographyType,
    color1,
    color2,
    color3,
    artStyle,
    material1,
    photographyAngle,
    lightConditions
  ].filter(Boolean)

  if (tags.length > 0) {
    prompt += ` ${tags.join(', ')}`
  }

  return prompt
}

// Randomize all fields
export function randomizeFormData(options) {
  const randomized = {}
  
  Object.keys(options).forEach(key => {
    const optionArray = options[key]
    if (Array.isArray(optionArray) && optionArray.length > 0) {
      randomized[key] = optionArray[Math.floor(Math.random() * optionArray.length)]
    }
  })

  return randomized
}

// Harmonize fields with coherent combinations
export function harmonizeFormData(currentData, options) {
  const harmonized = { ...currentData }
  
  // Define harmonious combinations
  const harmoniousCombinations = {
    // Scandinavian combinations
    scandinavian: {
      artStyle: 'Scandinavian',
      colors: ['Alabaster-White', 'Granite-Grey', 'Sage-Green'],
      materials: ['oak', 'linen', 'wool'],
      patterns: ['striped', 'geometric'],
      decorElements: ['hanging plants', 'throw pillows', 'area rugs']
    },
    // Industrial combinations
    industrial: {
      artStyle: 'Industrial',
      colors: ['Coal-Black', 'Granite-Grey', 'Tangerine-Orange'],
      materials: ['concrete', 'steel', 'glass'],
      patterns: ['grid', 'brick'],
      decorElements: ['wall mirrors', 'vintage cameras', 'table lamps']
    },
    // Japandi combinations
    japandi: {
      artStyle: 'Japandi',
      colors: ['Alabaster-White', 'Sage-Green', 'Granite-Grey'],
      materials: ['oak', 'linen', 'rattan'],
      patterns: ['geometric', 'wooden grain'],
      decorElements: ['hanging plants', 'ceramic vases', 'bookshelves']
    }
  }

  // Choose a random harmonious style
  const styles = Object.keys(harmoniousCombinations)
  const selectedStyle = styles[Math.floor(Math.random() * styles.length)]
  const combination = harmoniousCombinations[selectedStyle]

  // Apply harmonious combinations
  if (combination.artStyle) {
    harmonized.artStyle = combination.artStyle
  }
  
  if (combination.colors) {
    const shuffledColors = [...combination.colors].sort(() => Math.random() - 0.5)
    harmonized.color1 = shuffledColors[0] || ''
    harmonized.color2 = shuffledColors[1] || ''
    harmonized.color3 = shuffledColors[2] || ''
  }
  
  if (combination.materials) {
    harmonized.material1 = combination.materials[Math.floor(Math.random() * combination.materials.length)]
  }
  
  if (combination.patterns) {
    harmonized.patternDescription = combination.patterns[Math.floor(Math.random() * combination.patterns.length)]
  }
  
  if (combination.decorElements) {
    harmonized.decorElement = combination.decorElements[Math.floor(Math.random() * combination.decorElements.length)]
  }

  // Randomize other fields that aren't part of the harmonious combination
  const fieldsToRandomize = [
    'photographyType', 'place', 'weather', 'timeOfDay', 'month',
    'geographicalLocation', 'photographyAngle', 'lightConditions'
  ]
  
  fieldsToRandomize.forEach(field => {
    if (options[field] && Array.isArray(options[field])) {
      harmonized[field] = options[field][Math.floor(Math.random() * options[field].length)]
    }
  })

  return harmonized
}
