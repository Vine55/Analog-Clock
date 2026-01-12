const can = document.querySelector('#space')
const m = can.getContext('2d')
can.width = window.innerWidth
can.height = window.innerHeight

function degToRad(r) {
    return(Math.PI*(r/180))
}

function Hand(parent, ratio, num, total, w=2) {
    this.parent = parent
    this.ratio = ratio
    this.total = total
    this.num = num
    this.deg = (360/total*num)-90
    this.w = w
    
    this.draw = (x,y) => {
        this.deg = (360/this.total*this.num)-90
        this.posx = x
        this.posy = y
        this.r = this.parent.size*ratio
        this.y = (this.r*(Math.sin(degToRad(this.deg))))+this.posy
        this.x = (this.r*(Math.cos(degToRad(this.deg))))+this.posx
        m.beginPath()
        m.moveTo(this.posx, this.posy)
        m.lineTo(this.x, this.y)
        m.lineWidth = this.w
        m.stroke()
        m.closePath()
    }

    this.draw(this.deg)
}

function Clock() {
    this.size = Math.min(can.width, can.height)/2
    this.x = can.width/2
    this.y = can.height/2
    this.offset = 0
    this.moveAngle = Math.random()*360
    this.speed = 10
    this.hands = []
    
    //Initializing Clock
    this.loop = () => {
        this.update()
        
        m.beginPath()
        m.arc(this.x, this.y, this.size, 0, degToRad(360))
        m.lineWidth = 3
        m.stroke()
        m.closePath()
        
        m.beginPath()
        m.arc(this.x, this.y, this.size*0.03, 0, degToRad(360))
        m.fill()
        m.closePath()
        
        this.hourHand.draw(this.x, this.y)
        this.minHand.draw(this.x, this.y)
        this.secHand.draw(this.x, this.y)
        
        for (let i=0; i<12; i++) {
            m.textBaseline = "middle"
            m.textAlign = "center"
            m.font = `${this.size*0.1}px cursive`
            this.numsize = this.size*0.9
            numAngle = degToRad((30*i)-60)
            let numy = (this.numsize*Math.sin(numAngle))+this.y
            let numx = (this.numsize*Math.cos(numAngle))+this.x
            m.fillText(i+1, numx, numy)
        }
        
        for (let i=0; i<60; i++) {
            m.beginPath()
            if (i%5!=0) {
                let lAngle = degToRad(i*6)
                let lx1 = (this.size*0.95*Math.cos(lAngle))+this.x
                let ly1 = (this.size*0.95*Math.sin(lAngle))+this.y
                let lx2 = (this.size*Math.cos(lAngle))+this.x
                let ly2 = (this.size*Math.sin(lAngle))+this.y
                
                m.moveTo(lx1, ly1)
                m.lineTo(lx2, ly2)
            }
            m.lineWidth = 1
            m.stroke()
            m.closePath()
        }
        
        this.resize = () => {
            this.x = can.width/2
            this.y = can.height/2
            this.size = Math.min(can.width, can.height)/2
            this.hands.forEach(hand => {
                // hand.r = 
            })
        }
    }
    
    this.secHand = new Hand(this, 0.8, 0, 60)
    this.hands.push(this.secHand)
    this.minHand = new Hand(this, 0.7, 0, 60, 3)
    this.hands.push(this.minHand)
    this.hourHand = new Hand(this, 0.6, 0, 12, 5)
    this.hands.push(this.hourHand)
    
    
    
    this.update = () => {
        this.date = new Date()
        this.milliSecond = this.date.getMilliseconds()
        this.second = this.date.getSeconds()+(this.milliSecond/1000)
        this.min = this.date.getMinutes()+(this.second/60)
        this.hour = this.date.getHours()+this.offset+(this.min/60)
        
        this.hourHand.num = this.hour
        this.minHand.num = this.min
        this.secHand.num = this.second
    }
}
function mainLoop() {
    
    ttime = (Date.now()-time)/1000
    time = Date.now()
    
    tttime = tttime+ttime
    
    m.clearRect(0,0,can.width, can.height)
    clock.loop()
    
    window.requestAnimationFrame(mainLoop)
}

window.onresize = () => {
    can.width = window.innerWidth
    can.height = window.innerHeight
    clock.resize()
}

let time = Date.now()
let tttime=0
clock = new Clock()
mainLoop()
console.log(can.height/can.width)