$(function() {
  //generate task with attributes
  function generateTask (task){
    $('.todo-list').append(
      $('<li>').append(
        $('<input>').attr({
          class: 'toggle',
          type: 'checkbox',
          'data-id': task.id,
          checked: task.done
        }).add($('<label>').append(task.title))
      )
    )
  };
  //update done status in db on checkbox toggle
  function updateDoneStatus (){
    var task = $(this);
    var id = task.data("id");
    var doneStatus = task.prop('checked');
    $.ajax({
      url: '/tasks/' + id,
      method: 'PUT',
      data: {
        task: {
          done: doneStatus
        }
      }
    })
  };
  //get all tasks
  $.get('/tasks').success(function(data){
    //generate list
    for (task in data) {
      generateTask(data[task])
    };
    //enable status update
    $('.toggle').change(updateDoneStatus);
  });
});
