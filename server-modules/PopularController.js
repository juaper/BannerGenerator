
const PopularController = (()=>{

    const getObjectAsArray = (obj)=>{
        let arr = [];
        for (var prop in obj){
            arr.push(obj[prop]);
        }
        return arr;
    };

    const getCurrentSortedData = (data)=>{
        return  getObjectAsArray(data).filter(meme => meme.name).sort((a,b) => b.rating - a.rating).slice(0,24);
    };


    return {
        getCurrentSortedData : getCurrentSortedData
    }
})();

module.exports = PopularController;