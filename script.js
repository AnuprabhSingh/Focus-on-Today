

const allCheckBoxes = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const showError = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')


const allGoals = JSON.parse(localStorage.getItem('allGoals'))||{
    first:{
        name:'',
        completed:'',
    },
    second:{
        name:'',
        completed:'',
    },
    third:{
        name:'',
        completed:'',
    },
}
let completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length
progressValue.style.width = `${completedGoalsCount/3 *100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`

allCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{

        const allFieldsFilled = [...inputFields].every((input)=>{
            return input.value;
        })
        if(allFieldsFilled){
            checkbox.parentElement.classList.toggle("completed")
            const InputId = checkbox.nextElementSibling.id
            allGoals[InputId].completed = !allGoals[InputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length
            progressValue.style.width = `${completedGoalsCount/3 *100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
            showError.classList.add('show-error')
        }
    })
})

inputFields.forEach((input)=>{

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus',()=>{
        showError.classList.remove('show-error')
    })

    

    input.addEventListener('input',(e)=>{

        if(allGoals[input.id].completed){
            e.target.value = allGoals[input.id].name
            return
        }
        allGoals[input.id] = {
            name:input.value,
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
        
    })
})