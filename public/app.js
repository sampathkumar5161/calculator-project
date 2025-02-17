

const history = document.querySelector('.history')
const close = document.querySelector('.x');
const historyTab = document.querySelector('.history-tab');
    const buttons = document.querySelectorAll(".number, .operator,.arth");
    const values = document.querySelector(".display-values");
     const historyBtn =document.querySelector('.icon');
     historyBtn.addEventListener('click',()=>{
        historyTab.style.visibility = 'visible';
     
    })
    ;

    close.addEventListener('click',()=>{

        historyTab.style.visibility = 'hidden';
    })
    let expression = "";

    buttons.forEach(button => {
        const keys = button.innerText;

       
        if (['+','-','x','/'].includes(keys)) {
            button.addEventListener("click", () => {
                expression += keys;
                
                values.value= expression;
               
            });
        } 
        
        else if (keys === "=") {
            button.addEventListener("click", () => {
                try {
                    let finalExpression = expression.replace('x', "*");
                    let result = eval(finalExpression);
                    values.value = result;
                       
                    
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ expression, result })
                    });
                    expression = "";
                   
                    fetch('/history').then(response=> response.text())
                    .then(data=>  history.innerText = data).catch(err=> console.log('error in fetching',err));
                   
                } catch {
                    values.value = "Error";
                    expression = "";
                }
            });
        } 
       
        else if (keys === "CLR") {
            button.addEventListener("click", () => {
                expression = "";
                values.value= "";
            });
        } 
        else if(keys === "DEL"){
            button.addEventListener('click',()=>{
                values.value = values.value.slice(0, -1);
                expression = expression.slice(0,-1)
               
               preventDefault();
            })
           
        }
       
        else {
            button.addEventListener("click", () => {
                expression += keys;
                values.value = expression;
            });
        }
    });


document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        values.value += key;
        event.preventDefault();
    }
    if (["+", "-", "*", "/"].includes(key)) {
        values.value += key;
        event.preventDefault();
    }
    if (key === "Enter") {
        try {
            expression= values.value ;
            let finalExpression = expression.replace('x', "*");
            let result = eval(finalExpression);
            values.value = result;
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ expression, result })
            });
           
           fetch('/history').then(response=> response.text())
            .then(data=>  history.innerText = data).catch(err=> console.log('error in fetching',err));
           
            expression="";
            
          
            event.preventDefault();
             } catch {
            values.value = "Error"; // Handle errors
        }     
};
    
    if (key === "Backspace") {
        values.value = values.value.slice(0, -1);
        event.preventDefault();
    }
    if (key === "Escape") {
        values.value = "";
        event.preventDefault();
    }
});



