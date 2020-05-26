let canvas = document.getElementById('mycanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var shape ='square';
var min = document.getElementById('min');
var max = document.getElementById('max');
var color = document.getElementById('color')
var speed = 1;
// 绘制上下文
let ctx = canvas.getContext('2d');

// 获取radiobox的值

// 增加颜色
var panel = document.getElementById('panel');
                
function addElement (color) { 
        let newDiv = document.createElement("div"); 
        let newContent = document.createTextNode(color); 
        // 添加文本节点 到这个新的 div 元素
        newDiv.appendChild(newContent); 
        newDiv.value = color;
        newDiv.style.backgroundColor = color;
        newDiv.style.width = '50px';
        newDiv.style.margin = '0 5px'
        newDiv.style.display = 'inline-block';
        newDiv.style.borderRadius = '50px';
        newDiv.onclick = deleteColor; // 不加括号，加了就直接调用函数了

        // 将这个新的元素和它的文本添加到 DOM 中
        panel.appendChild(newDiv);
        };

function updateColor(){
        let color = document.getElementById('color').value;
        creamColor.push(color);

        addElement(color); 
        switchColor();
}

function deleteColor(){   
        let c = this.value;     
        let i = creamColor.indexOf(c)   
        this.parentNode.removeChild(this);  
        creamColor.splice(i,1);  
        switchColor();
};

function switchColor(){
        switch(shape){
                case 'square':
                        for(let s of sArr){
                        s.color = creamColor[Math.floor(Math.random()*(creamColor.length-0+1))]; 
                };
                        break;
                case 'ball':
                        for(let b of ballArr){
                                b.color = creamColor[Math.floor(Math.random()*(creamColor.length-0+1))]; 
                        };
                        break;
                case 'circle':
                        for(let c of cArr){
                                c.color = creamColor[Math.floor(Math.random()*(creamColor.length-0+1))]; 
                        };
                        break;
                case 'tri':
                        for(let t of tArr){
                                t.color = creamColor[Math.floor(Math.random()*(creamColor.length-0+1))]; 
                        };
                        break;
        };
}

// 速率
function changeSpeed(how){
        if(how == '+'){
                speed += 0.5;
        }else{
                speed -= 0.5;
        }
        
        switch(shape){
        case 'square':
                for(let s of sArr){
                s.dx = ( Math.random() - 0.5 ) * speed;
                s.dy = ( Math.random() - 0.5 ) * speed;
        };
                break;
        case 'ball':
                for(let b of ballArr){
                        b.dx = ( Math.random() - 0.5 ) * speed;
                        b.dy = ( Math.random() - 0.5 ) * speed;
                };
                break;
        case 'circle':
                for(let c of cArr){
                        c.dx = ( Math.random() - 0.5 ) * speed;
                        c.dy = ( Math.random() - 0.5 ) * speed;
                };
                break;
        case 'tri':
                for(let t of tArr){
                        t.dx = ( Math.random() - 0.5 ) * speed;
                        t.dy = ( Math.random() - 0.5 ) * speed;
                };
                break;

        }
};


// 实现每次点击按钮就更新一次
function getAnswer(){
        let radios = document.getElementsByName('shape');
        for ( var i = 0; i<radios.length; i++){
                if(radios[i].checked){
                        shape = radios[i].value
                }
        }

        // 每次点击后都生成一个新的数组！
        ballArr = [];
        sArr = [];
        cArr = [];
        tArr = [];

        for (let i = 0; i < 100; i++){
                let radius = Math.floor(Math.random()*(parseInt(max.value) - parseInt(min.value) +1)) + parseInt(min.value);  // 半径为【3，7】随机整数
                let x = radius + Math.random()*(canvas.width - 2*radius); 
                let y = radius + Math.random()*(canvas.height - 2*radius); 
                let dx = ( Math.random() - 0.5 ) * speed;
                let dy = ( Math.random() - 0.5 ) * speed;
                let color = creamColor[Math.floor(Math.random()*(creamColor.length-0+1))]; 
        
                if (shape == 'ball'){
                        ballArr.push(new Ball(x,y,dx,dy,speed,radius,color))
                }
                else if (shape =='square'){
                        sArr.push(new Square(x,y,radius,dx,dy,speed,color))
                }    
                else if (shape =='circle'){
                        cArr.push(new Circle(x,y,dx,dy,speed,radius,color))
                }  
                else if (shape == 'tri'){
                        tArr.push(new Triangle(x,y,radius,dx,dy,speed,color))
                }
        }

        return shape
}

// 建立一个小球对象
function Ball(x,y,dx,dy,speed,radius,color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.radius = radius;
        this.color = color;

        this.draw = function(){
                ctx.beginPath();
                ctx.arc(this.x,this.y, this.radius,0, Math.PI*2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
        };

        this.update = function(){
                // 检测边界 改变小球方向
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                        this.dx = -this.dx;
                }
                this.x += this.dx;
                if (this.y + this.radius > canvas.height|| this.y - this.radius < 0) {
                        this.dy = -this.dy;
                }
                this.y += this.dy;
                this.draw();
        }
};

// 建立一个环对象
function Circle(x,y,dx,dy,speed,radius,color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.radius = radius;
        this.color = color;

        this.draw = function(){
                ctx.beginPath();
                ctx.arc(this.x,this.y, this.radius,0, Math.PI*2);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.closePath();
                ctx.stroke();
        };

        this.update = function(){
                // 检测边界 改变小球方向
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                        this.dx = -this.dx;
                }
                this.x += this.dx;
                if (this.y + this.radius > canvas.height|| this.y - this.radius < 0) {
                        this.dy = -this.dy;
                }
                this.y += this.dy;
                this.draw();
        }
};


// 建立一个方块对象
function Square(x,y,w,dx,dy,speed,color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.color = color;

        this.draw = function(){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x,this.y,this.w,this.w);
        };

        this.update = function(){
                 // 检测边界 改变小球方向
                if (this.x + this.w > canvas.width || this.x < 0) {
                        this.dx = -this.dx;
                }
                this.x += this.dx;
                if (this.y + this.w > canvas.height|| this.y < 0) {
                        this.dy = -this.dy;
                }
                this.y += this.dy;
                this.draw();
        }
};

// 建立一个三角对象
function Triangle(x,y,w,dx,dy,speed,color){
        this.x = x;
        this.y = y;
        this.w = w+5;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
        this.color = color;

        this.draw = function(){
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(1/2*this.w + this.x, this.y + Math.sin(Math.PI/180*60) * this.w);
                ctx.lineTo(this.x-1/2*this.w, this.y + Math.sin(Math.PI/180*60) * this.w);
                ctx.lineTo(this.x,this.y),
                ctx.fill();
                ctx.closePath();
        };

        this.update = function(){
                 // 检测边界 改变小球方向
                if (this.x + this.w > canvas.width || this.x < 0) {
                        this.dx = -this.dx;
                }
                this.x += this.dx;
                if (this.y + this.w > canvas.height|| this.y < 0) {
                        this.dy = -this.dy;
                }
                this.y += this.dy;
                this.draw();
        }
};

let ballArr = [];
let sArr = [];
let cArr = [];
let tArr = [];
let greenColor = ['#003300','#669933','#CCCC99','#006633','#99CC99','#666633'];
let creamColor = ['#FFCCCC','#FFFF99','#CCCCFF','#99CCCC','#FFCC99','#CCCC99','#CCFFFF'];

for(var i = 0; i<creamColor.length; i++){
        addElement(creamColor[i]);
}


// 动画
function animate(){
        requestAnimationFrame(animate); // 浏览器自带的刷新动画用的 自己回调自己。
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (shape == 'ball'){
                for (let b of ballArr) {
                        b.update()
                  };
        }
        else if (shape =='square'){
                for (let s of sArr) {
                        s.update()
                  };
        }
        else if (shape =='circle'){
                for (let c of cArr) {
                        c.update()
                  };
        }
        else if (shape =='tri'){
                for (let t of tArr) {
                        t.update()
                  };
        }
        
}

getAnswer();
animate();