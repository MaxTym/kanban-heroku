// cookie csrf function
function getCookie(name) {
   var cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       var cookies = document.cookie.split(';');
       for (var i = 0; i < cookies.length; i++) {
           var cookie = jQuery.trim(cookies[i]);
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


// add function
function taskPost(){
    var taskName = document.getElementById("addTask").value
    var taskStatus = document.getElementById("status").value
    var priority =document.getElementById("priority").value
    if (taskStatus != 'Status' &&  priority != 'Priority'  &&  taskName != '') {
    var postdata = {'title': taskName, 'status': taskStatus, 'priority': priority}
    jQuery.ajax({url:'/api/tasks/', data:postdata, type:'POST'
    }).done(function(){
        location = location
    })
    }
    else {
        console.log("2")
        alert("You must enter task/priority/status!");
    }
}


// organize and build lists
function organizeByStatus(){
   var $newHList = $("<ol>")
   var $newMList = $("<ol>")
   var $newLList = $("<ol>")
   var $progressHList = $("<ol>")
   var $progressMList = $("<ol>")
   var $progressLList = $("<ol>")
   var $completeHList = $("<ol>")
   var $completeMList = $("<ol>")
   var $completeLList = $("<ol>")
   jQuery.ajax("/api/tasks/").done(function(results){
       var tasks = results.results
       for(var i = 0; i < tasks.length; i++){
           if (tasks[i]['status'] == 'N'){
               if(tasks[i]['priority'] == 'H'){
                   $newHList.html($newHList.html()+ tasks[i]['title'] + "<br>")
               }
               if(tasks[i]['priority'] == 'M'){
                   $newMList.html($newMList.html()+ tasks[i]['title'] + "<br>")
               }
               if(tasks[i]['priority'] == 'L'){
                   $newLList.html($newLList.html()+ tasks[i]['title'] + "<br>")
               }
           $("#new").append($newHList, $newMList, $newLList)
       }
       else if (tasks[i]['status'] == 'P'){
           if(tasks[i]['priority'] == 'H'){
               $progressHList.html($progressHList.html()+ tasks[i]['title'] + "<br>")
           }
           if(tasks[i]['priority'] == 'M'){
               $progressMList.html($progressMList.html()+ tasks[i]['title'] + "<br>")
           }
           if(tasks[i]['priority'] == 'L'){
               $progressLList.html($progressLList.html()+ tasks[i]['title'] + "<br>")
           }
           $("#in_progess").append($progressHList, $progressMList, $progressLList)
       }
       else if (tasks[i]['status'] == 'C'){
           if(tasks[i]['priority'] == 'H'){
               $completeHList.html($completeHList.html()+ tasks[i]['title'] + "<br>")
           }
           if(tasks[i]['priority'] == 'M'){
               $completeMList.html($completeMList.html()+ tasks[i]['title'] + "<br>")
           }
           if(tasks[i]['priority'] == 'L'){
               $completeLList.html($completeLList.html()+ tasks[i]['title'] + "<br>")
           }
           $("#done").append($completeHList, $completeMList, $completeLList)
       }
       }
   })
}
organizeByStatus()


// delete functions
function delOne(){
   var dropdown = document.getElementById("selectTask")
   var x = document.createElement("OPTION")
   x.setAttribute("title", "value")
   jQuery.ajax('/api/tasks/').done(function(results){
       var tasks = results.results
       $('#selectTask').html("")
       dropdown[0] = new Option("")
       for (var i = 0; i < tasks.length; ++i){
              dropdown[dropdown.length] = new Option(tasks[i]['title'], tasks[i]['url']);
              }
   })
}


function taskDeletes(urlDel){
 jQuery.ajax({url:urlDel, type:'DELETE'}).done(function(){
     location = location
 })
}


function getValue(){
   var taskchoice=document.getElementById("selectTask")
   if (taskchoice.value != 'choose a task'){
   taskDeletes(taskchoice[taskchoice.selectedIndex].value)
   }
   else {
       alert("Choose a task to delete")
   }
}


// Edit functions
function getPriority(url){
   var currentPriority = document.getElementById("edit_priority")
   jQuery.ajax(url).done(function(result){
       var task = result.priority
       currentPriority.value=task
   })
}


function getStatus(url){
   var currentStatus = document.getElementById("edit_status")
   jQuery.ajax(url).done(function(result){
       var task = result.status
       currentStatus.value=task
   })
}


function getTitle(url){
   var namebox = document.getElementById("edit_title")
   jQuery.ajax(url).done(function(result){
       var task = result.title
       namebox.value=task
   })
}


function getEditValue(){
   var taskchoice=document.getElementById("selectEditTask")
   taskPatch(taskchoice[taskchoice.selectedIndex].value)
}


function taskPatch(url){
   var urlPatch = url
   var taskTitle = document.getElementById("edit_title").value
   var priority =document.getElementById("edit_priority").value
   var taskStatus = document.getElementById("edit_status").value
   if (taskTitle != ''){
   var patchdata = {'title': taskTitle, 'priority': priority, 'status': taskStatus}
   jQuery.ajax({url: urlPatch, data: patchdata, type:'PATCH'}).done(function(){
       location = location
   })
   }
   else {
       alert("Choose a task to edit")
   }
}


function editOne(){
   var taskStatus = document.getElementById("edit_status").value
   var priority =document.getElementById("edit_priority").value
   var namebox = document.getElementById("edit_title")
   var dropdown = document.getElementById("selectEditTask")
   var x = document.createElement("OPTION")
   x.setAttribute("title", "value")
   dropdown.onchange = function(){
        namebox.value = getTitle(this.value)
        priority.value = getPriority(this.value)
        taskStatus.value = getStatus(this.value)
    }
   jQuery.ajax('/api/tasks/').done(function(results){
       var tasks = results.results
       $("#selectEditTask").html("")
       dropdown[0] = new Option("")
       for (var i = 0; i < tasks.length; ++i){
            dropdown[dropdown.length] = new Option(tasks[i]['title'], tasks[i]['url']);
        }
   })
}


$("#getValue").click(getValue)
$("#selectTask").click(delOne)
$("#selectEditTask").click(editOne)
$("#try_patch").click(getEditValue)
$("#add").click(taskPost)
