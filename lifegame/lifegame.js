var board = document.getElementById('board');
var divs = board.getElementsByTagName('div');

// 画网格
for(let i = 0; i < 2500; i++){
        addDiv(i);
};


function addDiv(i){
        let newDiv = document.createElement('div');
        newDiv.value = i;
        newDiv.classList.add('square');
        board.appendChild(newDiv);
        newDiv.addEventListener('click',selectDiv);
};

function selectDiv(e){
        if (this.style.background == 'cornflowerblue'){
                this.style.background = 'none';
                this.style.border = '0.1px solid rgba(226, 218, 218, 0.123)';
        }
        else{ 
                this.style.background = 'cornflowerblue';
                this.style.border = '0.1px solid black';
        };
        console.log(this.value);
           
};
function random(){
        clearAll();
        // 每个div都获取（0-1）的随机数

        for(var i = 0; i<divs.length; i++){
                flag = Math.random();
                if (flag > 0.9){
                        divs[i].style.background = 'cornflowerblue';
                        divs[i].style.border = '0.1px solid black';
                }
        }
   
};

function start(){
        timer = setInterval(update,1000);
        autostopTimer = setInterval(autoStop,1000)            
};

function autoStop(){
        for(let i=0; i<countArr.length; i++){
                if(countArr[i] != 0){
                        return;
                }
        };
        clearInterval(timer);
        clearInterval(autostopTimer);
};

function stop(){
        clearInterval(timer);
};

function clearAll(){
        console.log('ckear');
        for(var i=0; i<divs.length; i++){
                divs[i].style.background = 'none';
                divs[i].style.border = '0.1px solid rgba(226, 218, 218, 0.123)';
        };
};

function update(){
        divs = board.getElementsByTagName('div');
        countArr = []; // 该数组存储所有点的周围存活生命数[] 长度为2500
        for (let i = 0; i<divs.length; i++){
                countArr.push(getNeighbor(i));
                
        };

        console.log(countArr);
        
        for (let j = 0; j<countArr.length; j++){
                if (countArr[j]>3 || countArr[j]< 2){
                        divs[j].style.background = 'none';
                        divs[j].style.border = '0.1px solid rgba(226, 218, 218, 0.123)';
                } else if (countArr[j] == 3) {
                        divs[j].style.background= 'cornflowerblue';
                        divs[j].style.border = '0.1px solid black';
                } 
        };
}

function getNeighbor(i){
        let aroundArr = getAroundArr(i); // 数组       
        let count = 0;

        // 看八个里哪些活着
        for (let j = 0; j<aroundArr.length; j++){
                if(aroundArr[j].style.background == 'cornflowerblue'){
                        count += 1;
                };
        };

        return count 
}

function getAroundArr(i){
        let divs = board.getElementsByTagName('div');
        let aroundArr = [divs[i-49],divs[i-50],divs[i-51],divs[i-1],divs[i+1],divs[i+49],divs[i+50],divs[i+51]];
        let result = []
        
        for(let j = 0; j<aroundArr.length; j++){
                if (aroundArr[j]){
                        result.push(aroundArr[j])
                }
        }
        
        return result
};