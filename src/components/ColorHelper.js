module.exports = {
  // Returns a Color according to the given value.
  customColor: (value) => {
    switch (true) {
      case (value < 50): return { class: 'green', color: '#4CAF50' };
      case (value < 75): return { class: 'green darken-2', color: '#388E3C' };
      case (value < 90): return { class: 'orange darken-2', color: '#F57C00' };
      case (value < 100): return { class: 'orange darken-4', color: '#E65100' };
      case (value < 150): return { class: 'red', color: '#F44336' };
      case (value < 200): return { class: 'purple', color: '#9C27B0' };
      case (value < 300): return { class: 'blue darken-1', color: '#1E88E5' };
      case (value < 400): return { class: 'yellow darken-1', color: '#FDD835' };
      case (value < 500): return { class: 'pink accent-2', color: '#FF4081' };
      case (value < 600): return { class: 'cyan', color: '#00BCD4' };
      case (value < 700): return { class: 'orange darken-1', color: '#FB8C00' };
      case (value < 800): return { class: 'lime lighten-1', color: '#D4E157' };
      case (value < 900): return { class: 'brown darken-1', color: '#6D4C41' };
      case (value < 1000): return { class: 'deep-orange accent-3', color: '#FF3D00' };
      default:
        return { class: 'cyan accent-2', color: '#18FFFF' };
    }
  },
};
