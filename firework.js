let container = document.querySelector(".container")
let containerBound = container.getBoundingClientRect()
let screenWidth = containerBound.width
let screenHeight = containerBound.height

let randomXPosition = Math.floor(Math.random() * screenWidth)
let randomYPosition = Math.floor(Math.random() * screenHeight)
let zValue = 1
let randomColor = [
    "#FFDD33", // Bright yellow
    "#FFA500", // Orange
    "#FF4500", // Red-orange
    "#FF0000", // Bright red
    "#00FF00", // Neon green
    "#32CD32", // Lime green
    "#1E90FF", // Dodger blue
    "#0000FF", // Bright blue
    "#8A2BE2", // Purple
    "#EE82EE", // Violet
    "#FFFFFF", // White (for spark highlights)
    "#FFD700", // Gold
    "#FF69B4", // Hot pink
    "#00FFFF", // Cyan
    "#FF6347"  // Tomato red
  ]
let randomBalls =[20,40, 30, 60]
let unusedSparkballs = []
function createBall(w, h,xPos, yPos){
let ball = document.createElement("div")
ball.classList.add("ball")
let dom = container.prepend(ball)
ball.style.transform = `translate(${w/2}px,${h}px)`
ball.style.backgroundColor = randomColor[Math.floor(Math.random() * randomColor.length)]
ball.style.zIndex = zValue
return ball
}
let done = false

function moveBall(ball,xPos, yPos){
    const timer = setTimeout(()=> {
        ball.style.transform = `translate(${xPos}px,${yPos}px)`
        done = true
        createSpark()
}, 200)

// console.log(ball, ball.)
console.log(ball)
}


function createSparkBall(currXPos, currYPos ){
let ball = document.createElement("div")
ball.classList.add("ball")
ball.style.transform = `translate(${currXPos}px,${currYPos}px)`
ball.style.backgroundColor = randomColor[Math.floor(Math.random() * randomColor.length)]
zValue +=1 
ball.style.zIndex = zValue
return ball
}

function spark(ball, xPos, yPos){
    const timer = setTimeout(()=> {
        for(let i = 0; i < 5; i++){
        ball.style.transform = `translate(${xPos+i}px,${yPos+i}px)`
        }

        done = true
        fadeBall(ball)
},500)
}


const fadeBall = (ball)=> {
    let ballList  =  document.querySelectorAll(".ball")
    ballList.forEach((balls,i)=>{
       balls.style.width = `${0}px`
       balls.style.height = `${0}px`
    
    })

}



function createSpark(){
    let ball = null
    for(let i = 0; i < randomBalls[Math.floor(Math.random() * randomBalls.length)]; i++){
        let ball = createSparkBall(randomXPosition, randomYPosition)
        container.prepend(ball)
        spark(ball, randomXPosition+Math.random()*300, randomYPosition+Math.random()*300)
       unusedSparkballs.push(ball)
    console.log(container.children.length)
    }
}




setInterval(()=>{
    if(unusedSparkballs.length > 0){
       unusedSparkballs.forEach((sparkBall)=>{
        sparkBall.remove()
       })
    }
    randomXPosition =  Math.floor(Math.random() * screenWidth)
    randomYPosition = Math.floor(Math.random() * screenHeight)
    let ball = createBall(screenWidth, screenHeight, randomXPosition, randomYPosition
    )
    unusedSparkballs.push(ball)
    moveBall(ball, randomXPosition, randomYPosition)
}, 1000)