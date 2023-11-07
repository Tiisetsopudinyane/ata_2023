document.addEventListener('alpine:init', () => {
	Alpine.data('images', () => {

		return {
            brandImages:[],
            selectedBrand:'',

            init(){
                this.getAllData()
            },
            getAllData(){
                axios.get('/api/getAllBrands').then((results)=>{
                    this.brandImages=results.data.imagesBase64
                    
                })
            },
            getSelectedBrand(){
                axios.post('/api/filter',{
                    brandName:this.selectedBrand
                }).then((result)=>{
                    
                })
            }
					
        }
	});
})