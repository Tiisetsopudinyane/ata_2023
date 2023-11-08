document.addEventListener('alpine:init', () => {
    // Define an Alpine component named 'images'
    Alpine.data('images', () => {
      return {
        brandImages: [],     // An array to store brand images data
        selectedBrand: '',   // The selected brand filter value
        
        // Initialization function that gets called when the component is initialized
        init() {
          // Call the 'getAllData' function to load all brand data
          this.getAllData();
        },
        
        // Function to fetch all brand data
        getAllData() {
          // Make an HTTP GET request to '/api/getAllBrands' and load the brand images data
          axios.get('/api/getAllBrands').then((results) => {
            this.brandImages = results.data.imagesBase64;
          });
        },
        
        // Function to filter brand data based on the selected brand
        getSelectedBrand() {
          axios.post('/api/filter', {
            brandName: this.selectedBrand,
          }).then((result) => {
            // Handle the response from the filter request if needed
          });
        }
      };
    });
  });
  