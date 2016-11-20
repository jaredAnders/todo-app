$(function() {

  //generate task with attributes
  function generateTask (task){
    $('.todo-list').append(
      $('<li>').addClass('collection-item').append(
        $('<input>').attr({
          class: 'toggle',
          id: task.id,
          'data-id': task.id,
          type: 'checkbox',
          checked: task.done
        }).add($('<label>').attr({for: task.id}).append(task.title))
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

  function displayEmptyState (){
    //hide todo-list
    $('.todo-list').hide();
    //show empty state
    $('.main').append(
      $('<div>').attr({
        id: 'empty-state',
        class: 'center'
      }).append(
        $('<br><img src="assets/scream.jpg" class="responsive-img" />').add(
          $('<p>').append("<b>You haven't added any tasks yet</b>").add(
            $('<p>').append("Use the field above to get started")
          )
        )
      )
    );
    //hide empty state and show list when new task submitted
    $('#new-task-form').submit(function(){
      $('#empty-state').fadeOut("fast", function(){
        $('.todo-list').fadeIn("fast");
      });
    });
  };

  //get all tasks
  $.get('/tasks').success(function(data){
    //if no tasks, show empty state
    if (data.length == 0) {
      displayEmptyState()
    };
    //generate list
    for (task in data) {
      generateTask(data[task])
    };
    //enable status update
    $('.toggle').change(updateDoneStatus);
  });

  //add new tasks
  $('#new-task-form').submit(function(event){
    //prevent refresh and extract input value
    event.preventDefault();
    var newTask = {task: {title: $('.new-task').val()}};
    //post new task, add task to view and reset input value
    $.post('/tasks', newTask ).success(function(data){
      generateTask(data);
      $('.toggle').change(updateDoneStatus);
      $('.new-task').val('');
    });
  });

});
