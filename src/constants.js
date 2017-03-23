var constants = {
    Width: 50,
    Height: 20,
    Size: 20,
    InitialSpeed: 100,
    ArrowLeft: 39,
    ArrowRight: 37,
    Enter: 13,
    Pieces: [
        {
        	name:"Stick", 
        	piece: [0, 1, 2, 3], 
            aColor: 'red',
            size: 4, 
        },{
        	name:"Gun", 
        	piece: [0, 1, 5, 9], 
            aColor: 'yellow',
            size: 2, 
        },{
        	name:"GunI", 
        	piece: [0, 1, 5, 9], 
            aColor: 'violet',
            size: 2, 
        },{
        	name:"Zheta", 
        	piece: [8, 4, 5, 1], 
            aColor: 'orange',
            size: 2, 
        },{
        	name:"ZhetaI", 
        	piece: [0, 4, 5, 9], 
            aColor: 'lightblue',
            size: 2, 
        },{
        	name:"BigSquare", 
        	piece: [0, 1, 4, 5], 
            aColor: 'blue',
            size: 2,
        },{
        	name:"The", 
        	piece:  [0, 4, 8, 5], 
            aColor: 'green',
            size:2 
        }
    ]
}
module.exports = constants;
