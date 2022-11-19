let button = document.querySelectorAll('.button');
let textInput = document.querySelector('.firstInput');
let textInput2 = document.querySelector('.secondInput');
let lastSelect = document.querySelector('.lastSelected');

function parse(str) {
    return Function(`
      'use strict'; 
      return (${str})`
    )();
}

textInput.addEventListener('keyup',function(el){
    let value = textInput.value;
    let currentSymb = textInput.value[textInput.value.length-1];

    if(value.match(/[a-zA-Z]+/g)){
        textInput.value = textInput.value.slice(0,-1);
    }

    if(currentSymb.match(/\W+/g) && lastSelect.value != '' && lastSelect.value == 'symbols'){
        textInput.value = textInput.value.slice(0,-1);
    }

    if(currentSymb.match(/\W+/g)){
        lastSelect.value = 'symbols';
    }else{
        lastSelect.value = 'numbers';
    }

    if(el.keyCode == 13){
        if(lastSelect.value == 'symbols') return;
        textInput2.value = textInput.value;
        textInput.value = parse(value);
    }
});


button.forEach(element => {
    element.addEventListener('click', () => {
        let currentData = element.dataset.type;
        let currentText = element.innerText;
        let currentTextInput = textInput.value;

        if(currentData == '='){
            if(lastSelect.value == 'symbols') return;
            textInput2.value = textInput.value;
            textInput.value = parse(currentTextInput);
            return;
        }

        if(currentData.match(/\W+/g) && lastSelect.value != '' && lastSelect.value == 'symbols'){
            return;
        }

        if(currentData.match(/\W+/g)){
            lastSelect.value = 'symbols';
        }else{
            lastSelect.value = 'numbers';
        }

        if(currentData == 'c'){
            textInput.value = '';
            textInput2.value = '';
            return;
        }
       
        textInput.value += currentText;
    });
});
